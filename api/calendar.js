const fs = require('fs');
const path = require('path');

function generateCalendarIcs(options = {}) {
  // Load data cleanly in Node
  const dataPath = path.join(__dirname, '../js/data.js');
  const code = fs.readFileSync(dataPath, 'utf8');
  const mockWindow = {};
  const fn = new Function('window', code);
  fn(mockWindow);
  const D = mockWindow.ERSTI;

  if (!D) {
    throw new Error('Failed to load ERSTI data from js/data.js');
  }

  const {
    ue = 'all',        // '1', '2', '3', 'all', 'none'
    tut = 'none',      // '1', '2', '3', 'all', 'none'
    eks = '1',         // '1' or '0'
    eksGroup = '',     // '1'..'6'
    ub = '',           // '1'..'3'
    cats = 'vl,ue,exam,eks', // comma-separated
    title = ''
  } = options;

  const allowedCats = new Set(cats.split(',').map(s => s.trim().toLowerCase()));

  const dt = s => new Date(s + "T00:00:00");
  const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const inBreak = s => s >= D.meta.breakStart && s <= D.meta.breakEnd;
  const plusMin = (time, mins) => {
    const [h, m] = time.split(":").map(Number);
    const t = h * 60 + m + mins;
    return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  };
  const icsDate = (date, time) => date.replace(/-/g, "") + "T" + time.replace(":", "") + "00";
  const icsEsc = s => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const fold = line => {
    const out = [];
    while (line.length > 74) {
      out.push(line.slice(0, 74));
      line = " " + line.slice(74);
    }
    out.push(line);
    return out.join("\r\n");
  };

  const events = [];

  // 1. Regular Timetable Courses (Lectures & Selected Tutorials/Exercises)
  D.timetable.forEach((c) => {
    const isVl = c.kind === "VL";
    const isUe = c.kind === "Ü";
    const isTut = c.kind === "Tut";

    if (isVl && !allowedCats.has("vl")) return;
    if ((isUe || isTut) && !allowedCats.has("ue")) return;

    if (c.choice === "ue") {
      if (ue === "none" || ue === "0") return;
      if (ue !== "all" && c.group !== +ue) return;
    }
    if (c.choice === "tut") {
      if (tut === "none" || tut === "0" || !tut) return;
      if (tut !== "all" && c.group !== +tut) return;
    }

    // Occurrences & break exception dates
    const exdates = [];
    let d = dt(c.first);
    while (ymd(d) <= D.meta.semesterEnd) {
      if (inBreak(ymd(d))) exdates.push(ymd(d));
      d = addDays(d, 7);
    }

    const locObj = D.places[c.loc];
    const locStr = locObj ? `${locObj.name} (${c.loc}), Psychologisches Institut, Hauptstr. 47–51, 69117 Heidelberg` : (c.loc || "Psychologisches Institut, Hauptstr. 47–51, 69117 Heidelberg");
    const descParts = [
      c.title,
      c.who ? `Dozent:in: ${c.who}` : null,
      c.module ? `Modul: ${D.modules[c.module]?.name || c.module}` : null,
      locObj ? locObj.desc : null
    ].filter(Boolean);

    events.push({
      uid: `kurs-${c.short.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${c.group || 0}`,
      date: c.first,
      start: c.start,
      end: c.end,
      title: c.short + (c.kind === "Tut" ? " (Tutorium)" : c.kind === "Ü" ? " (Übung)" : ""),
      loc: locStr,
      desc: descParts.join("\n\n"),
      rrule: `FREQ=WEEKLY;UNTIL=${D.meta.semesterEnd.replace(/-/g, "")}T225959Z`,
      exdates
    });
  });

  // 2. Semester Key Dates & Fristen / Prüfungen
  if (allowedCats.has("exam")) {
    D.keyDates.forEach((kd, idx) => {
      events.push({
        uid: `keydate-${kd.date}-${idx}`,
        allDay: true,
        date: kd.date,
        dateEnd: kd.dateEnd,
        title: kd.title,
        loc: "Universität Heidelberg",
        desc: kd.text || ""
      });
    });
  }

  // 3. Later Events (Empra-Kongress, etc.)
  if (allowedCats.has("eks")) {
    D.laterEvents.forEach((le, idx) => {
      events.push({
        uid: `later-${le.date}-${idx}`,
        allDay: !le.start,
        date: le.date,
        dateEnd: le.dateEnd,
        start: le.start,
        end: le.start ? plusMin(le.start, 180) : null,
        title: le.title,
        loc: le.loc ? (D.places[le.loc]?.name || le.loc) : "Psychologisches Institut Heidelberg",
        desc: le.note || ""
      });
    });
  }

  // 4. EKS-Woche
  if (allowedCats.has("eks") && (eks === "1" || eks === "true")) {
    D.eks.forEach((e, idx) => {
      if (e.date === "2026-10-14") return; // lecture start is covered by timetable
      if (e.groups && eksGroup && !e.groups.includes(+eksGroup)) return;
      if (e.ubGroup && ub && e.ubGroup !== +ub) return;

      const locObj = D.places[e.loc];
      const locStr = locObj ? `${locObj.name} – ${locObj.desc}` : (e.loc || "");
      const descParts = [].concat(e.details || [], e.note ? [`Hinweis: ${e.note}`] : [], e.link ? [e.link] : []).filter(Boolean);

      if (!e.start) {
        events.push({
          uid: `eks-${e.date}-${idx}`,
          allDay: true,
          date: e.date,
          dateEnd: e.dateEnd,
          title: (e.title.startsWith("EKS") ? "" : "EKS: ") + e.title,
          loc: locStr,
          desc: descParts.join("\n\n")
        });
      } else {
        const end = e.end || plusMin(e.start, 45);
        events.push({
          uid: `eks-${e.date}-${e.start.replace(":", "")}-${idx}`,
          date: e.date,
          start: e.start,
          end,
          title: (e.title.startsWith("EKS") ? "" : "EKS: ") + e.title,
          loc: locStr,
          desc: descParts.join("\n\n")
        });
      }
    });
  }

  // Determine calendar title
  let calTitle = title;
  if (!calTitle) {
    const parts = [];
    if (ue && ue !== "all" && ue !== "none") parts.push(`Übung Gr. ${ue}`);
    if (tut && tut !== "all" && tut !== "none") parts.push(`Tut Gr. ${tut}`);
    calTitle = parts.length ? `Psychologie Heidelberg (${parts.join(", ")})` : "Psychologie Heidelberg (WiSe 2026/27)";
  }

  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ersti-Guide Psychologie HD//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsEsc(calTitle)}`,
    "X-WR-CALDESC:Semester- & Vorlesungskalender B.Sc. Psychologie Universität Heidelberg (WiSe 2026/27)",
    "X-WR-TIMEZONE:Europe/Berlin",
    "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
    "X-PUBLISHED-TTL:PT6H",
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Berlin",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "TZNAME:CEST",
    "DTSTART:19700329T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "TZNAME:CET",
    "DTSTART:19701025T030000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    "END:STANDARD",
    "END:VTIMEZONE"
  ];

  events.forEach(e => {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${e.uid}@ersti-guide-psy-hd`);
    lines.push(`DTSTAMP:${stamp}`);
    if (e.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${e.date.replace(/-/g, "")}`);
      const nextDay = ymd(addDays(dt(e.dateEnd || e.date), 1)).replace(/-/g, "");
      lines.push(`DTEND;VALUE=DATE:${nextDay}`);
    } else {
      lines.push(`DTSTART;TZID=Europe/Berlin:${icsDate(e.date, e.start)}`);
      lines.push(`DTEND;TZID=Europe/Berlin:${icsDate(e.date, e.end)}`);
    }
    if (e.rrule) lines.push(`RRULE:${e.rrule}`);
    if (e.exdates && e.exdates.length) {
      lines.push(`EXDATE;TZID=Europe/Berlin:${e.exdates.map(x => icsDate(x, e.start)).join(",")}`);
    }
    lines.push(`SUMMARY:${icsEsc(e.title)}`);
    if (e.loc) lines.push(`LOCATION:${icsEsc(e.loc)}`);
    if (e.desc) lines.push(`DESCRIPTION:${icsEsc(e.desc)}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");

  return lines.map(fold).join("\r\n") + "\r\n";
}

module.exports = function handler(req, res) {
  try {
    const query = req.query || {};
    // Extract query params
    const options = {
      ue: query.ue || 'all',
      tut: query.tut || 'none',
      eks: query.eks !== undefined ? query.eks : '1',
      eksGroup: query.eksGroup || query.eks_group || '',
      ub: query.ub || query.ub_group || '',
      cats: query.cats || 'vl,ue,exam,eks',
      title: query.title || query.name || ''
    };

    const icsContent = generateCalendarIcs(options);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="psychologie-heidelberg.ics"');
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(icsContent);
  } catch (err) {
    console.error('Error in calendar feed handler:', err);
    res.status(500).send('500 Internal Server Error generating calendar feed: ' + err.message);
  }
};

// Export generator function for testing or internal imports
module.exports.generateCalendarIcs = generateCalendarIcs;
