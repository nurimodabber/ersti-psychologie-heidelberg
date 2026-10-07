/* ==========================================================================
   Ersti-Guide Psychologie – App-Logik (Vanilla JS, keine Abhängigkeiten)
   --------------------------------------------------------------------------
   • Routing über den URL-Hash (#start, #eks, #stundenplan, #studienplan, #infos)
   • Persönliche Einstellungen + Häkchen in localStorage (nur dieser Browser)
   • Zum Testen eines anderen Zeitpunkts: index.html?now=2026-10-06T10:30
   ========================================================================== */
(function () {
  "use strict";

  const D = window.ERSTI;
  const STORE_KEY = "ersti-guide-psy-hd-v1";
  const DAY_NAMES = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const DAY_LONG = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

  /* ---------------- State ---------------- */
  const defaults = {
    eksGroup: "", ubGroup: "", ueGroup: "", tutGroup: "",
    plan: "6-approb", currentSem: 1, catFilter: "all",
    done: {}, todosDone: {}, customTodos: [], eksDay: null,
    theme: "auto", vpnHours: 0, vpnList: [], guideSec: "pruefungen",
    calView: "month", calDate: null, calFilter: "all", calOnlyMine: false
  };
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? Object.assign({}, defaults, JSON.parse(raw)) : Object.assign({}, defaults);
    } catch (e) { return Object.assign({}, defaults); }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* privat/gesperrt – egal */ }
  }

  /* ---------------- Zeit ---------------- */
  function now() {
    const p = new URLSearchParams(location.search).get("now");
    if (p) { const d = new Date(p); if (!isNaN(d)) return d; }
    return new Date();
  }
  function dt(date, time) {
    const [y, m, d] = date.split("-").map(Number);
    const [hh, mm] = (time || "00:00").split(":").map(Number);
    return new Date(y, m - 1, d, hh, mm);
  }
  function ymd(d) {
    if (!d) return "";
    if (typeof d === "string") return d.split("T")[0];
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function daysBetween(a, b) {
    const da = typeof a === "string" ? dt(a) : a;
    const db = typeof b === "string" ? dt(b) : b;
    return Math.round((db - da) / 86400000);
  }
  function fmtShort(date) { const d = dt(date); return `${DAY_NAMES[d.getDay()]} ${d.getDate()}.${d.getMonth() + 1}.`; }
  function fmtLong(date) { const d = dt(date); return `${DAY_LONG[d.getDay()]}, ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; }
  function fmtRange(a, b) { return b ? `${dt(a).getDate()}.${dt(a).getMonth() + 1}.–${dt(b).getDate()}.${dt(b).getMonth() + 1}.` : fmtShort(a); }
  function inBreak(date) { return date >= D.meta.breakStart && date <= D.meta.breakEnd; }
  function plusMin(time, mins) {
    const [h, m] = (time || "00:00").split(":").map(Number);
    const t = h * 60 + m + mins;
    return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
  }
  function getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
  function getWeekNumber(d) {
    const target = new Date(d.valueOf());
    const dayNr = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  }
  function getMonthDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    const startDow = firstDay.getDay();
    const padBefore = startDow === 0 ? 6 : startDow - 1;
    for (let i = padBefore; i > 0; i--) {
      const d = new Date(year, month, 1 - i);
      days.push({ date: ymd(d), d: d.getDate(), otherMonth: true, inBreak: inBreak(ymd(d)) });
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      const s = ymd(d);
      days.push({ date: s, d: i, otherMonth: false, inBreak: inBreak(s) });
    }
    const rem = 7 - (days.length % 7);
    if (rem < 7) {
      for (let i = 1; i <= rem; i++) {
        const d = new Date(year, month + 1, i);
        days.push({ date: ymd(d), d: d.getDate(), otherMonth: true, inBreak: inBreak(ymd(d)) });
      }
    }
    return days;
  }
  function stepMonth(dateStr, step) {
    const d = dt(dateStr);
    d.setDate(1);
    d.setMonth(d.getMonth() + step);
    return ymd(d);
  }
  function stepWeek(dateStr, step) {
    return ymd(addDays(dt(dateStr), step * 7));
  }

  /* ---------------- Utils ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  function esc(s) { return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("show"), 2200);
  }
  function srcLink(url, label = "Quelle") { return url ? `<a class="src" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>` : ""; }
  function mapLink(q) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }
  function pinIconSvg() {
    return `<svg class="icon-pin" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="vertical-align:-1px;display:inline-block"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
  }
  function fmtDuration(mins) {
    if (!mins || mins <= 0) return "";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h} h ${m} min`;
    if (h > 0) return `${h} h`;
    return `${m} min`;
  }
  function placeInfo(key) {
    if (!key) return null;
    const p = D.places[key];
    if (!p) return { short: key, name: key, desc: "", map: key };
    return {
      short: p.short || key,
      name: p.name || key,
      desc: p.desc || "",
      map: p.map || `${p.name || key}, Heidelberg`
    };
  }
  function placeBadge(key, useLong = false) {
    if (!key) return "";
    const p = D.places[key];
    const query = p?.map || (p ? `${p.name}, Heidelberg` : `${key}, Heidelberg`);
    const label = p ? (useLong ? p.name : (p.short || p.name)) : key;
    const desc = p ? p.desc : "";
    return `<a class="badge loc" href="${mapLink(query)}" target="_blank" rel="noopener" title="${esc(desc ? desc + " – " : "")}Auf Google Maps öffnen">${pinIconSvg()} ${esc(label)}</a>`;
  }
  const TAG_LABEL = { important: "Wichtig", bring: "Mitbringen", optional: "Freiwillig", social: "Social", todo: "To-do" };

  /* ---------------- Ereignisse (für „Jetzt / Als Nächstes“) ---------------- */
  function eksVisible(e) {
    if (e.groups && state.eksGroup && !e.groups.includes(+state.eksGroup)) return false;
    if (e.ubGroup && state.ubGroup && e.ubGroup !== +state.ubGroup) return false;
    return true;
  }
  function courseSelected(c) {
    if (c.choice === "ue") return state.ueGroup ? c.group === +state.ueGroup : false;
    if (c.choice === "tut") return state.tutGroup ? c.group === +state.tutGroup : false;
    return true;
  }
  function courseOccurrences(c) {
    const out = [];
    let d = dt(c.first);
    const end = dt(D.meta.semesterEnd);
    while (d <= end) { const s = ymd(d); if (!inBreak(s)) out.push(s); d = addDays(d, 7); }
    return out;
  }
  function allEvents() {
    const ev = [];
    D.eks.filter(eksVisible).forEach(e => {
      if (e.date === "2026-10-14") return; // kommt aus dem Stundenplan
      const s = dt(e.date, e.start);
      ev.push({ start: s, end: e.end ? dt(e.date, e.end) : null, title: e.title, loc: e.loc, date: e.date, src: "eks" });
    });
    D.laterEvents.forEach(e => ev.push({ start: dt(e.date, e.start || "00:00"), end: e.dateEnd ? dt(e.dateEnd, "23:59") : null, title: e.title, loc: e.loc, date: e.date, allDay: !e.start, src: "later" }));
    D.timetable.filter(courseSelected).forEach(c => courseOccurrences(c).forEach(date => {
      ev.push({ start: dt(date, c.start), end: dt(date, c.end), title: c.short, loc: c.loc, who: c.who, date, src: "course" });
    }));
    ev.sort((a, b) => a.start - b.start);
    // offenes Ende: bis zum nächsten Termin am selben Tag, max. 60 Min.
    ev.forEach((e, i) => {
      if (e.end) return;
      const nxt = ev.slice(i + 1).find(x => x.date === e.date && x.start > e.start);
      const cap = new Date(e.start.getTime() + 60 * 60000);
      e.end = nxt && nxt.start < cap ? nxt.start : cap; e.openEnd = true;
    });
    return ev;
  }

  /* ---------------- Router ---------------- */
  const views = {
    start: renderStart,
    stundenplan: renderCalendar,
    kalender: renderCalendar,
    studienplan: renderPlan,
    guide: renderGuide,
    eks: renderEks,
    infos: renderInfos
  };
  function route() {
    const r = (location.hash || "#start").slice(1).split("/")[0];
    const name = views[r] ? r : "start";
    const viewSection = name === "kalender" ? "stundenplan" : name;
    $$(".view").forEach(v => { v.hidden = v.dataset.view !== viewSection; });
    $$("[data-route]").forEach(a => a.setAttribute("aria-current", (a.dataset.route === viewSection || (a.dataset.route === "stundenplan" && name === "kalender")) ? "page" : "false"));
    views[name]($(`#view-${viewSection}`));
    document.title = {
      start: "Psychologie Heidelberg · Studienbegleiter",
      stundenplan: "Kalender & Stundenplan · Psychologie Heidelberg",
      kalender: "Kalender & Stundenplan · Psychologie Heidelberg",
      studienplan: "Studienplan & Module · Psychologie Heidelberg",
      guide: "Studien-Guide · Psychologie Heidelberg",
      eks: "EKS-Woche · Psychologie Heidelberg",
      infos: "Infos & Kontakte · Psychologie Heidelberg"
    }[name] || "Psychologie Heidelberg";
  }
  function rerender() { route(); }

  /* ========================================================================
     START
     ======================================================================== */
  function renderStart(el) {
    const n = now();
    const today = ymd(n);
    const eksStart = D.eksDays[0].date;
    const toEks = daysBetween(n, dt(eksStart));
    const toLect = daysBetween(n, dt(D.meta.lecturesStart));
    const toEnd = daysBetween(n, dt(D.meta.semesterEnd));

    let pills = "";
    if (toEks > 0) pills += pill(toEks, toEks === 1 ? "Tag bis zur EKS-Woche" : "Tage bis zur EKS-Woche");
    else if (today <= "2026-10-12") {
      const idx = D.eksDays.findIndex(d => d.date === today);
      pills += pill(idx >= 0 ? `Tag ${idx + 1}` : "EKS", idx >= 0 ? D.eksDays[idx].title.replace(/^Tag \d – /, "") : "läuft gerade");
    }
    if (toLect > 0) pills += pill(toLect, toLect === 1 ? "Tag bis Vorlesungsbeginn" : "Tage bis Vorlesungsbeginn");
    else if (toEnd >= 0) {
      const wk = Math.floor(daysBetween(dt(D.meta.semesterStart), n) / 7) + 1;
      pills += pill(inBreak(today) ? "Pause" : `Woche ${wk}`, inBreak(today) ? "vorlesungsfrei" : "der Vorlesungszeit");
      pills += pill(toEnd, "Tage bis Semesterende");
    }
    const p = planStats();
    const vpnTotal = state.vpnHours || 0;
    pills += pill(`${p.done}/${p.total}`, "LP abgehakt");
    pills += pill(`${vpnTotal}/30`, "Vpn-Std. (1 LP)");

    el.innerHTML = `
      <div class="hero">
        <h1>Psychologie Heidelberg</h1>
        <p>${esc(D.meta.subtitle)}. Dein digitaler Begleiter für Vorlesungen, Modulplanung, Vpn-Stunden und alle Regelungen am Institut.</p>
        <div class="countdown">${pills}</div>
      </div>
      <div class="grid grid-2">
        <div class="stack">
          ${nowNextCard(n)}
          ${vpnTrackerCard()}
          <div class="card">
            <div class="card-head"><h2>Semestertermine</h2><a class="btn" href="#stundenplan">Zum Kalender</a></div>
            ${keyDatesList(today)}
          </div>
        </div>
        <div class="stack">
          <div class="card">
            <div class="card-head"><h2>Studienfortschritt</h2><a class="btn" href="#studienplan">Planen</a></div>
            <div class="progress" aria-label="Fortschritt"><div style="width:${(p.done / p.total * 100).toFixed(1)}%"></div></div>
            <div class="stat-row">
              <div class="stat"><b>${p.done}</b><span>von ${p.total} LP</span></div>
              <div class="stat"><b>${esc(D.plans[state.plan].short)}</b><span>gewählter Plan</span></div>
              <div class="stat"><b>${state.currentSem}.</b><span>Fachsemester</span></div>
            </div>
          </div>
          ${todoCard(today)}
          ${groupsCard()}
        </div>
      </div>`;
    bindTodos(el);
    bindVpn(el);
    $$("[data-open-settings]", el).forEach(b => b.addEventListener("click", openSettings));
  }
  function pill(big, small) { return `<div class="pill-lg"><b>${esc(big)}</b><span>${esc(small)}</span></div>`; }

  function nowNextCard(n) {
    const ev = allEvents();
    const cur = ev.find(e => e.start <= n && n < e.end && !e.allDay);
    const nxt = ev.find(e => e.start > n);
    const line = (e) => {
      const time = e.allDay ? fmtRange(e.date, null) : `${fmtShort(e.date)} · ${String(e.start.getHours()).padStart(2, "0")}:${String(e.start.getMinutes()).padStart(2, "0")} Uhr`;
      return `<div class="now-title">${esc(e.title)}</div><div class="now-meta">${esc(time)} ${e.loc ? "· " + placeBadge(e.loc) : ""}</div>`;
    };
    let html = `<div class="card now-card">`;
    if (cur) html += `<div class="now-label">Jetzt</div>${line(cur)}<hr style="margin:1rem 0">`;
    if (nxt) {
      const mins = Math.round((nxt.start - n) / 60000);
      const rel = mins < 60 ? `in ${mins} Min.` : mins < 1440 ? `in ${Math.round(mins / 60)} Std.` : `in ${Math.round(mins / 1440)} Tagen`;
      html += `<div class="now-label">Als Nächstes · ${rel}</div>${line(nxt)}`;
    } else html += `<div class="now-label">Als Nächstes</div><p class="muted">Keine weiteren Termine im Wintersemester.</p>`;
    if (!state.ueGroup) html += `<p class="small muted" style="margin:.7rem 0 0">Tipp: <button class="btn ghost" data-open-settings style="padding:.2rem .6rem">Gruppen einstellen</button> – dann erscheinen auch deine Übungstermine.</p>`;
    return html + `</div>`;
  }

  function keyDatesList(today) {
    const nextIdx = D.keyDates.findIndex(k => (k.dateEnd || k.date) >= today);
    return `<ul class="dates">${D.keyDates.map((k, i) => {
      const d = dt(k.date);
      const cls = (k.dateEnd || k.date) < today ? "past" : i === nextIdx ? "next" : "";
      return `<li class="${cls}"><div class="d">${d.getDate()}. ${MONTHS[d.getMonth()]}<small>${k.dateEnd ? "bis " + fmtShort(k.dateEnd) : DAY_LONG[d.getDay()]}</small></div>
        <div><div class="t">${esc(k.title)} ${k.deadline ? '<span class="badge deadline">Frist</span>' : ""}${k.loc ? " " + placeBadge(k.loc) : ""}</div><div class="muted small">${esc(k.text)}</div></div></li>`;
    }).join("")}</ul>`;
  }

  /* ========================================================================
     VPN-STUNDEN TRACKER
     ======================================================================== */
  function vpnTrackerCard() {
    const list = state.vpnList || [];
    const total = state.vpnHours || 0;
    const pct = Math.min(100, (total / 30 * 100)).toFixed(1);
    const complete = total >= 30;

    return `<div class="card vpn-card" id="vpnTrackerCard">
      <div class="vpn-header">
        <div>
          <h2>Vpn-Stunden Tracker</h2>
          <p class="small muted" style="margin:0">Mind. 30 Std. für das Modul Propädeutik (1 LP)</p>
        </div>
        <div class="vpn-count">${total} <small>/ 30 Std.</small></div>
      </div>
      <div class="vpn-bar-wrap">
        <div class="progress" aria-label="Vpn Fortschritt"><div style="width:${pct}%;background:${complete ? "var(--success)" : "var(--ink)"}"></div></div>
      </div>
      ${complete ? `<div class="notice" style="margin-bottom:1rem;color:var(--success)"><b>🎉 30 Stunden erreicht!</b> Reiche deinen ausgefüllten Vpn-Zettel im Prüfungsamt (F042) ein.</div>` : ""}
      ${list.length ? `<ul class="vpn-entries">${list.map(v => `
        <li>
          <div class="meta">
            <b>${esc(v.title || "Studienteilnahme")}</b>
            <span class="small muted">${v.date ? fmtShort(v.date) : ""} ${v.lead ? "· " + esc(v.lead) : ""}</span>
          </div>
          <div style="display:flex;align-items:center;gap:.6rem">
            <span class="hours">+${v.hours} h</span>
            <button class="del" data-del-vpn="${esc(v.id)}" aria-label="Eintrag löschen" style="border:0;background:var(--foam);color:var(--muted);cursor:pointer;font-size:1.1rem;width:28px;height:28px;border-radius:50%;box-shadow:var(--sh-out-sm)">×</button>
          </div>
        </li>`).join("")}</ul>` : `<p class="small muted" style="margin-bottom:1rem">Noch keine Stunden eingetragen. Trage hier jede absolvierte Studie ein.</p>`}
      <form class="vpn-form" data-vpn-add>
        <input type="text" name="title" placeholder="Studienname / Thema" aria-label="Studienname" required>
        <input type="number" name="hours" placeholder="Std." step="0.5" min="0.5" max="30" aria-label="Stunden" required style="width:75px">
        <button class="btn primary" title="Stunden hinzufügen">+</button>
      </form>
      <div style="margin-top:.85rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem">
        <a class="small" href="https://studienportal.psychologie.uni-heidelberg.de/" target="_blank" rel="noopener">Zum Heidelberger Studienportal ↗</a>
        <a class="small" href="#guide">Mehr Infos zum Ablauf & Zettel ↗</a>
      </div>
    </div>`;
  }

  function bindVpn(el) {
    $$("[data-del-vpn]", el).forEach(btn => btn.addEventListener("click", () => {
      const id = btn.dataset.delVpn;
      state.vpnList = (state.vpnList || []).filter(v => v.id !== id);
      state.vpnHours = (state.vpnList || []).reduce((acc, cur) => acc + (Number(cur.hours) || 0), 0);
      save(); rerender(); toast("Eintrag gelöscht");
    }));
    const f = $("[data-vpn-add]", el);
    if (f) f.addEventListener("submit", ev => {
      ev.preventDefault();
      const title = f.title.value.trim();
      const hours = parseFloat(f.hours.value);
      if (!title || isNaN(hours) || hours <= 0) return;
      const today = ymd(now());
      if (!state.vpnList) state.vpnList = [];
      state.vpnList.push({ id: "v-" + Date.now(), title, hours, date: today });
      state.vpnHours = state.vpnList.reduce((acc, cur) => acc + (Number(cur.hours) || 0), 0);
      save(); rerender(); toast(`${hours} Vpn-Stunde(n) gespeichert`);
    });
  }

  function todoCard(today) {
    const items = D.todos.map(t => Object.assign({ custom: false }, t)).concat(state.customTodos.map(t => Object.assign({ custom: true }, t)));
    const open = items.filter(t => !state.todosDone[t.id]).length;
    return `<div class="card">
      <div class="card-head"><h2>To-dos</h2><span class="badge">${open} offen</span></div>
      <ul class="todo-list">${items.map(t => {
        const done = !!state.todosDone[t.id];
        const soon = t.due && !done && daysBetween(dt(today), dt(t.due)) <= 2;
        return `<li class="${done ? "done" : ""}"><input type="checkbox" id="td-${esc(t.id)}" data-todo="${esc(t.id)}" ${done ? "checked" : ""}>
          <label for="td-${esc(t.id)}">${esc(t.text)}${t.due ? `<span class="due ${soon ? "soon" : ""}">bis ${fmtShort(t.due)}</span>` : ""}</label>
          ${t.custom ? `<button class="del" data-del="${esc(t.id)}" aria-label="To-do löschen">×</button>` : ""}</li>`;
      }).join("")}</ul>
      <form class="todo-add" data-todo-add>
        <input type="text" name="text" placeholder="Eigenes To-do …" aria-label="Neues To-do" maxlength="140" required>
        <input type="date" name="due" aria-label="Fällig am" style="max-width:150px">
        <button class="btn primary">+</button>
      </form>
    </div>`;
  }
  function bindTodos(el) {
    $$("[data-todo]", el).forEach(cb => cb.addEventListener("change", () => {
      state.todosDone[cb.dataset.todo] = cb.checked; save(); rerender();
    }));
    $$("[data-del]", el).forEach(b => b.addEventListener("click", () => {
      state.customTodos = state.customTodos.filter(t => t.id !== b.dataset.del); delete state.todosDone[b.dataset.del]; save(); rerender();
    }));
    const f = $("[data-todo-add]", el);
    if (f) f.addEventListener("submit", ev => {
      ev.preventDefault();
      const text = f.text.value.trim(); if (!text) return;
      state.customTodos.push({ id: "c-" + Date.now(), text, due: f.due.value || null }); save(); rerender(); toast("To-do hinzugefügt");
    });
  }

  function groupsCard() {
    const v = (x, suffix = "") => x ? `Gruppe ${x}${suffix}` : '<span class="muted">nicht gesetzt</span>';
    return `<div class="card">
      <div class="card-head"><h2>Meine Gruppen</h2><button class="btn" data-open-settings>Ändern</button></div>
      <dl class="kv">
        <dt>EKS-Gruppe</dt><dd>${v(state.eksGroup)}</dd>
        <dt>UB-Führung</dt><dd>${v(state.ubGroup)}</dd>
        <dt>Übung Allg. Psych. 1</dt><dd>${v(state.ueGroup)}</dd>
        <dt>Statistik-Tutorium</dt><dd>${state.tutGroup ? "Gruppe " + state.tutGroup : '<span class="muted">keins / offen</span>'}</dd>
      </dl></div>`;
  }

  /* ========================================================================
     EKS-WOCHE
     ======================================================================== */
  function renderEks(el) {
    const n = now(); const today = ymd(n);
    if (!state.eksDay || !D.eksDays.some(d => d.date === state.eksDay)) {
      const t = D.eksDays.find(d => d.date >= today);
      state.eksDay = t ? t.date : D.eksDays[0].date;
    }
    const day = D.eksDays.find(d => d.date === state.eksDay);
    const items = D.eks.filter(e => e.date === day.date);

    const groupHint = !state.eksGroup || !state.ubGroup
      ? `<div class="notice" style="margin-bottom:1rem">Gruppenabhängige Punkte (Hausführung, Mittagessen, UB-Führung) werden für alle Gruppen angezeigt. <button class="btn" data-open-settings style="margin-left:.4rem;padding:.25rem .7rem">Meine Gruppe einstellen</button></div>` : "";

    el.innerHTML = `
      <div class="page-head">
        <h1>EKS-Woche</h1>
        <p>Einführungs-Kompakt-Seminar, <b>Mo 5.10. bis Mo 12.10.2026</b> im Psychologischen Institut, Hauptstr. 47–51. Ganztags ca. 9–12:30 und 14–16 Uhr, viel davon in Kleingruppen mit studentischen Tutor:innen. Start: <b>Mo 5.10., 09:15 Uhr, Hörsaal II</b> – den Wegweisern folgen.</p>
        <div class="chips"><button class="btn primary" data-ics="eks">${icon("cal")} Ganze Woche in den Kalender (.ics)</button><a class="btn" href="#infos">Orte & Abkürzungen</a></div>
        <p class="small src-line">Quellen: ${srcLink(D.src.eksPlan, "EKS-Wochenplan (heiBOX)")} ${srcLink(D.src.eksInvite, "EKS-Einladung")} ${srcLink("https://www.psychologie.uni-heidelberg.de/studium/a-z/eks", "EKS auf der Institutsseite")}</p>
      </div>
      ${groupHint}
      <div class="scroll-x" role="tablist" aria-label="Tag auswählen"><div class="chips">
        ${D.eksDays.map(d => `<button class="chip ${d.date === today ? "today" : ""}" role="tab" aria-pressed="${d.date === day.date}" aria-selected="${d.date === day.date}" data-day="${d.date}">${esc(d.label)}</button>`).join("")}
      </div></div>
      <div class="card" style="margin-top:1rem">
        <div class="card-head"><h2>${esc(fmtLong(day.date))}</h2><span class="badge">${esc(day.title)}</span></div>
        <ol class="timeline">${items.map(e => tlItem(e, n)).join("")}</ol>
      </div>
      <div class="card" style="margin-top:1rem">
        <h2>Danach vormerken</h2>
        <ol class="timeline">${D.laterEvents.map(e => tlItem(Object.assign({}, e, { _later: true }), n)).join("")}</ol>
      </div>`;

    $$("[data-day]", el).forEach(b => b.addEventListener("click", () => { state.eksDay = b.dataset.day; save(); renderEks(el); }));
    $$("[data-open-settings]", el).forEach(b => b.addEventListener("click", openSettings));
    $("[data-ics=eks]", el).addEventListener("click", () => downloadIcs("eks-woche-psychologie-2026.ics", eksIcsEvents()));
    const cur = $(".tl-item.current", el); if (cur && today === day.date) cur.scrollIntoView({ block: "center" });
  }

  function tlItem(e, n) {
    const hiddenByGroup = !eksVisible(e);
    const tags = (e.tags || []).filter(t => TAG_LABEL[t]);
    const start = e.start ? dt(e.date, e.start) : null;
    let end = e.end ? dt(e.date, e.end) : start ? new Date(start.getTime() + 45 * 60000) : null;
    if (e.dateEnd) end = dt(e.dateEnd, "23:59");
    const isPast = end && end < n;
    const isCur = start && start <= n && n < end;
    const cls = ["tl-item", tags.includes("important") ? "important" : "", (e.tags || []).includes("food") ? "food" : "", isPast ? "past" : "", isCur ? "current" : "", hiddenByGroup ? "hidden-group" : ""].join(" ");
    const time = e._later
      ? `${esc(e.dateEnd ? fmtRange(e.date, e.dateEnd) : fmtShort(e.date))}${e.start ? `<small>${esc(e.start)}</small>` : ""}`
      : `${esc(e.start || "")}${e.end ? `<small>bis ${esc(e.end)}</small>` : ""}`;
    const badges = [
      placeBadge(e.loc),
      e.groups ? `<span class="badge group">Gruppen ${e.groups.join(", ")}</span>` : "",
      e.ubGroup ? `<span class="badge group">UB-Gruppe ${e.ubGroup}</span>` : "",
      ...tags.map(t => `<span class="badge ${t}">${TAG_LABEL[t]}</span>`),
      isCur ? `<span class="badge important">Läuft gerade</span>` : ""
    ].join("");
    return `<li class="${cls}">
      <div class="tl-time">${time}</div><span class="tl-dot" aria-hidden="true"></span>
      <div class="tl-body">
        <div class="tl-title">${esc(e.title)}</div>
        ${badges.trim() ? `<div class="tl-badges">${badges}</div>` : ""}
        ${e.details && e.details.length ? `<ul>${e.details.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${e.link ? `<div class="small" style="margin-top:.35rem"><a href="${esc(e.link)}" target="_blank" rel="noopener">Mehr Infos ↗</a></div>` : ""}
        ${e.note ? `<div class="tl-note">${esc(e.note)}</div>` : ""}
      </div></li>`;
  }

  /* ========================================================================
     KALENDER & INTERAKTIVER STUNDENPLAN (NEUES SCHLANKES DESIGN)
     ======================================================================== */
  function cleanTitle(t) {
    return String(t || "").replace(/^EKS:\s*/i, "").trim();
  }

  function isMealOrBuffer(e) {
    const t = (e.title || "").toLowerCase();
    const tags = e.tags || [];
    return tags.includes("food") || t.includes("mittagessen") || t.includes("pufferslot") || t.includes("puffer") || t.includes("essen");
  }

  function parseMin(timeStr) {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  function getMasterCalendarEvents() {
    const evs = [];

    // 1. Vorlesungen, Übungen & Tutorien (D.timetable)
    D.timetable.forEach(c => {
      // Wenn eine Gruppe gewählt ist, zeige nur diese. Nicht gewählte Gruppen werden ausgeblendet!
      if (!courseSelected(c)) return;
      const occurrences = courseOccurrences(c);
      const pInfo = placeInfo(c.loc);
      const sMin = parseMin(c.start);
      const eMin = parseMin(c.end);
      const durMin = eMin - sMin;
      occurrences.forEach(dateStr => {
        evs.push({
          id: `c-${c.module || c.short}-${dateStr}-${c.start}`,
          date: dateStr,
          start: c.start,
          end: c.end,
          startMin: sMin,
          endMin: eMin,
          durationMin: durMin,
          durationStr: fmtDuration(durMin),
          title: c.short,
          fullTitle: c.title,
          who: c.who,
          loc: c.loc,
          locShort: pInfo ? pInfo.short : c.loc,
          locLong: pInfo ? pInfo.name : c.loc,
          locDesc: pInfo ? pInfo.desc : "",
          cat: c.kind === "VL" ? "vl" : "ue",
          kind: c.kind === "VL" ? "Vorlesung" : (c.kind === "Tut" ? "Tutorium" : "Übung"),
          choice: c.choice,
          group: c.group,
          first: c.first,
          srcUrl: D.src.timetable
        });
      });
    });

    // 2. EKS-Events (D.eks)
    D.eks.forEach((e, idx) => {
      if (e.date === "2026-10-14") return; // Erste Vorlesung ist schon im Stundenplan
      if (!eksVisible(e)) return; // Nur Termine meiner Gruppe
      const isBuf = isMealOrBuffer(e);
      const end = e.end || (e.start ? plusMin(e.start, isBuf ? 45 : 30) : null);
      const sMin = e.start ? parseMin(e.start) : 0;
      const eMin = end ? parseMin(end) : sMin + 30;
      const durMin = e.start && end ? eMin - sMin : 0;
      const pInfo = placeInfo(e.loc);
      evs.push({
        id: `eks-${idx}-${e.date}`,
        date: e.date,
        start: e.start,
        end: end,
        startMin: sMin,
        endMin: eMin,
        durationMin: durMin,
        durationStr: fmtDuration(durMin),
        allDay: !e.start,
        title: cleanTitle(e.title),
        fullTitle: e.title,
        loc: e.loc,
        locShort: pInfo ? pInfo.short : e.loc,
        locLong: pInfo ? pInfo.name : e.loc,
        locDesc: pInfo ? pInfo.desc : "",
        details: e.details,
        note: e.note,
        link: e.link,
        tags: e.tags,
        cat: "eks", // EKS ist immer eks, niemals rot!
        kind: "EKS & Event",
        isBuffer: isBuf,
        groups: e.groups,
        srcUrl: D.src.eksPlan
      });
    });

    // 3. Spätere Events (D.laterEvents)
    D.laterEvents.forEach((e, idx) => {
      const isMulti = Boolean(e.dateEnd && e.dateEnd !== e.date);
      const sMin = e.start ? parseMin(e.start) : 0;
      const eMin = e.start ? parseMin(plusMin(e.start, 120)) : 0;
      const pInfo = placeInfo(e.loc);
      evs.push({
        id: `later-${idx}-${e.date}`,
        date: e.date,
        dateEnd: e.dateEnd,
        start: e.start,
        end: e.start ? plusMin(e.start, 120) : null,
        startMin: sMin,
        endMin: eMin,
        durationMin: e.start ? 120 : 0,
        durationStr: e.start ? "2 h" : "",
        allDay: !e.start || isMulti,
        isSpan: isMulti,
        title: cleanTitle(e.title),
        fullTitle: e.title,
        loc: e.loc,
        locShort: pInfo ? pInfo.short : e.loc,
        locLong: pInfo ? pInfo.name : e.loc,
        locDesc: pInfo ? pInfo.desc : "",
        note: e.note,
        cat: "eks",
        kind: "EKS & Event",
        srcUrl: D.src.eksInvite
      });
    });

    // 4. Semestertermine, Fristen & Prüfungen (D.keyDates)
    D.keyDates.forEach((kd, idx) => {
      const isMulti = Boolean(kd.dateEnd && kd.dateEnd !== kd.date);
      const isExam = Boolean(kd.exam || kd.deadline);
      const pInfo = placeInfo(kd.loc);
      evs.push({
        id: `kd-${idx}-${kd.date}`,
        date: kd.date,
        dateEnd: kd.dateEnd,
        start: null,
        end: null,
        allDay: true,
        isSpan: isMulti,
        title: cleanTitle(kd.title),
        fullTitle: kd.title,
        desc: kd.text,
        loc: kd.loc,
        locShort: pInfo ? pInfo.short : kd.loc,
        locLong: pInfo ? pInfo.name : kd.loc,
        locDesc: pInfo ? pInfo.desc : "",
        deadline: kd.deadline,
        exam: kd.exam,
        holiday: kd.holiday,
        cat: kd.holiday ? "holiday" : (isExam ? "exam" : "eks"),
        kind: kd.holiday ? "Vorlesungsfrei" : (kd.exam ? "Prüfung" : (kd.deadline ? "Frist" : "Semestertermin")),
        srcUrl: D.src.semester
      });
    });

    return evs;
  }

  function filterCalendarEvents(events) {
    const f = state.calFilters || { vl: true, ue: true, eks: true, exam: true };
    return events.filter(e => {
      if (e.cat === "holiday") return true;
      return f[e.cat] !== false;
    });
  }

  /* ---------------- Layout für überlappende Termine mit Spalten-Expansion ---------------- */
  function layoutDayEvents(events, minHour, pxPerMin, collapsedGaps = []) {
    if (!events.length) return [];
    // Sortieren: früheste Startzeit zuerst, bei Gleichheit längerer Termin zuerst
    const sorted = events.slice().sort((a, b) => a.startMin - b.startMin || (b.endMin - b.startMin) - (a.endMin - a.startMin));

    // 1. Zeitliche Cluster überlappender Termine ermitteln
    const clusters = [];
    let currentCluster = [];
    let clusterEnd = -1;

    sorted.forEach(ev => {
      if (currentCluster.length === 0) {
        currentCluster.push(ev);
        clusterEnd = ev.endMin;
      } else if (ev.startMin < clusterEnd) {
        currentCluster.push(ev);
        clusterEnd = Math.max(clusterEnd, ev.endMin);
      } else {
        clusters.push(currentCluster);
        currentCluster = [ev];
        clusterEnd = ev.endMin;
      }
    });
    if (currentCluster.length) clusters.push(currentCluster);

    const laidOut = [];
    clusters.forEach(cluster => {
      // 2. Gierige Spaltenzuteilung
      const columns = []; // columns[i] speichert das endMin des letzten Termins in Spalte i
      cluster.forEach(ev => {
        let placed = false;
        for (let i = 0; i < columns.length; i++) {
          if (columns[i] <= ev.startMin) {
            columns[i] = ev.endMin;
            ev.colIndex = i;
            placed = true;
            break;
          }
        }
        if (!placed) {
          ev.colIndex = columns.length;
          columns.push(ev.endMin);
        }
      });
      const maxCols = columns.length;

      // 3. Horizontale Expansion: Dehne Termine in freie Nachbarspalten nach rechts aus
      cluster.forEach(ev => {
        let colSpan = 1;
        for (let nextCol = ev.colIndex + 1; nextCol < maxCols; nextCol++) {
          const conflict = cluster.some(other => {
            if (other === ev || other.colIndex !== nextCol) return false;
            return ev.startMin < other.endMin && ev.endMin > other.startMin;
          });
          if (!conflict) {
            colSpan++;
          } else {
            break;
          }
        }
        ev.colSpan = colSpan;
        ev.maxCols = maxCols;

        // Vertikale Position unter Berücksichtigung eingeklappter Lücken
        const startOff = ev.startMin - minHour * 60;
        const endOff = ev.endMin - minHour * 60;
        const topY = getAdjustedY(startOff, collapsedGaps, pxPerMin);
        const bottomY = getAdjustedY(endOff, collapsedGaps, pxPerMin);

        ev.top = topY;
        ev.height = Math.max(22, bottomY - topY - 3);

        const colWidthPct = 100 / maxCols;
        ev.leftPct = ev.colIndex * colWidthPct;
        ev.widthPct = ev.colSpan * colWidthPct;

        laidOut.push(ev);
      });
    });

    return laidOut;
  }

  function getAdjustedY(minuteOffset, collapsedGaps, pxPerMin) {
    if (!collapsedGaps || !collapsedGaps.length) return minuteOffset * pxPerMin;
    let y = 0;
    let currentMin = 0;
    collapsedGaps.forEach(g => {
      if (minuteOffset > g.startOffsetMin) {
        const beforeGap = Math.min(minuteOffset, g.startOffsetMin) - currentMin;
        y += beforeGap * pxPerMin;
        currentMin = Math.min(minuteOffset, g.startOffsetMin);
        if (minuteOffset >= g.endOffsetMin) {
          y += g.heightPx;
          currentMin = g.endOffsetMin;
        } else {
          const inGapFrac = (minuteOffset - g.startOffsetMin) / (g.endOffsetMin - g.startOffsetMin);
          y += inGapFrac * g.heightPx;
          currentMin = minuteOffset;
        }
      }
    });
    if (minuteOffset > currentMin) {
      y += (minuteOffset - currentMin) * pxPerMin;
    }
    return y;
  }

  function getEventDensity(heightPx) {
    if (heightPx < 35) return "density-compact";
    if (heightPx <= 64) return "density-medium";
    return "density-full";
  }

  function openEventModal(ev) {
    const modal = $("#eventModal");
    if (!modal) return;
    const catLabels = {
      vl: "Vorlesung",
      ue: ev.kind || "Übung / Tutorium",
      eks: "EKS & Event",
      exam: ev.kind || "Frist & Prüfung",
      holiday: "Vorlesungsfreie Zeit"
    };
    const catBadge = $("#eventModalCat");
    if (catBadge) {
      catBadge.textContent = catLabels[ev.cat] || ev.kind || "Termin";
      catBadge.className = `badge cal-dot ${ev.cat || "vl"}`;
    }
    const titleEl = $("#eventModalTitle");
    if (titleEl) titleEl.textContent = ev.fullTitle || ev.title;

    const locInfo = ev.loc && D.places[ev.loc] ? D.places[ev.loc] : null;

    const bodyEl = $("#eventModalBody");
    if (bodyEl) {
      bodyEl.innerHTML = `
        <dl>
          <dt>Datum:</dt>
          <dd><strong>${esc(fmtLong(ev.date))}${ev.dateEnd && ev.dateEnd !== ev.date ? " bis " + esc(fmtLong(ev.dateEnd)) : ""}</strong></dd>
          <dt>Zeit:</dt>
          <dd>${ev.start ? `${esc(ev.start)} – ${esc(ev.end || plusMin(ev.start, 60))} Uhr${ev.durationStr ? ` (${esc(ev.durationStr)})` : ""}` : "Ganztägig / Frist"}</dd>
          ${ev.who ? `<dt>Dozent*in:</dt><dd>${esc(ev.who)}</dd>` : ""}
          ${ev.loc ? `<dt>Ort:</dt><dd>${placeBadge(ev.loc, true)} ${locInfo && locInfo.desc ? `<div class="small muted" style="margin-top:.2rem">${esc(locInfo.desc)}</div>` : ""}</dd>` : ""}
          ${ev.choice ? `<dt>Gruppe:</dt><dd>${ev.choice === "ue" ? `Übungsgruppe ${ev.group} (Allg. Psychologie 1)` : `Statistik-Tutorium Gruppe ${ev.group}`}</dd>` : ""}
          ${ev.groups && ev.groups.length ? `<dt>EKS-Gruppe:</dt><dd>Gruppe ${ev.groups.join(", ")}</dd>` : ""}
        </dl>
        ${ev.details && ev.details.length ? `<ul style="margin:.6rem 0 0;padding-left:1.2rem;font-size:.88rem;color:var(--muted)">${ev.details.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        ${ev.desc ? `<p style="margin:.6rem 0 0;font-size:.88rem">${esc(ev.desc)}</p>` : ""}
        ${ev.note ? `<div class="event-modal-note"><strong>Hinweis:</strong> ${esc(ev.note)}</div>` : ""}
        ${ev.srcUrl ? `<div style="margin-top:.75rem">${srcLink(ev.srcUrl, "Offizielle Quelle öffnen")}</div>` : ""}
      `;
    }

    const icsBtn = $("#eventModalIcs");
    if (icsBtn) {
      icsBtn.onclick = () => {
        const item = {
          uid: `single-${Date.now()}`,
          date: ev.date,
          dateEnd: ev.dateEnd,
          start: ev.start,
          end: ev.end || (ev.start ? plusMin(ev.start, 60) : null),
          allDay: ev.allDay || !ev.start,
          title: ev.fullTitle || ev.title,
          loc: ev.locLong || (D.places[ev.loc]?.name || ev.loc),
          desc: [ev.who, ev.desc, ev.note].filter(Boolean).join("\n")
        };
        downloadIcs(`${(ev.title).toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`, [item]);
      };
    }
    const closeBtn = $("#eventModalClose");
    const dismissBtn = $("#eventModalDismiss");
    const closeModal = () => {
      if (typeof modal.close === "function") modal.close();
      else modal.removeAttribute("open");
    };
    if (closeBtn) closeBtn.onclick = closeModal;
    if (dismissBtn) dismissBtn.onclick = closeModal;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function fullSemesterIcsEvents() {
    const list = [];
    D.timetable.filter(courseSelected).forEach((c, i) => {
      const occ = courseOccurrences(c);
      const exdates = [];
      let d = dt(c.first);
      while (ymd(d) <= D.meta.semesterEnd) {
        if (inBreak(ymd(d))) exdates.push(ymd(d));
        d = addDays(d, 7);
      }
      list.push({
        uid: `kurs-${i}`,
        date: c.first,
        start: c.start,
        end: c.end,
        title: c.short + (c.kind === "Tut" ? " (Tutorium)" : c.kind === "Ü" ? " (Übung)" : ""),
        loc: c.loc ? `${D.places[c.loc]?.name || c.loc}, Psychologisches Institut, Hauptstr. 47–51, Heidelberg` : "",
        desc: [c.title, c.who].filter(Boolean).join("\n"),
        rrule: `FREQ=WEEKLY;UNTIL=${D.meta.semesterEnd.replace(/-/g, "")}T225959Z`,
        exdates,
        count: occ.length
      });
    });
    D.eks.filter(eksVisible).forEach((e, i) => {
      if (e.date === "2026-10-14") return;
      const loc = e.loc && D.places[e.loc] ? `${D.places[e.loc].name} – ${D.places[e.loc].desc}` : "";
      const desc = [].concat(e.details || [], e.note ? ["Hinweis: " + e.note] : [], e.link ? [e.link] : []).join("\n");
      const title = cleanTitle(e.title);
      if (!e.start) list.push({ uid: `eks-${i}`, allDay: true, date: e.date, title, loc, desc });
      else {
        const end = e.end || plusMin(e.start, isMealOrBuffer(e) ? 45 : 30);
        list.push({ uid: `eks-${i}`, date: e.date, start: e.start, end, title, loc, desc });
      }
    });
    D.laterEvents.forEach((e, i) => {
      list.push({ uid: `later-${i}`, allDay: !e.start, date: e.date, dateEnd: e.dateEnd, start: e.start, end: e.start ? plusMin(e.start, 120) : null, title: cleanTitle(e.title), loc: e.loc || "", desc: e.note || "" });
    });
    D.keyDates.forEach((kd, i) => {
      list.push({ uid: `kd-${i}`, allDay: true, date: kd.date, dateEnd: kd.dateEnd, title: cleanTitle(kd.title), loc: kd.loc || "", desc: kd.text || "" });
    });
    return list;
  }

  /* ========================================================================
     WOCHENANSICHT
     ======================================================================== */
  function renderCalWeekView(curDate, visibleEvents, allEvents, todayStr, curDateStr) {
    const mon = getMonday(curDate);
    const days = [0, 1, 2, 3, 4, 5, 6].map(i => {
      const d = addDays(mon, i);
      const s = ymd(d);
      return {
        date: s,
        dow: d.getDay(),
        name: DAY_NAMES[d.getDay()],
        longName: DAY_LONG[d.getDay()],
        d: d.getDate(),
        m: d.getMonth() + 1,
        isToday: s === todayStr,
        inBreak: inBreak(s)
      };
    });

    const weekendHasEvents = visibleEvents.some(e => {
      const sa = days[5].date;
      const so = days[6].date;
      return e.date === sa || e.date === so || (e.dateEnd && e.date <= so && sa <= e.dateEnd);
    });

    const activeDays = weekendHasEvents ? days : days.slice(0, 5);
    const numCols = activeDays.length;
    const weekStart = activeDays[0].date;
    const weekEnd = activeDays[activeDays.length - 1].date;

    // Ganztägig & Multi-Day Spans (z.B. Übungsgruppe wählen 6.–9.10., EKS-Woche)
    const spanEvents = [];
    visibleEvents.forEach(e => {
      if (e.allDay || e.isSpan) {
        const eStart = e.date;
        const eEnd = e.dateEnd || e.date;
        if (eStart <= weekEnd && eEnd >= weekStart) {
          const startDayIndex = Math.max(0, daysBetween(weekStart, eStart));
          const endDayIndex = Math.min(numCols - 1, daysBetween(weekStart, eEnd));
          const colSpan = Math.max(1, endDayIndex - startDayIndex + 1);
          const isPhase = e.cat === "eks" || (!e.exam && !e.deadline && !e.holiday);
          spanEvents.push({
            event: e,
            colStart: startDayIndex + 1,
            colSpan,
            isPhase
          });
        }
      }
    });

    // Zeitgebundene Termine
    const dayTimedEvents = activeDays.map(d => {
      return visibleEvents.filter(e => e.start && !e.allDay && e.date === d.date);
    });
    const allTimedInWeek = dayTimedEvents.flat();

    let minHour = 9;
    let maxHour = 18;
    if (allTimedInWeek.length) {
      const minStart = Math.min(...allTimedInWeek.map(e => e.startMin));
      const maxEnd = Math.max(...allTimedInWeek.map(e => e.endMin));
      minHour = Math.max(7, Math.floor(minStart / 60));
      maxHour = Math.min(23, Math.ceil((maxEnd + 30) / 60));
    }
    if (maxHour - minHour < 7) maxHour = minHour + 7;

    // Stundenhöhe: 74px (so dass 30-min-Termin mindestens 35px erreicht -> mittlere Dichtestufe)
    const hourHeight = 74;
    const pxPerMin = hourHeight / 60;

    // Identifiziere lange zusammenhängende Lücken (>= 2 h), die an ALLEN Tagen leer sind
    state.expandedGaps = state.expandedGaps || {};
    const collapsedGaps = [];
    const minM = minHour * 60;
    const maxM = maxHour * 60;

    let gapStart = null;
    for (let m = minM; m < maxM; m += 30) {
      const hasEvent = allTimedInWeek.some(e => e.startMin < m + 30 && e.endMin > m);
      if (!hasEvent) {
        if (gapStart === null) gapStart = m;
      } else {
        if (gapStart !== null) {
          const gapLen = m - gapStart;
          if (gapLen >= 120) { // >= 2 Stunden
            const gStartH = Math.floor(gapStart / 60);
            const gEndH = Math.floor(m / 60);
            const gapKey = `gap-${weekStart}-${gStartH}-${gEndH}`;
            const isExpanded = Boolean(state.expandedGaps[gapKey]);
            if (!isExpanded) {
              collapsedGaps.push({
                key: gapKey,
                startHour: gStartH,
                endHour: gEndH,
                startOffsetMin: gapStart - minM,
                endOffsetMin: m - minM,
                gapMinutes: gapLen,
                heightPx: 28
              });
            }
          }
          gapStart = null;
        }
      }
    }
    if (gapStart !== null && (maxM - gapStart) >= 120) {
      const gStartH = Math.floor(gapStart / 60);
      const gEndH = Math.floor(maxM / 60);
      const gapKey = `gap-${weekStart}-${gStartH}-${gEndH}`;
      const isExpanded = Boolean(state.expandedGaps[gapKey]);
      if (!isExpanded) {
        collapsedGaps.push({
          key: gapKey,
          startHour: gStartH,
          endHour: gEndH,
          startOffsetMin: gapStart - minM,
          endOffsetMin: maxM - minM,
          gapMinutes: maxM - gapStart,
          heightPx: 28
        });
      }
    }

    const totalGridHeight = getAdjustedY(maxM - minM, collapsedGaps, pxPerMin);
    const laidOutByDay = dayTimedEvents.map(evs => layoutDayEvents(evs, minHour, pxPerMin, collapsedGaps));

    // Jetzt-Linie
    const n = now();
    const currentNowMin = n.getHours() * 60 + n.getMinutes();
    const isNowInRange = currentNowMin >= minM && currentNowMin <= maxM;
    const nowTopPx = getAdjustedY(currentNowMin - minM, collapsedGaps, pxPerMin);
    const nowFormatted = `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;

    let html = `<div class="cal-week-wrap"><div class="cal-week-board" style="--week-cols:${numCols};--hour-h:${hourHeight}px">`;

    // Spaltenköpfe (Spalte "Zeit" entfällt!)
    html += `<div class="cal-week-header-row"><div class="cal-week-head-time" aria-hidden="true"></div>${activeDays.map((d, idx) => {
      const evCount = dayTimedEvents[idx].length;
      return `
        <div class="cal-week-head-col ${d.isToday ? "today" : ""}" data-cal-pick-day="${esc(d.date)}" tabindex="0" role="button" aria-label="${d.longName}, ${d.d}. ${MONTHS[d.m - 1]} (${evCount} Termine)" title="Zur Tagesansicht wechseln" style="cursor:pointer">
          <b>${d.name}</b> ${d.d}.${d.m}.
          <span class="cal-head-count">${evCount}</span>
        </div>
      `;
    }).join("")}</div>`;

    // Ganztägig-Zeile
    if (spanEvents.length) {
      html += `<div class="cal-allday-row">
        <div class="cal-allday-label">Ganztägig</div>
        <div class="cal-allday-grid">
          ${spanEvents.map(({ event: e, colStart, colSpan, isPhase }) => `
            <div class="cal-allday-bar ${isPhase ? "phase" : (e.cat || "exam")}" style="--span-col:${colStart};--span-len:${colSpan}" data-event-id="${esc(e.id)}" tabindex="0" role="button" aria-label="${esc(e.fullTitle || e.title)}" title="${esc(e.fullTitle || e.title)}">
              ${esc(e.title)}${e.dateEnd && e.dateEnd !== e.date ? ` · ${dt(e.date).getDate()}.${dt(e.dateEnd).getMonth()+1}.–${dt(e.dateEnd).getDate()}.${dt(e.dateEnd).getMonth()+1}.` : ""}
            </div>
          `).join("")}
        </div>
      </div>`;
    }

    // Zeitraster
    html += `<div class="cal-time-grid">`;

    // Zeitachse links
    html += `<div class="cal-time-axis" style="height:${totalGridHeight}px">`;
    for (let h = minHour; h <= maxHour; h++) {
      const offsetMin = (h - minHour) * 60;
      const isInsideCollapsed = collapsedGaps.some(g => offsetMin > g.startOffsetMin && offsetMin < g.endOffsetMin);
      if (!isInsideCollapsed) {
        const tickY = getAdjustedY(offsetMin, collapsedGaps, pxPerMin);
        html += `<div class="cal-time-tick" style="position:absolute;top:${tickY}px;right:6px">${String(h).padStart(2, "0")}:00</div>`;
      }
    }
    html += `</div>`;

    // Eingeklappte Lücken über die gesamte Breite der Tagesspalten anzeigen
    collapsedGaps.forEach(g => {
      const gapTopY = getAdjustedY(g.startOffsetMin, collapsedGaps, pxPerMin);
      html += `
        <div class="cal-gap-collapse" style="top:${gapTopY}px;height:${g.heightPx}px" data-gap-toggle="${esc(g.key)}" tabindex="0" role="button" aria-label="${String(g.startHour).padStart(2, "0")}:00 bis ${String(g.endHour).padStart(2, "0")}:00 aufklappen" title="Lücke ${String(g.startHour).padStart(2, "0")}:00–${String(g.endHour).padStart(2, "0")}:00 aufklappen">
          <span class="cal-gap-collapse-label">${String(g.startHour).padStart(2, "0")}:00–${String(g.endHour).padStart(2, "0")}:00 · keine Termine ↕</span>
        </div>
      `;
    });

    // Tagesspalten
    activeDays.forEach((d, dayIdx) => {
      const isToday = d.isToday;
      const laidOut = laidOutByDay[dayIdx];

      html += `<div class="cal-day-col ${isToday ? "today" : ""}" style="height:${totalGridHeight}px">`;

      if (isToday && isNowInRange) {
        html += `<div class="cal-now-line" style="top:${nowTopPx}px">
          <span class="cal-now-badge">${nowFormatted}</span>
        </div>`;
      }

      laidOut.forEach(ev => {
        const isPast = isToday && ev.endMin <= currentNowMin;
        const isNow = isToday && ev.startMin <= currentNowMin && currentNowMin < ev.endMin;
        const density = getEventDensity(ev.height);

        let innerContent = "";
        if (density === "density-compact") {
          innerContent = `
            <span class="cal-card-title">${esc(ev.title)}</span>
            <span class="cal-card-time">${esc(ev.start)}</span>
          `;
        } else if (density === "density-medium") {
          innerContent = `
            <div class="cal-card-title">${esc(ev.title)}</div>
            <div class="cal-card-sub">${esc(ev.start)}${ev.end ? "–" + esc(ev.end) : ""}${ev.locShort ? " · " + esc(ev.locShort) : ""}</div>
          `;
        } else {
          innerContent = `
            <div class="cal-card-title">${esc(ev.title)}</div>
            <div class="cal-card-time">${esc(ev.start)}${ev.end ? "–" + esc(ev.end) : ""}</div>
            ${ev.locShort ? `<div class="cal-card-loc">${pinIconSvg()} ${esc(ev.locShort)}</div>` : ""}
          `;
        }

        html += `
          <div class="cal-event-block ${ev.cat || "vl"} ${density} ${ev.isBuffer ? "is-buffer" : ""} ${isPast ? "is-past" : ""} ${isNow ? "is-now" : ""}"
               style="top:${ev.top}px;height:${ev.height}px;left:${ev.leftPct}%;width:calc(${ev.widthPct}% - 4px)"
               data-event-id="${esc(ev.id)}"
               tabindex="0" role="button"
               aria-label="${esc(ev.fullTitle || ev.title)}, ${ev.start} bis ${ev.end || 'offen'}${ev.locLong ? ', ' + esc(ev.locLong) : ''}"
               title="${esc(ev.fullTitle || ev.title)} (${ev.start}–${ev.end || 'offen'})${ev.locLong ? ' · ' + esc(ev.locLong) : ''}">
            ${innerContent}
          </div>
        `;
      });

      html += `</div>`;
    });

    html += `</div></div></div>`;
    return html;
  }

  /* ========================================================================
     TAGESANSICHT (ZWEISPALTIG DESKTOP: AGENDA LINKS, DETAILS/MINI-MONAT RECHTS)
     ======================================================================== */
  function renderCalDayView(curDateStr, visibleEvents, allEvents, todayStr) {
    const isToday = curDateStr === todayStr;
    const n = now();
    const currentNowMin = isToday ? n.getHours() * 60 + n.getMinutes() : -1;
    const nowFormatted = `${String(n.getHours()).padStart(2, "0")}:${String(n.getMinutes()).padStart(2, "0")}`;

    const dayEvs = visibleEvents.filter(e => e.date === curDateStr || (e.dateEnd && e.date <= curDateStr && curDateStr <= e.dateEnd));
    dayEvs.sort((a, b) => {
      if (!a.start && b.start) return -1;
      if (a.start && !b.start) return 1;
      return (a.start || "00:00").localeCompare(b.start || "00:00");
    });

    const runningEvent = isToday ? dayEvs.find(e => e.start && parseMin(e.start) <= currentNowMin && currentNowMin < parseMin(e.end || plusMin(e.start, 30))) : null;
    const upcomingEvent = isToday ? dayEvs.find(e => e.start && parseMin(e.start) > currentNowMin) : null;

    // Ausgewähltes Event (Default: laufendes Event oder erstes Event des Tages)
    let selectedEvent = state.selectedEventId ? allEvents.find(e => e.id === state.selectedEventId) : null;

    // Linke Spalte: Terminliste mit Lückentrennern & relativer Jetzt-Linie
    let listHtml = "";
    if (dayEvs.length) {
      let nowLineInserted = false;
      const rows = [];

      for (let i = 0; i < dayEvs.length; i++) {
        const e = dayEvs[i];
        const eStartMin = e.start ? parseMin(e.start) : 0;
        const eEndMin = e.start ? parseMin(e.end || plusMin(e.start, 30)) : 0;

        // Jetzt-Linie einfügen am heutigen Tag vor diesem Termin
        if (isToday && !nowLineInserted && e.start && currentNowMin < eStartMin) {
          rows.push(`
            <div class="cal-agenda-now-marker" aria-label="Aktuelle Uhrzeit ${nowFormatted}">
              <span class="cal-agenda-now-pill">Jetzt · ${nowFormatted}</span>
            </div>
          `);
          nowLineInserted = true;
        }

        // Lückentrenner prüfen (zwischen vorherigem und aktuellem zeitgebundenem Termin)
        if (i > 0) {
          const prev = dayEvs[i - 1];
          if (prev.start && e.start) {
            const prevEnd = parseMin(prev.end || plusMin(prev.start, 30));
            const gapMins = eStartMin - prevEnd;
            if (gapMins >= 30) {
              const gapStr = fmtDuration(gapMins);
              const prevEndStr = prev.end || plusMin(prev.start, 30);
              rows.push(`
                <div class="cal-gap-divider">
                  <span>Frei · ${prevEndStr}–${e.start} · ${gapStr}</span>
                </div>
              `);
            }
          }
        }

        const isPast = isToday && e.start && eEndMin <= currentNowMin;
        const isNow = isToday && e.start && eStartMin <= currentNowMin && currentNowMin < eEndMin;
        const isSel = selectedEvent && selectedEvent.id === e.id;

        rows.push(`
          <div class="cal-agenda-row ${e.cat || "vl"} ${isPast ? "is-past" : ""} ${isNow ? "is-now" : ""} ${isSel ? "selected" : ""}" data-event-id="${esc(e.id)}" tabindex="0" role="button" aria-label="${esc(e.fullTitle || e.title)}">
            <div class="cal-agenda-time">
              ${e.start ? `${esc(e.start)}${e.end ? "–" + esc(e.end) : ""}` : "Ganztägig"}
            </div>
            <div class="cal-agenda-content">
              <div class="cal-agenda-title-line">
                <span class="cal-agenda-title">${esc(e.fullTitle || e.title)}</span>
                <span class="badge ${e.cat || "vl"}">${esc(e.kind || "Termin")}</span>
                ${e.locShort ? `<span class="badge loc">${pinIconSvg()} ${esc(e.locShort)}</span>` : ""}
              </div>
            </div>
            ${e.durationStr ? `<div class="cal-agenda-duration">${esc(e.durationStr)}</div>` : ""}
          </div>
        `);
      }

      // Jetzt-Linie nach dem letzten Termin einfügen, falls noch nicht geschehen
      if (isToday && !nowLineInserted) {
        rows.push(`
          <div class="cal-agenda-now-marker" aria-label="Aktuelle Uhrzeit ${nowFormatted}">
            <span class="cal-agenda-now-pill">Jetzt · ${nowFormatted}</span>
          </div>
        `);
      }

      listHtml = `<div class="cal-agenda-list">${rows.join("")}</div>`;
    } else {
      const nextAvail = visibleEvents.filter(e => e.date > curDateStr && e.start).sort((a,b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start))[0];
      const nextMsg = nextAvail ? `Nächster Termin: ${fmtShort(nextAvail.date)}, ${nextAvail.start} Uhr · ${nextAvail.fullTitle || nextAvail.title}` : "Keine weiteren Termine eingetragen.";
      listHtml = `
        <div class="cal-empty-card">
          <div style="font-size:2rem">🌿</div>
          <h3 class="cal-empty-title">Frei – Keine Termine an diesem Tag</h3>
          <p class="muted small" style="margin:0">${esc(nextMsg)}</p>
        </div>
      `;
    }

    // Rechte Spalte: Detailpanel
    let sidePanelHtml = "";
    if (selectedEvent) {
      sidePanelHtml = `
        <div class="cal-side-panel">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <span class="badge ${selectedEvent.cat || "vl"}">${esc(selectedEvent.kind || "Termin")}</span>
            <button type="button" class="btn ghost small" id="calClearSelectBtn" style="padding:.2rem .5rem">✕ Schließen</button>
          </div>
          <h2 class="cal-panel-title">${esc(selectedEvent.fullTitle || selectedEvent.title)}</h2>
          <dl class="cal-panel-meta">
            <dt>Datum:</dt>
            <dd><strong>${esc(fmtLong(selectedEvent.date))}${selectedEvent.dateEnd && selectedEvent.dateEnd !== selectedEvent.date ? " bis " + esc(fmtLong(selectedEvent.dateEnd)) : ""}</strong></dd>
            <dt>Zeit:</dt>
            <dd>${selectedEvent.start ? `${esc(selectedEvent.start)}–${esc(selectedEvent.end || plusMin(selectedEvent.start, 60))} Uhr${selectedEvent.durationStr ? ` · ${esc(selectedEvent.durationStr)}` : ""}` : "Ganztägig"}</dd>
            ${selectedEvent.who ? `<dt>Dozent*in:</dt><dd>${esc(selectedEvent.who)}</dd>` : ""}
            ${selectedEvent.locLong ? `<dt>Ort:</dt><dd>${placeBadge(selectedEvent.loc, true)}${selectedEvent.locDesc ? `<div class="small muted" style="margin-top:.2rem">${esc(selectedEvent.locDesc)}</div>` : ""}</dd>` : ""}
            ${selectedEvent.choice ? `<dt>Gruppe:</dt><dd>${selectedEvent.choice === "ue" ? `Übungsgruppe ${selectedEvent.group}` : `Statistik-Tutorium Gruppe ${selectedEvent.group}`}</dd>` : ""}
          </dl>
          ${selectedEvent.details && selectedEvent.details.length ? `
            <div style="border-top:1px solid rgba(181,161,138,.3);padding-top:.75rem">
              <strong class="small" style="display:block;margin-bottom:.3rem">Details:</strong>
              <ul style="margin:0;padding-left:1.2rem;font-size:.85rem;color:var(--muted)">
                ${selectedEvent.details.map(d => `<li>${esc(d)}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
          ${selectedEvent.note ? `<div class="event-modal-note"><strong>Hinweis:</strong> ${esc(selectedEvent.note)}</div>` : ""}
          <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.5rem">
            <button type="button" class="btn primary small" id="calPanelIcsBtn">Termin in Kalender (.ics)</button>
            ${selectedEvent.srcUrl ? srcLink(selectedEvent.srcUrl, "Offizielle Quelle") : ""}
          </div>
        </div>
      `;
    } else {
      // Wenn nichts ausgewählt ist: Hero für "Jetzt / Als Nächstes" + Mini-Monat zur Navigation
      let heroSection = "";
      if (runningEvent) {
        heroSection = `
          <div class="cal-today-hero" data-event-id="${esc(runningEvent.id)}" style="cursor:pointer">
            <div class="cal-hero-status">🟢 Läuft gerade</div>
            <h2 class="cal-hero-title">${esc(runningEvent.fullTitle || runningEvent.title)}</h2>
            <div class="cal-hero-meta">
              <span>🕒 ${esc(runningEvent.start)}–${esc(runningEvent.end || "")} Uhr${runningEvent.durationStr ? ` (${esc(runningEvent.durationStr)})` : ""}</span>
              ${runningEvent.locShort ? `<span>${pinIconSvg()} ${esc(runningEvent.locLong || runningEvent.locShort)}</span>` : ""}
            </div>
          </div>
        `;
      } else if (upcomingEvent) {
        const minsUntil = parseMin(upcomingEvent.start) - currentNowMin;
        const timeLabel = minsUntil <= 60 ? `in ${minsUntil} Min.` : `um ${upcomingEvent.start} Uhr`;
        heroSection = `
          <div class="cal-today-hero" data-event-id="${esc(upcomingEvent.id)}" style="cursor:pointer">
            <div class="cal-hero-status">⏱️ Als Nächstes (${timeLabel})</div>
            <h2 class="cal-hero-title">${esc(upcomingEvent.fullTitle || upcomingEvent.title)}</h2>
            <div class="cal-hero-meta">
              <span>🕒 ${esc(upcomingEvent.start)}–${esc(upcomingEvent.end || "")} Uhr</span>
              ${upcomingEvent.locShort ? `<span>${pinIconSvg()} ${esc(upcomingEvent.locLong || upcomingEvent.locShort)}</span>` : ""}
            </div>
          </div>
        `;
      }

      // Mini-Monatskalender
      const curD = dt(curDateStr);
      const mYear = curD.getFullYear();
      const mMonth = curD.getMonth();
      const monthDays = getMonthDays(mYear, mMonth);
      const dows = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

      const miniMonthHtml = `
        <div class="cal-mini-month">
          <div class="cal-mini-head">
            <span>${MONTHS[mMonth]} ${mYear}</span>
            <span class="small muted">Tag wählen</span>
          </div>
          <div class="cal-mini-grid">
            ${dows.map(d => `<div class="cal-mini-dows">${d}</div>`).join("")}
            ${monthDays.map(d => {
              const isT = d.date === todayStr;
              const isS = d.date === curDateStr;
              return `<div class="cal-mini-day ${d.otherMonth ? "other-month" : ""} ${isT ? "today" : ""} ${isS ? "selected" : ""}" data-cal-pick-day="${esc(d.date)}" title="${esc(fmtShort(d.date))}">${d.d}</div>`;
            }).join("")}
          </div>
        </div>
      `;

      sidePanelHtml = `
        <div class="cal-side-panel">
          ${heroSection}
          ${miniMonthHtml}
        </div>
      `;
    }

    return `
      <div class="cal-day-layout">
        <div class="cal-day-agenda-wrap">
          ${listHtml}
        </div>
        <div class="cal-day-side-wrap">
          ${sidePanelHtml}
        </div>
      </div>
    `;
  }

  /* ========================================================================
     MONATSANSICHT (TERMINE IN DEN ZELLEN, KW-SPALTE, PHASEN)
     ======================================================================== */
  function renderCalMonthView(curDate, visibleEvents, allEvents, todayStr, curDateStr) {
    const year = curDate.getFullYear();
    const month = curDate.getMonth();
    const days = getMonthDays(year, month);
    const dows = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

    // Gruppiere Monatstage nach Wochen (je 7 Tage)
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    let gridHtml = `
      <div class="cal-month-wrap">
        <div class="cal-month-header">
          <div class="cal-month-kw-head" title="Kalenderwoche">KW</div>
          ${dows.map(d => `<div>${d}</div>`).join("")}
        </div>
        <div class="cal-month-grid">
    `;

    weeks.forEach(weekDays => {
      const monDate = weekDays[0].date;
      const kwNum = getWeekNumber(dt(monDate));

      gridHtml += `
        <div class="cal-month-week-row">
          <div class="cal-kw-cell" data-cal-pick-week="${esc(monDate)}" tabindex="0" role="button" aria-label="KW ${kwNum} in Wochenansicht öffnen" title="KW ${kwNum} in Wochenansicht öffnen">
            KW ${kwNum}
          </div>
      `;

      weekDays.forEach(d => {
        const isToday = d.date === todayStr;
        const isSelected = d.date === curDateStr;
        const isWeekend = dt(d.date).getDay() === 0 || dt(d.date).getDay() === 6;

        const dayEvs = visibleEvents.filter(e => e.date === d.date || (e.dateEnd && e.date <= d.date && d.date <= e.dateEnd));

        // Fristen & Prüfungen priorisieren
        dayEvs.sort((a, b) => {
          if ((a.exam || a.deadline) && !(b.exam || b.deadline)) return -1;
          if (!(a.exam || a.deadline) && (b.exam || b.deadline)) return 1;
          return (a.start || "00:00").localeCompare(b.start || "00:00");
        });

        // Phasen-Badge
        let phaseTitle = "";
        if (d.date >= "2026-10-05" && d.date <= "2026-10-12") phaseTitle = "EKS-Woche";
        else if (d.date === "2026-10-14") phaseTitle = "Vorlesungsstart";
        else if (d.inBreak) phaseTitle = "Weihnachtspause";
        else if (d.date >= "2027-02-08" && d.date <= "2027-02-26") phaseTitle = "Klausurenphase";

        const maxVisibleEvents = 3;
        const visibleSlice = dayEvs.slice(0, maxVisibleEvents);
        const overflow = dayEvs.length - maxVisibleEvents;

        gridHtml += `
          <div class="cal-month-cell ${d.otherMonth ? "other-month" : ""} ${isWeekend ? "weekend" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}"
               data-cal-jump-day="${esc(d.date)}"
               tabindex="0" role="button"
               title="${esc(fmtLong(d.date))} · Klick wählt Tag">
            <div class="cal-cell-top">
              <span class="cal-cell-daynum" data-cal-pick-day="${esc(d.date)}" role="button" tabindex="0" title="Tagesansicht öffnen">${d.d}</span>
            </div>
            ${phaseTitle ? `<div class="cal-cell-phase-badge" title="${esc(phaseTitle)}">${esc(phaseTitle)}</div>` : ""}
            <div class="cal-month-events-list">
              ${visibleSlice.map(ev => `
                <div class="cal-month-event-item ${ev.cat || "vl"}" data-event-id="${esc(ev.id)}" title="${esc(ev.fullTitle || ev.title)} (${ev.start || 'Ganztägig'})">
                  ${ev.start ? `<span class="cal-month-event-time">${ev.start}</span>` : ""}
                  <span class="cal-month-event-title">${esc(ev.title)}</span>
                </div>
              `).join("")}
              ${overflow > 0 ? `
                <button type="button" class="cal-month-more-btn" data-cal-more-day="${esc(d.date)}" title="Alle ${dayEvs.length} Termine anzeigen">+${overflow} weitere</button>
              ` : ""}
            </div>
          </div>
        `;
      });

      gridHtml += `</div>`;
    });

    gridHtml += `</div></div>`;

    // Wichtige Phasen mit monochromen SVG-Icons
    const phasesHtml = `
      <div class="cal-phases-row">
        <span class="small muted" style="font-weight:700">Wichtige Phasen:</span>
        <button class="cal-phase-pill" data-cal-jump-date="2026-10-05">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
          EKS-Woche (5.–12. Okt)
        </button>
        <button class="cal-phase-pill" data-cal-jump-date="2026-10-14">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          Vorlesungsstart (14. Okt)
        </button>
        <button class="cal-phase-pill" data-cal-jump-date="2026-12-21">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          Weihnachtspause (21. Dez – 6. Jan)
        </button>
        <button class="cal-phase-pill" data-cal-jump-date="2027-02-08">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          Klausurenphase (ab 8. Feb)
        </button>
      </div>
    `;

    return gridHtml + phasesHtml;
  }

  /* ========================================================================
     KALENDER HAUPTANSICHT
     ======================================================================== */
  function renderCalendar(el) {
    const n = now();
    const todayStr = ymd(n);
    if (!state.calDate) state.calDate = todayStr;
    const curDateStr = state.calDate;
    const curDate = dt(curDateStr);

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 760;
    const urlView = new URLSearchParams(location.search).get("view") || new URLSearchParams(location.search).get("calView");
    let activeView = (urlView && ["day", "week", "month"].includes(urlView)) ? urlView : state.calViewExplicit;
    if (!activeView) {
      if (isMobile) activeView = "day";
      else if (curDateStr >= "2026-10-05" && curDateStr <= "2026-10-12") activeView = "week";
      else activeView = "day";
    }
    state.calView = activeView;

    if (!state.calFilters) {
      state.calFilters = { vl: true, ue: true, eks: true, exam: true };
    }

    const allEvents = getMasterCalendarEvents();
    const visibleEvents = filterCalendarEvents(allEvents);

    // Titel für die gewählte Ansicht mit relativer Kennzeichnung
    let periodTitle = "";
    if (state.calView === "month") {
      periodTitle = `${MONTHS[curDate.getMonth()]} ${curDate.getFullYear()}`;
    } else if (state.calView === "week") {
      const mon = getMonday(curDate);
      const isEks = ymd(mon) === "2026-10-05";
      const fri = addDays(mon, 4);
      periodTitle = `${fmtRange(ymd(mon), ymd(fri))}${isEks ? " · EKS-Woche" : ` · KW ${getWeekNumber(mon)}`}`;
    } else {
      const dayDiff = daysBetween(todayStr, curDateStr);
      let relLabel = "";
      if (dayDiff === 0) relLabel = "Heute · ";
      else if (dayDiff === 1) relLabel = "Morgen · ";
      else if (dayDiff === -1) relLabel = "Gestern · ";
      periodTitle = `${relLabel}${fmtShort(curDateStr)}`;
    }

    // Aktive Filter zählen
    const inactiveCount = Object.values(state.calFilters).filter(v => v === false).length;

    let viewHtml = "";
    if (state.calView === "month") {
      viewHtml = renderCalMonthView(curDate, visibleEvents, allEvents, todayStr, curDateStr);
    } else if (state.calView === "week") {
      viewHtml = renderCalWeekView(curDate, visibleEvents, allEvents, todayStr, curDateStr);
    } else {
      viewHtml = renderCalDayView(curDateStr, visibleEvents, allEvents, todayStr);
    }

    el.innerHTML = `
      <div class="page-head">
        <h1>Kalender &amp; Stundenplan</h1>
        <p>Wintersemester 2026/27 · Psychologie B.Sc. Heidelberg · Alle Vorlesungen, Übungen, Termine und Fristen passend zu deinen Gruppen.</p>
        <p class="small src-line">Quellen: ${srcLink(D.src.timetable, "Veranstaltungsübersicht (heiBOX)")} ${srcLink(D.src.semester, "Semestertermine")} ${srcLink("https://www.psychologie.uni-heidelberg.de/studium/a-z/veranstaltungsuebersicht", "heiCO Lehrangebot")}</p>
      </div>

      <div class="card">
        <!-- Steuerleiste: Tag | Woche | Monat -->
        <div class="cal-control-bar">
          <div class="cal-seg" role="tablist" aria-label="Kalenderansicht">
            <button class="cal-seg-btn ${state.calView === "day" ? "active" : ""}" data-cal-view="day" role="tab" aria-selected="${state.calView === "day"}">Tag</button>
            <button class="cal-seg-btn ${state.calView === "week" ? "active" : ""}" data-cal-view="week" role="tab" aria-selected="${state.calView === "week"}">Woche</button>
            <button class="cal-seg-btn ${state.calView === "month" ? "active" : ""}" data-cal-view="month" role="tab" aria-selected="${state.calView === "month"}">Monat</button>
          </div>

          <div class="cal-nav-bar">
            <button class="cal-icon-btn" data-cal-nav="prev" aria-label="Zurück" title="Vorheriger Zeitraum">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
            <span class="cal-title-pill">${esc(periodTitle)}</span>
            <button class="cal-icon-btn" data-cal-nav="next" aria-label="Weiter" title="Nächster Zeitraum">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
            <button class="btn ghost small cal-today-btn" data-cal-nav="today" title="Zu Heute springen">Heute</button>

            <!-- Filter Popover Button -->
            <div class="cal-popover-wrap">
              <button class="cal-icon-btn" id="calFilterBtn" aria-label="Filter" aria-expanded="false" title="Termine filtern">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/></svg>
                ${inactiveCount > 0 ? `<span class="cal-filter-badge">${4 - inactiveCount}</span>` : ""}
              </button>
              <div class="cal-popover" id="calFilterPopover" hidden>
                <h4 class="cal-popover-title">Kategorien filtern</h4>
                <div class="cal-popover-list">
                  <label class="cal-popover-item">
                    <input type="checkbox" data-filter-cat="vl" ${state.calFilters.vl !== false ? "checked" : ""}>
                    <span class="cal-dot vl"></span> Vorlesungen
                  </label>
                  <label class="cal-popover-item">
                    <input type="checkbox" data-filter-cat="ue" ${state.calFilters.ue !== false ? "checked" : ""}>
                    <span class="cal-dot ue"></span> Übungen &amp; Tutorien
                  </label>
                  <label class="cal-popover-item">
                    <input type="checkbox" data-filter-cat="eks" ${state.calFilters.eks !== false ? "checked" : ""}>
                    <span class="cal-dot eks"></span> EKS &amp; Events
                  </label>
                  <label class="cal-popover-item">
                    <input type="checkbox" data-filter-cat="exam" ${state.calFilters.exam !== false ? "checked" : ""}>
                    <span class="cal-dot exam"></span> Fristen &amp; Prüfungen
                  </label>
                </div>
                <div style="border-top:1px solid rgba(181,161,138,.3);padding-top:.75rem;margin-top:.25rem">
                  <button type="button" class="btn small" style="width:100%" id="calOpenSettingsBtn">⚙️ Meine Gruppen anpassen</button>
                </div>
              </div>
            </div>

            <!-- Kalenderexport -->
            <button class="cal-icon-btn" data-ics="full" aria-label="Kalender exportieren" title="Meinen Kalender exportieren (.ics)">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
            </button>
          </div>
        </div>

        <!-- 4-Farben Legende als klickbare Filter-Chips (einheitlich in Tag, Woche, Monat) -->
        <div class="cal-legend-bar" role="toolbar" aria-label="Kategoriefilter">
          <button type="button" class="cal-legend-chip ${state.calFilters.vl === false ? "inactive" : ""}" data-cal-toggle-cat="vl" aria-pressed="${state.calFilters.vl !== false}">
            <span class="cal-dot vl"></span> Vorlesung
          </button>
          <button type="button" class="cal-legend-chip ${state.calFilters.ue === false ? "inactive" : ""}" data-cal-toggle-cat="ue" aria-pressed="${state.calFilters.ue !== false}">
            <span class="cal-dot ue"></span> Übung / Tutorium
          </button>
          <button type="button" class="cal-legend-chip ${state.calFilters.eks === false ? "inactive" : ""}" data-cal-toggle-cat="eks" aria-pressed="${state.calFilters.eks !== false}">
            <span class="cal-dot eks"></span> EKS &amp; Event
          </button>
          <button type="button" class="cal-legend-chip ${state.calFilters.exam === false ? "inactive" : ""}" data-cal-toggle-cat="exam" aria-pressed="${state.calFilters.exam !== false}">
            <span class="cal-dot exam"></span> Frist / Prüfung
          </button>
        </div>

        ${viewHtml}
      </div>

      <div class="grid grid-2" style="margin-top:1rem">
        <div class="card">
          <h2>Gut zu wissen</h2>
          <ul class="qa">${D.timetableNotes.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
        <div class="card">
          <h2>Alle Vorlesungen im 1. Semester</h2>
          <table class="compare">
            <thead><tr><th>Kurs</th><th>Wann</th><th>Start</th></tr></thead>
            <tbody>
              ${D.timetable.filter(c => c.kind === "VL").map(c => `<tr><td><b>${esc(c.title)}</b><div class="muted small">${[esc(c.who), c.loc ? placeBadge(c.loc) : ""].filter(Boolean).join(" · ")}</div></td><td>${DAY_NAMES[c.day]} ${esc(c.start)}</td><td>${esc(fmtShort(c.first))}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Event Listeners:
    $$("[data-cal-view]", el).forEach(b => b.addEventListener("click", () => {
      state.calView = b.dataset.calView;
      state.calViewExplicit = b.dataset.calView;
      save();
      renderCalendar(el);
    }));

    $$("[data-cal-nav]", el).forEach(b => b.addEventListener("click", () => {
      const act = b.dataset.calNav;
      if (act === "today") {
        state.calDate = todayStr;
      } else if (act === "prev") {
        if (state.calView === "day") state.calDate = ymd(addDays(curDate, -1));
        else if (state.calView === "week") state.calDate = stepWeek(curDateStr, -1);
        else state.calDate = stepMonth(curDateStr, -1);
      } else if (act === "next") {
        if (state.calView === "day") state.calDate = ymd(addDays(curDate, 1));
        else if (state.calView === "week") state.calDate = stepWeek(curDateStr, 1);
        else state.calDate = stepMonth(curDateStr, 1);
      }
      save();
      renderCalendar(el);
    }));

    // Klick auf Tag in Woche oder Monat wechselt zu Tagesansicht
    $$("[data-cal-pick-day]", el).forEach(cell => cell.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetDate = cell.dataset.calPickDay;
      if (targetDate) {
        state.calDate = targetDate;
        state.calView = "day";
        state.calViewExplicit = "day";
        save();
        renderCalendar(el);
      }
    }));

    // Klick auf Monatstag wählt ihn aus
    $$("[data-cal-jump-day]", el).forEach(cell => cell.addEventListener("click", () => {
      const targetDate = cell.dataset.calJumpDay;
      if (targetDate) {
        state.calDate = targetDate;
        save();
        renderCalendar(el);
      }
    }));

    // Klick auf Kalenderwoche (KW) wechselt zu Wochenansicht
    $$("[data-cal-pick-week]", el).forEach(btn => btn.addEventListener("click", () => {
      state.calDate = btn.dataset.calPickWeek;
      state.calView = "week";
      state.calViewExplicit = "week";
      save();
      renderCalendar(el);
    }));

    // Lücke in der Woche auf/zuklappen
    $$("[data-gap-toggle]", el).forEach(btn => btn.addEventListener("click", () => {
      const key = btn.dataset.gapToggle;
      state.expandedGaps = state.expandedGaps || {};
      state.expandedGaps[key] = !state.expandedGaps[key];
      save();
      renderCalendar(el);
    }));

    // Direktsprung zu wichtigen Phasen
    $$("[data-cal-jump-date]", el).forEach(btn => btn.addEventListener("click", () => {
      state.calDate = btn.dataset.calJumpDate;
      state.calView = "week";
      state.calViewExplicit = "week";
      save();
      renderCalendar(el);
    }));

    // Legenden-Chips schalten Filter um
    $$("[data-cal-toggle-cat]", el).forEach(chip => chip.addEventListener("click", () => {
      const cat = chip.dataset.calToggleCat;
      state.calFilters = state.calFilters || { vl: true, ue: true, eks: true, exam: true };
      state.calFilters[cat] = state.calFilters[cat] === false ? true : false;
      save();
      renderCalendar(el);
    }));

    // "+n weitere" im Monat öffnet Popover
    $$("[data-cal-more-day]", el).forEach(btn => btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const dayDate = btn.dataset.calMoreDay;
      const dayEvents = visibleEvents.filter(ev => ev.date === dayDate || (ev.dateEnd && ev.date <= dayDate && dayDate <= ev.dateEnd));

      // Bestehendes Popover entfernen
      $(".cal-day-popover")?.remove();

      const pop = document.createElement("div");
      pop.className = "cal-day-popover";
      pop.innerHTML = `
        <div class="cal-day-popover-title">
          <span>${esc(fmtShort(dayDate))} (${dayEvents.length} Termine)</span>
          <button type="button" class="del" style="border:0;background:transparent;cursor:pointer;font-size:1.1rem;line-height:1">×</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:4px;max-height:240px;overflow-y:auto">
          ${dayEvents.map(ev => `
            <div class="cal-month-event-item ${ev.cat || "vl"}" data-event-id="${esc(ev.id)}" style="cursor:pointer" title="${esc(ev.fullTitle || ev.title)}">
              ${ev.start ? `<span class="cal-month-event-time">${ev.start}</span>` : ""}
              <span class="cal-month-event-title">${esc(ev.title)}</span>
            </div>
          `).join("")}
        </div>
        <button type="button" class="btn small" style="width:100%;margin-top:.4rem" data-cal-pick-day="${esc(dayDate)}">Tagesansicht öffnen</button>
      `;

      btn.closest(".cal-month-cell")?.appendChild(pop);
      $(".del", pop)?.addEventListener("click", (evt) => { evt.stopPropagation(); pop.remove(); });
      $("[data-cal-pick-day]", pop)?.addEventListener("click", () => {
        state.calDate = dayDate;
        state.calView = "day";
        state.calViewExplicit = "day";
        save();
        renderCalendar(el);
      });
      $$("[data-event-id]", pop).forEach(c => c.addEventListener("click", (evt) => {
        evt.stopPropagation();
        const found = allEvents.find(x => x.id === c.dataset.eventId);
        if (found) openEventModal(found);
      }));

      document.addEventListener("click", (evt) => {
        if (!pop.contains(evt.target)) pop.remove();
      }, { once: true });
    }));

    // ICS Export
    const icsBtn = $("[data-ics=full]", el);
    if (icsBtn) {
      icsBtn.addEventListener("click", () => {
        downloadIcs("mein-psychologie-kalender-wiSe26-27.ics", fullSemesterIcsEvents());
      });
    }

    // Filter Popover Steuerung
    const filterBtn = $("#calFilterBtn", el);
    const filterPopover = $("#calFilterPopover", el);
    if (filterBtn && filterPopover) {
      filterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isHidden = filterPopover.hasAttribute("hidden");
        if (isHidden) {
          filterPopover.removeAttribute("hidden");
          filterBtn.setAttribute("aria-expanded", "true");
        } else {
          filterPopover.setAttribute("hidden", "");
          filterBtn.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("click", (e) => {
        if (!filterPopover.contains(e.target) && e.target !== filterBtn) {
          filterPopover.setAttribute("hidden", "");
          filterBtn.setAttribute("aria-expanded", "false");
        }
      }, { once: true });
    }

    $$("[data-filter-cat]", el).forEach(chk => chk.addEventListener("change", () => {
      const cat = chk.dataset.filterCat;
      state.calFilters[cat] = chk.checked;
      save();
      renderCalendar(el);
    }));

    const openSetBtn = $("#calOpenSettingsBtn", el);
    if (openSetBtn) {
      openSetBtn.addEventListener("click", () => {
        filterPopover.setAttribute("hidden", "");
        openSettings();
      });
    }

    // Termin-Klick öffnet Detail-Modal oder wählt Event im Tages-Panel aus
    $$("[data-event-id]", el).forEach(card => card.addEventListener("click", (e) => {
      e.stopPropagation();
      const evId = card.dataset.eventId;
      const found = allEvents.find(x => x.id === evId);
      if (!found) return;

      if (state.calView === "day") {
        state.selectedEventId = evId;
        save();
        renderCalendar(el);
      } else {
        openEventModal(found);
      }
    }));

    // Button Auswahl aufheben im Tagespanel
    const clearSelBtn = $("#calClearSelectBtn", el);
    if (clearSelBtn) {
      clearSelBtn.addEventListener("click", () => {
        state.selectedEventId = null;
        save();
        renderCalendar(el);
      });
    }

    // ICS-Export im Tagespanel
    const panelIcsBtn = $("#calPanelIcsBtn", el);
    if (panelIcsBtn && state.selectedEventId) {
      const ev = allEvents.find(x => x.id === state.selectedEventId);
      if (ev) {
        panelIcsBtn.addEventListener("click", () => {
          const item = {
            uid: `single-${Date.now()}`,
            date: ev.date,
            dateEnd: ev.dateEnd,
            start: ev.start,
            end: ev.end || (ev.start ? plusMin(ev.start, 60) : null),
            allDay: ev.allDay || !ev.start,
            title: ev.fullTitle || ev.title,
            loc: ev.locLong || (D.places[ev.loc]?.name || ev.loc),
            desc: [ev.who, ev.desc, ev.note].filter(Boolean).join("\n")
          };
          downloadIcs(`${(ev.title).toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`, [item]);
        });
      }
    }

    // Deep-Link Parameter zum Öffnen eines Events (?openEvent=...)
    const autoOpen = new URLSearchParams(location.search).get("openEvent");
    if (autoOpen) {
      const match = allEvents.find(x => x.id === autoOpen || x.title.toLowerCase().includes(autoOpen.toLowerCase()));
      if (match) setTimeout(() => openEventModal(match), 50);
    }

    // Tastaturnavigation für Kalender:
    // ← / → : Blättern
    // T : Tag
    // W : Woche
    // M : Monat
    // H : Heute
    const handleKeyNav = (e) => {
      if (document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
      if ($("#eventModal")?.open || $("#aiModal")?.open || $("#settings")?.open) return;
      const k = e.key.toLowerCase();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (state.calView === "day") state.calDate = ymd(addDays(curDate, -1));
        else if (state.calView === "week") state.calDate = stepWeek(curDateStr, -1);
        else state.calDate = stepMonth(curDateStr, -1);
        save();
        renderCalendar(el);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (state.calView === "day") state.calDate = ymd(addDays(curDate, 1));
        else if (state.calView === "week") state.calDate = stepWeek(curDateStr, 1);
        else state.calDate = stepMonth(curDateStr, 1);
        save();
        renderCalendar(el);
      } else if (k === "t") {
        e.preventDefault();
        state.calView = "day";
        state.calViewExplicit = "day";
        save();
        renderCalendar(el);
      } else if (k === "w") {
        e.preventDefault();
        state.calView = "week";
        state.calViewExplicit = "week";
        save();
        renderCalendar(el);
      } else if (k === "m") {
        e.preventDefault();
        state.calView = "month";
        state.calViewExplicit = "month";
        save();
        renderCalendar(el);
      } else if (k === "h") {
        e.preventDefault();
        state.calDate = todayStr;
        save();
        renderCalendar(el);
      } else if (e.key === "Enter" || e.key === " ") {
        const target = document.activeElement && document.activeElement.closest("[data-event-id], [data-cal-pick-day], [data-cal-jump-date], [data-cal-toggle-cat], [data-gap-toggle]");
        if (target) {
          e.preventDefault();
          target.click();
        }
      }
    };
    window._calKeyHandler && window.removeEventListener("keydown", window._calKeyHandler);
    window._calKeyHandler = handleKeyNav;
    window.addEventListener("keydown", window._calKeyHandler);
  }

  /* ========================================================================
     STUDIENPLAN
     ======================================================================== */
  function planStats(planKey = state.plan) {
    const plan = D.plans[planKey];
    const ids = plan.semesters.flat();
    const total = ids.reduce((s, id) => s + D.modules[id].lp, 0);
    const done = ids.filter(id => state.done[id]).reduce((s, id) => s + D.modules[id].lp, 0);
    const byCat = {};
    ids.forEach(id => { const m = D.modules[id]; byCat[m.cat] = byCat[m.cat] || { total: 0, done: 0 }; byCat[m.cat].total += m.lp; if (state.done[id]) byCat[m.cat].done += m.lp; });
    return { total, done, byCat };
  }

  function renderPlan(el) {
    const plan = D.plans[state.plan];
    const span = plan.span || {};
    const st = planStats();
    // LP je Semester; Module mit span werden gleichmäßig auf die Folgesemester verteilt
    const semLp = plan.semesters.map(() => 0);
    const carry = plan.semesters.map(() => []);
    plan.semesters.forEach((ids, i) => ids.forEach(id => {
      const n = span[id] || 1;
      for (let k = 0; k < n && i + k < semLp.length; k++) { semLp[i + k] += D.modules[id].lp / n; if (k > 0) carry[i + k].push(id); }
    }));

    const semHtml = plan.semesters.map((ids, i) => {
      const lp = semLp[i];
      const lpTxt = Number.isInteger(lp) ? lp : lp.toFixed(1);
      const cont = carry[i].map(id => `<div class="mod" style="--cat:${D.categories[D.modules[id].cat].color};cursor:default;border-style:dashed" aria-hidden="true">
        <span class="g">Fortsetzung</span><span class="n">${esc(D.modules[id].name)}</span><span class="m"><span></span><span>${D.modules[id].lp / span[id]} LP anteilig</span></span></div>`).join("");
      return `<div class="sem ${state.currentSem === i + 1 ? "current-sem" : ""}">
        <div class="sem-head"><h3>${i + 1}. Semester</h3><span class="lp ${lp > 32 ? "warnlp" : ""}">${lpTxt} LP</span></div>
        <div class="mods">${ids.map(id => modCard(id, span[id])).join("")}${cont}</div></div>`;
    }).join("");

    const cmp = compareRows();

    el.innerHTML = `
      <div class="page-head">
        <h1>Studienplan</h1>
        <p>B.Sc. Psychologie 100 %: <b>180 LP</b>, Regelstudienzeit 6 Semester. Klick auf ein Modul, um es abzuhaken. Häkchen gelten für alle Pläne – du kannst also jederzeit vergleichen oder wechseln.</p>
      </div>
      <div class="scroll-x"><div class="chips" role="tablist" aria-label="Studienplan-Variante">
        ${Object.entries(D.plans).map(([k, p]) => `<button class="chip" role="tab" aria-pressed="${k === state.plan}" data-plan="${k}">${esc(p.label)}</button>`).join("")}
      </div></div>
      <div class="grid grid-2" style="margin-top:1rem">
        <div class="card">
          <h2>${esc(plan.label)}</h2>
          <p class="muted">${esc(plan.desc)}</p>
          <p class="small src-line">${srcLink(plan.src, "Original-Studienplan (heiBOX)")} ${srcLink(D.src.handbook, "Modulhandbuch")}</p>
          <label class="small" style="font-weight:600">Ich bin gerade im
            <select data-cursem>${plan.semesters.map((_, i) => `<option value="${i + 1}" ${state.currentSem === i + 1 ? "selected" : ""}>${i + 1}. Semester</option>`).join("")}</select>
          </label>
        </div>
        <div class="card">
          <div class="card-head"><h2>Fortschritt</h2><span class="badge">${st.done} / ${st.total} LP</span></div>
          <div class="progress"><div style="width:${(st.done / st.total * 100).toFixed(1)}%"></div></div>
          <div class="cat-bars">${Object.entries(D.categories).filter(([k]) => st.byCat[k]).map(([k, c]) => {
            const b = st.byCat[k];
            return `<div class="cat-bar"><span>${esc(c.label)}</span><div class="progress"><div style="width:${(b.done / b.total * 100).toFixed(1)}%;background:${c.color}"></div></div><span class="num">${b.done}/${b.total}</span></div>`;
          }).join("")}</div>
        </div>
      </div>
      <div class="card" style="margin-top:1rem">
        <div class="plan-toolbar">
          <div class="chips" aria-label="Nach Bereich filtern">
            <button class="chip" aria-pressed="${state.catFilter === "all"}" data-cat="all">Alle</button>
            ${Object.entries(D.categories).map(([k, c]) => `<button class="chip" aria-pressed="${state.catFilter === k}" data-cat="${k}"><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${c.color};margin-right:.35rem"></i>${esc(c.label)}</button>`).join("")}
          </div>
          <button class="btn ghost" data-print>Drucken</button>
        </div>
        ${semHtml}
        <div class="legend" style="margin-top:.8rem">
          <span><i style="outline:2px solid var(--c-approb)"></i>nur approbationsrelevant</span>
          <span><i style="outline:2px dashed var(--c-uebergreifend)"></i>nur allgemeiner Weg</span>
          <span>V Vorlesung · Ü Übung · S Seminar · KG Kleingruppe · EA Eigenarbeit · P Praktikum</span>
        </div>
      </div>
      <div class="card" style="margin-top:1rem">
        <h2>Approbationsrelevant oder allgemein?</h2>
        <p class="muted">Die Semester 1–3 sind identisch. Ab dem 4. Semester unterscheidet sich nur der Wahlteil – alle anderen Module (Empra, FOV, Berufspraktikum, Bachelorarbeit …) sind gleich.</p>
        <div class="scroll-x"><table class="compare"><thead><tr><th>Semester</th><th>Approbationsrelevant</th><th>Allgemein</th></tr></thead>
        <tbody>${cmp}</tbody></table></div>
        <p class="small muted" style="margin-top:.6rem">Wann und wie du dich festlegen musst, steht nicht in den Unterlagen – am besten in der EKS (Di 6.10., Studienplanung) oder bei der Fachstudienberatung fragen.</p>
        <p class="small src-line">${srcLink(D.src.hbPage(36), "Modulhandbuch: Interdisz. Kompetenzen")} ${srcLink(D.src.hbPage(39), "AOV 1")} ${srcLink(D.src.hbPage(41), "AOV 2")} ${srcLink("https://www.psychologie.uni-heidelberg.de/studium/a-z/aov-im-bsc", "AOV im B.Sc.")}</p>
      </div>
      <div class="card" style="margin-top:1rem">
        <div class="card-head"><h2>Modulhandbuch</h2>${srcLink(D.src.handbook, "PDF öffnen")}</div>
        <p class="muted">Was in jedem Modul passiert, wie geprüft und benotet wird. Fassung vom 17.01.2024 – die Seitenzahl führt direkt zur Stelle im PDF.</p>
        <div class="hb-list">${D.handbook.map(hbItem).join("")}</div>
      </div>`;

    $$("[data-plan]", el).forEach(b => b.addEventListener("click", () => { state.plan = b.dataset.plan; if (state.currentSem > D.plans[state.plan].semesters.length) state.currentSem = 1; save(); renderPlan(el); }));
    $$("[data-cat]", el).forEach(b => b.addEventListener("click", () => { state.catFilter = b.dataset.cat; save(); renderPlan(el); }));
    $$("[data-mod]", el).forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.mod; state.done[id] = !state.done[id]; if (!state.done[id]) delete state.done[id]; save(); renderPlan(el);
      toast(state.done[id] ? `✓ ${D.modules[id].name} abgehakt` : `${D.modules[id].name} wieder offen`);
    }));
    $("[data-cursem]", el).addEventListener("change", e => { state.currentSem = +e.target.value; save(); renderPlan(el); });
    $("[data-print]", el).addEventListener("click", () => window.print());
  }

  function hbItem(m) {
    const inPlan = D.plans[state.plan].semesters.flat().some(id => D.hbMap[id] === m.id);
    const done = Object.keys(D.hbMap).filter(id => D.hbMap[id] === m.id && state.done[id]).length;
    return `<details class="hb ${inPlan ? "" : "not-in-plan"}" id="hb-${m.id}">
      <summary><span class="hb-name">${esc(m.name)}</span><span class="hb-meta">${m.lp} LP · ${esc(m.sem)} Sem.</span></summary>
      <div class="hb-body">
        ${m.content ? `<p>${esc(m.content)}</p>` : ""}
        <dl class="kv">
          <dt>Veranstaltungen</dt><dd><ul class="qa">${m.parts.map(x => `<li>${esc(x)}</li>`).join("")}</ul></dd>
          <dt>Prüfung</dt><dd>${esc(m.exam)}</dd>
          <dt>Note</dt><dd>${esc(m.grade)}</dd>
          ${m.req ? `<dt>Voraussetzung</dt><dd>${esc(m.req)}</dd>` : ""}
          <dt>Turnus · Dauer</dt><dd>${esc(m.turnus)} · ${esc(m.dauer)}</dd>
          <dt>Modulbetreuung</dt><dd>${esc(m.who)}</dd>
        </dl>
        ${m.note ? `<p class="tl-note">${esc(m.note)}</p>` : ""}
        <p class="small src-line">${srcLink(D.src.hbPage(m.page), "Modulhandbuch S. " + m.page)}${done ? ` · <span class="badge social">${done} Baustein(e) abgehakt</span>` : ""}</p>
      </div></details>`;
  }

  function modCard(id, span) {
    const m = D.modules[id];
    const done = !!state.done[id];
    const filtered = state.catFilter !== "all" && state.catFilter !== m.cat;
    return `<button class="mod ${done ? "done" : ""} ${m.track ? "track-" + m.track : ""} ${filtered ? "filtered" : ""}" style="--cat:${D.categories[m.cat].color}" data-mod="${id}" aria-pressed="${done}" title="${esc(D.types[m.type] || "")}">
      <span class="check" aria-hidden="true"></span>
      <span class="g">${esc(m.group)}</span>
      <span class="n">${esc(m.name)}</span>
      ${span ? `<span class="span-note">läuft über ${span} Semester</span>` : ""}
      <span class="m"><span class="type">${esc(m.type)}</span><span>${m.lp} LP</span></span>
    </button>`;

  }

  function compareRows() {
    const a = D.plans["6-approb"].semesters, g = D.plans["6-allg"].semesters;
    const fmt = ids => ids.map(id => `${esc(D.modules[id].name)} <span class="muted">(${D.modules[id].lp})</span>`).join("<br>");
    let rows = "";
    for (let i = 3; i < 6; i++) {
      const onlyA = a[i].filter(id => !g[i].includes(id));
      const onlyG = g[i].filter(id => !a[i].includes(id));
      rows += `<tr><td><b>${i + 1}.</b></td><td>${fmt(onlyA)}</td><td>${fmt(onlyG)}</td></tr>`;
    }
    return rows;
  }

  /* ========================================================================
     STUDIEN-GUIDE
     ======================================================================== */
  function renderGuide(el) {
    const sections = D.guideSections || [];
    const activeSecId = state.guideSec || sections[0]?.id || "pruefungen";
    const activeSec = sections.find(s => s.id === activeSecId) || sections[0];

    el.innerHTML = `
      <div class="page-head">
        <h1>Studien-Guide</h1>
        <p>Wichtige Regelungen, Fristen und praktische Tipps für deinen Studienalltag am Psychologischen Institut.</p>
      </div>
      <nav class="guide-nav" aria-label="Kategorien Studien-Guide">
        ${sections.map(s => `
          <button class="${s.id === activeSecId ? "active" : ""}" data-guide-tab="${esc(s.id)}">
            ${s.icon} ${esc(s.title)}
          </button>
        `).join("")}
      </nav>
      <div class="guide-sec">
        <div class="card" style="margin-bottom:1rem">
          <div class="card-head">
            <h2>${activeSec.icon} ${esc(activeSec.title)}</h2>
            <span class="badge social">${activeSec.items.length} Themen</span>
          </div>
          <p class="muted">${esc(activeSec.desc)}</p>
        </div>
        ${activeSec.items.map(item => `
          <div class="card guide-card">
            <h3>${esc(item.title)}</h3>
            <div>${item.body}</div>
            ${item.link ? `<div style="margin-top:.85rem"><a class="btn" href="${esc(item.link)}" target="_blank" rel="noopener">${esc(item.linkText || "Offizielle Seite öffnen")} ↗</a></div>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="card" style="margin-top:1.5rem">
        <div class="card-head">
          <h3>Noch Fragen oder Unklarheiten?</h3>
          <a class="btn" href="#infos">Alle Kontakte & Orte</a>
        </div>
        <p class="small muted">
          Du kannst dich jederzeit an die Fachstudienberatung (Stefanie Glawe), das Prüfungsamt (F042) oder die Fachschaft Psychologie wenden.
        </p>
      </div>`;

    $$("[data-guide-tab]", el).forEach(btn => {
      btn.addEventListener("click", () => {
        state.guideSec = btn.dataset.guideTab;
        save();
        renderGuide(el);
      });
    });
  }

  /* ========================================================================
     INFOS
     ======================================================================== */
  function renderInfos(el) {
    el.innerHTML = `
      <div class="page-head"><h1>Infos</h1><p>Kontakte, Orte, Uni-Systeme, Abkürzungen und was noch offen ist.</p></div>
      <div class="grid grid-2">
        <div class="card"><div class="card-head"><h2>Kontakte</h2>${srcLink("https://www.psychologie.uni-heidelberg.de/studium/a-z/fachstudienberatung", "Fachstudienberatung")}</div><dl class="kv">${D.contacts.map(c => `<dt>${esc(c.role)}</dt><dd>${
          c.mail ? `<a href="mailto:${esc(c.mail)}">${esc(c.name)}</a>`
          : c.tel ? `<a href="tel:${esc(c.tel.replace(/\s/g, ""))}">${esc(c.name)}</a>`
          : c.role === "Adresse" ? `<a href="${mapLink(c.name)}" target="_blank" rel="noopener" title="Auf Google Maps öffnen">📍 ${esc(c.name)} ↗</a>`
          : esc(c.name)
        }${c.extra ? `<div class="small">${esc(c.extra)}</div>` : ""}</dd>`).join("")}</dl></div>
        <div class="card"><h2>Uni-Systeme</h2><dl class="kv">${D.systems.map(s => `<dt>${s.link ? `<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.name)}</a>` : esc(s.name)}</dt><dd>${esc(s.what)}</dd>`).join("")}</dl>
          <p class="small muted" style="margin-top:.8rem">Einrichtung gemeinsam in der IT-Einführung am Di 6.10. um 14:15 Uhr – Gerät mitbringen.</p></div>
        <div class="card"><h2>Orte</h2><ul class="place-list">${Object.entries(D.places).map(([k, p]) => `<li><a class="place-name-link" href="${mapLink(p.map || `${p.name}, Heidelberg`)}" target="_blank" rel="noopener" title="Auf Google Maps öffnen"><b>${esc(p.name)}</b> <span class="muted small">(${esc(k)})</span></a><div class="small muted">${esc(p.desc)}</div><a class="small" href="${mapLink(p.map || `${p.name}, Heidelberg`)}" target="_blank" rel="noopener">In Google Maps öffnen ↗</a></li>`).join("")}</ul></div>
        <div class="card"><h2>Abkürzungen</h2>
          <input class="search" type="text" placeholder="Suchen, z. B. LP oder Empra" aria-label="Glossar durchsuchen" data-gsearch>
          <dl class="kv" data-glossary>${glossaryHtml("")}</dl></div>
        <div class="card"><h2>Regeln, die du kennen solltest</h2><dl class="kv">${D.facts.map(f => `<dt>${esc(f.t)}</dt><dd>${esc(f.d)} ${srcLink(f.src)}</dd>`).join("")}</dl></div>
        <div class="card"><h2>Offene Fragen für die EKS</h2><p class="small muted">Diese Punkte sind in den Unterlagen widersprüchlich oder nicht erklärt.</p><ol class="qa">${D.openQuestions.map(q => `<li>${esc(q)}</li>`).join("")}</ol></div>
        <div class="card"><h2>Quellen</h2><p class="small">Alle Inhalte stammen aus dem heiBOX-Ordner <a href="${esc(D.meta.heibox)}" target="_blank" rel="noopener">EKS_Materialien_Erstis</a> (Stand ${esc(D.meta.stand)}). Kurzfristige Änderungen sind möglich – im Zweifel gilt der Ordner.</p>
          <ul class="qa small">${D.sources.map(s => `<li>${s.link ? `<a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.title)}</a>` : esc(s.title)} <span class="muted">– ${esc(s.desc)}</span></li>`).join("")}</ul></div>
      </div>
      <div class="card" style="margin-top:1rem">
        <div class="card-head"><h2>Alle Links zu den Originalseiten</h2>${srcLink(D.src.az, "Studium A–Z")}</div>
        <p class="muted small">Zum Nachprüfen: Alles auf dieser Seite stammt aus diesen Quellen.</p>
      </div>`;
    const s = $("[data-gsearch]", el);
    s.addEventListener("input", () => { $("[data-glossary]", el).innerHTML = glossaryHtml(s.value); });
  }
  function glossaryHtml(q) {
    q = q.trim().toLowerCase();
    const rows = D.glossary.filter(([k, v]) => !q || k.toLowerCase().includes(q) || v.toLowerCase().includes(q));
    return rows.length ? rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)} ${srcLink((D.glossarySrc || {})[k])}</dd>`).join("") : `<dd class="muted">Nichts gefunden.</dd>`;
  }

  /* ========================================================================
     KALENDER-EXPORT (.ics)
     ======================================================================== */
  function icsDate(date, time) { return date.replace(/-/g, "") + "T" + time.replace(":", "") + "00"; }
  function plusMin(time, mins) { const [h, m] = time.split(":").map(Number); const t = h * 60 + m + mins; return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`; }
  function icsEsc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function fold(line) { const out = []; while (line.length > 74) { out.push(line.slice(0, 74)); line = " " + line.slice(74); } out.push(line); return out.join("\r\n"); }

  function eksIcsEvents() {
    return D.eks.filter(eksVisible).concat(D.laterEvents).map((e, i) => {
      const loc = e.loc && D.places[e.loc] ? `${D.places[e.loc].name} – ${D.places[e.loc].desc}` : "";
      const desc = [].concat(e.details || [], e.note ? ["Hinweis: " + e.note] : [], e.link ? [e.link] : []).join("\n");
      if (!e.start) return { uid: `eks-${i}`, allDay: true, date: e.date, dateEnd: e.dateEnd, title: e.title, loc, desc };
      const end = e.end || plusMin(e.start, (e.tags || []).includes("food") ? 45 : 30);
      return { uid: `eks-${i}`, date: e.date, start: e.start, end, title: (e.title.startsWith("EKS") ? "" : "EKS: ") + e.title, loc, desc };
    });
  }
  function weekIcsEvents() {
    return D.timetable.filter(courseSelected).map((c, i) => {
      const occ = courseOccurrences(c);
      const exdates = [];
      let d = dt(c.first);
      while (ymd(d) <= D.meta.semesterEnd) { if (inBreak(ymd(d))) exdates.push(ymd(d)); d = addDays(d, 7); }
      return { uid: `kurs-${i}`, date: c.first, start: c.start, end: c.end, title: c.short + (c.kind === "Tut" ? " (Tutorium)" : c.kind === "Ü" ? " (Übung)" : ""),
        loc: c.loc ? `${c.loc}, Psychologisches Institut, Hauptstr. 47–51, Heidelberg` : "", desc: [c.title, c.who].filter(Boolean).join("\n"),
        rrule: `FREQ=WEEKLY;UNTIL=${D.meta.semesterEnd.replace(/-/g, "")}T225959Z`, exdates, count: occ.length };
    });
  }
  function downloadIcs(filename, events) {
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Ersti-Guide Psychologie HD//DE", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE", "TZID:Europe/Berlin",
      "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
      "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
      "END:VTIMEZONE"];
    events.forEach(e => {
      L.push("BEGIN:VEVENT", `UID:${e.uid}-${e.date}@ersti-guide-psy-hd`, `DTSTAMP:${stamp}`);
      if (e.allDay) {
        L.push(`DTSTART;VALUE=DATE:${e.date.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${ymd(addDays(dt(e.dateEnd || e.date), 1)).replace(/-/g, "")}`);
      } else {
        L.push(`DTSTART;TZID=Europe/Berlin:${icsDate(e.date, e.start)}`, `DTEND;TZID=Europe/Berlin:${icsDate(e.date, e.end)}`);
      }
      if (e.rrule) L.push(`RRULE:${e.rrule}`);
      if (e.exdates && e.exdates.length) L.push(`EXDATE;TZID=Europe/Berlin:${e.exdates.map(x => icsDate(x, e.start)).join(",")}`);
      L.push(`SUMMARY:${icsEsc(e.title)}`);
      if (e.loc) L.push(`LOCATION:${icsEsc(e.loc)}`);
      if (e.desc) L.push(`DESCRIPTION:${icsEsc(e.desc)}`);
      L.push("END:VEVENT");
    });
    L.push("END:VCALENDAR");
    const blob = new Blob([L.map(fold).join("\r\n") + "\r\n"], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    toast(`${events.length} Termine exportiert`);
  }

  /* ========================================================================
     THEME (LIGHT / DARK)
     ======================================================================== */
  function getEffectiveTheme() {
    const urlTheme = new URLSearchParams(location.search).get("theme");
    if (urlTheme === "dark" || urlTheme === "light") return urlTheme;
    if (state.theme === "dark" || state.theme === "light") return state.theme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme() {
    const eff = getEffectiveTheme();
    document.documentElement.setAttribute("data-theme", eff);
    const sun = $("#themeIconSun");
    const moon = $("#themeIconMoon");
    const btn = $("#themeToggle");
    if (sun && moon) {
      if (eff === "dark") {
        sun.style.display = "block";
        moon.style.display = "none";
        if (btn) btn.title = "Zu hellem Modus wechseln";
      } else {
        sun.style.display = "none";
        moon.style.display = "block";
        if (btn) btn.title = "Zu dunklem Modus wechseln";
      }
    }
  }
  function toggleTheme() {
    const cur = getEffectiveTheme();
    state.theme = cur === "dark" ? "light" : "dark";
    save();
    applyTheme();
    toast(state.theme === "dark" ? "Dark Mode aktiviert" : "Light Mode aktiviert");
  }

  /* ========================================================================
     EINSTELLUNGEN
     ======================================================================== */
  function openSettings() {
    const dlg = $("#settings"); const f = $("form", dlg);
    ["eksGroup", "ubGroup", "ueGroup", "tutGroup"].forEach(k => { f[k].value = state[k] || ""; });
    if (f.theme) f.theme.value = state.theme || "auto";
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
  }
  function initSettings() {
    const dlg = $("#settings"); const f = $("form", dlg);
    $("#settingsBtn").addEventListener("click", openSettings);
    const themeBtn = $("#themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (state.theme === "auto") applyTheme();
      });
    }

    f.addEventListener("submit", () => {
      ["eksGroup", "ubGroup", "ueGroup", "tutGroup"].forEach(k => { state[k] = f[k].value; });
      if (f.theme) state.theme = f.theme.value;
      save(); applyTheme(); rerender(); toast("Gespeichert");
    });
    $("#resetAll").addEventListener("click", () => {
      if (!confirm("Alle Gruppen, Häkchen und eigenen To-dos in diesem Browser löschen?")) return;
      state = Object.assign({}, defaults, { done: {}, todosDone: {}, customTodos: [] }); save(); dlg.close(); applyTheme(); rerender(); toast("Zurückgesetzt");
    });
  }

  /* ========================================================================
     KI-ASSISTENT (PSYBOT) – 100% KOSTENLOS, OHNE ANMELDUNG & MIT SMART-REROUTE
     ======================================================================== */
  const AI_KNOWLEDGE_SUMMARY = `
Du bist "PsyBot", ein hilfsbereiter, präziser KI-Studienassistent für Studierende der Psychologie (B.Sc. 100% polyvalent) an der Universität Heidelberg (WiSe 2026/27).
Dein Wissen umfasst alle offiziellen Fakten des Psychologischen Instituts der Universität Heidelberg:
- GESAMTUMFANG: 180 LP Regelstudienzeit (6 Semester, Varianten für 8 oder 10 Semester existieren).
- PROPÄDEUTIK: 5 LP. Beinhaltet Vorlesung Einführung in die Psychologie (4 LP, Prof. Rummel) und 30 Pflicht-Versuchspersonenstunden (Vpn, 1 LP).
- VPN-STUNDEN: Genau 30 Stunden Pflicht. Teilnahme über das Heidelberger Studienportal (studienportal.psychologie.uni-heidelberg.de). Vpn-Laufzettel liegen vor Raum F042 aus.
- METHODEN 1: 12 LP (Voß). Deskriptive Statistik (WiSe, 4 LP + 2 LP Übung) und Inferenzstatistik (SoSe, 4 LP + 2 LP Übung).
- ORIENTIERUNGSPRÜFUNG (§ 3 Abs. 4 PO): Ist identisch mit der Klausur Inferenzstatistik am Ende des 2. Semesters. Darf bei Nichtbestehen nur 1x wiederholt werden und muss spätestens bis zum Ende des 3. Semesters bestanden sein, sonst erlischt der Prüfungsanspruch!
- WIEDERHOLUNG VON PRÜFUNGEN: Nicht bestandene Klausuren müssen spätestens im folgenden Semester wiederholt werden. Automatische Anmeldung durch das Prüfungsamt.
- KRANKMELDUNG / ATTEST: 3-Tage-Frist! Attest + Formular innerhalb von 3 Tagen an pruefungsamt@psychologie.uni-heidelberg.de oder Postfach Nr. 55 im Institut werfen. Statusbestätigung erfolgt in heiCO.
- PRÜFUNGSAMT: Raum F042, Hauptstr. 47. Sprechzeiten Mo, Di, Do 10:00–11:30, Fr 11:00–12:00. Tel. 06221/54-7342. Mails nur an pruefungsamt@psychologie.uni-heidelberg.de (mit Matrikelnummer!).
- PRAKTIKA: Orientierungspraktikum 4 Wochen / 150 Std. (5 LP). Berufspraktikum (BQT I) 6 Wochen / 240 Std. (8 LP, ab 3. Semester). Für Approbation/Psychotherapie muss BQT I klinisch nach PsychThApprO sein.
- EMPRA (Methoden 3): 12 LP über Sem. 3–5. Projektseminare 1 & 2 plus jährlicher Poster-Kongress im Oktober.
- APPROBATIONSRELEVANTER WEG: B.Sc. polyvalent. Für Psychotherapie Master (Klinische Psychologie) nötig: Interdisz. Kompetenzen Schwerpunkt 2 (Ethik & Recht, Medizinische Aspekte), AOV 1 Option C (Verfahrenslehre), AOV 2 Option C (Klinische Diagnostik & Gesprächsführung), klinisches BQT I.
- BACHELORARBEIT: 12 LP im 6. Semester. Zählt mit DOPPELTER GEWICHTUNG (Faktor 2) in die Abschlussnote! Zweiergruppen sind gem. § 16 PO erlaubt.
- ORTE & SERVICE: Testothek im Vordergebäude Raum 019–021 (über 1000 Tests). Kostenloser Buchaufsichtscanner in Raum F015 (Herr Kulczynski). Neue UB-Lernplätze im Institut mit Campus-Card. CIP-Pool mit Remote-Desktop (SPSS, R).
- IT & SYSTEME (URZ HEIDELBERG):
  * YoKI: Die universitätseigene datenschutzkonforme KI der Uni Heidelberg auf eigenen Servern (yoki.urz.uni-heidelberg.de). Basiert auf modernen Open-Source LLMs (u. a. Qwen), DSGVO-sicher, kostenlos für Studierende mit Uni-ID im eduroam oder Uni-VPN.
  * eduVPN & Cisco VPN: Empfohlener VPN-Client des URZ (eduVPN via eduvpn.org oder Cisco Secure Client unter vpn-ac.urz.uni-heidelberg.de) für Volltext-Zugriff auf Fachzeitschriften, YoKI und Institutsserver von zu Hause.
  * eduroam Campus-WLAN: Immer über das offizielle CAT-Tool einrichten (cat.eduroam.org) mit Benutzername <uni-id>@uni-heidelberg.de.
  * Microsoft 365: Kostenlose Campus-Lizenzen (Word, Excel, PowerPoint, Teams) über das URZ/asknet für Studierende.
  * Campus-Card & Drucken: Multifunktionskarte für Mensa, Bibliotheksausweis und Follow-Me Drucken an allen Uni-Druckern (qpilot.urz.uni-heidelberg.de).
  * HeiChat: Verschlüsselter Matrix-Messenger der Uni für Lerngruppen (heichat.uni-heidelberg.de).
- KALENDER & STUNDENPLAN: Im Reiter "Kalender" gibt es den interaktiven Monats-, Wochen- und Listenkalender, der sich live an gewählte Übungsgruppen (Allg. Psych. 1) und Tutorien anpasst, inklusive .ics-Kalenderexport für alle Semestertermine.
Antworte freundlich, präzise und auf Deutsch. Halte Antworten prägnant.
`;

  const KNOWLEDGE_INTENTS = [
    {
      keys: ["vpn", "versuchsperson", "laufzettel", "studienportal", "30 stunden", "stunden eintragen", "proband"],
      answer: "Im Bachelor Psychologie musst du insgesamt **30 Versuchspersonenstunden** (1 LP) für das Modul Propädeutik ableisten.\n• **Studien finden:** Über das Heidelberger [Studienportal](https://studienportal.psychologie.uni-heidelberg.de/)\n• **Laufzettel:** Vor Raum F042 (Prüfungsamt) mitnehmen und nach jeder Studie unterschreiben lassen.\n• **Hier im Portal:** Nutze unseren interaktiven Vpn-Tracker auf der Startseite, um deine Stunden lokal im Browser mitzuzählen!",
      actions: [
        { label: "👉 Zum Vpn-Tracker (Startseite)", route: "start", scrollTo: "#vpnTrackerCard" },
        { label: "🔬 Guide: Vpn & Empra", route: "guide", guideTab: "vpn-empra" }
      ]
    },
    {
      keys: ["kalender", "stundenplan", "vorlesung", "vorlesungen", "termin", "termine", "zeitplan", "export", "ics", "uhrzeit", "wann", "wo", "raum", "hs ii", "hs i", "allgemeine psychologie i", "statistik"],
      answer: "Unter **Kalender & Stundenplan** findest du die komplette Semesterübersicht:\n• Interaktive Monats-, Wochen- und Terminlistenansicht.\n• Passt sich live an deine gewählte Allg.-Psych-Übungsgruppe und dein Tutorium an.\n• Mit dem Button **„Meinen gesamten Kalender exportieren (.ics)“** kannst du alle Termine mit einem Klick in dein Smartphone oder Google/Apple/Outlook Calendar übernehmen.",
      actions: [
        { label: "📅 Zum Semesterkalender", route: "stundenplan" }
      ]
    },
    {
      keys: ["krank", "attest", "ausfall", "prüfungsunfähig", "arbeitsunfähig", "3 tage", "drei tage", "klausur krank"],
      answer: "Bei krankheitsbedingtem Prüfungsversäumnis gilt zwingend die **3-Tage-Frist**:\n1. Ärztliches Attest (vom selben Prüfungstag) plus das ausgefüllte Formular des Prüfungsamts binnen 3 Tagen einreichen (Postfach 55 oder Mail an `pruefungsamt@psychologie.uni-heidelberg.de` mit Matrikelnummer).\n2. Die Freistellung wird anschließend direkt im **heiCO-System** vermerkt.",
      actions: [
        { label: "📋 Guide: Prüfungen & Fristen", route: "guide", guideTab: "pruefungen" },
        { label: "📍 Prüfungsamt Kontakte", route: "infos" }
      ]
    },
    {
      keys: ["orientierungsprüfung", "orientierung", "inferenzstatistik", "op", "prüfungsanspruch", "wiederholen", "nicht bestanden"],
      answer: "Die **Orientierungsprüfung** (§ 3 Abs. 4 PO) ist identisch mit der Klausur **Inferenzstatistik** am Ende des 2. Semesters.\n⚠️ **Wichtig:** Sie darf nur **ein einziges Mal** wiederholt werden und muss spätestens bis zum Ende des **3. Fachsemesters** bestanden sein, sonst erlischt unwiderruflich der Prüfungsanspruch im Studiengang!",
      actions: [
        { label: "⚠️ Guide: Orientierungsprüfung", route: "guide", guideTab: "pruefungen" },
        { label: "📊 Modulhandbuch Methoden 1", route: "studienplan" }
      ]
    },
    {
      keys: ["approbation", "therapeut", "psychotherapie", "polyvalent", "unterschied", "allgemein", "verfahrenslehre", "psychthappro"],
      answer: "Unser Heidelberger B.Sc. ist **polyvalent** aufgebaut. Für den späteren Master in Klinischer Psychologie & Psychotherapie wählst du:\n• Interdisziplinäre Kompetenzen: Schwerpunkt 2 (Ethik & Recht, Medizinische Aspekte)\n• AOV 1 Option C (Verfahrenslehre)\n• AOV 2 Option C (Klinische Diagnostik & Gesprächsführung)\n• Klinisches Berufspraktikum (BQT I, 240 Std.).\nDu musst dich erst im 3./4. Semester festlegen – bis dahin ist alles identisch!",
      actions: [
        { label: "🎓 Zum 6-Sem. Approbationsplan", route: "studienplan" },
        { label: "📖 Guide: Master & Approbationsweg", route: "guide", guideTab: "abschluss" }
      ]
    },
    {
      keys: ["praktik", "bqt", "orientierungspraktikum", "berufspraktikum", "klinik", "glawe", "150", "240", "praktikumsbericht"],
      answer: "Im Studium gibt es zwei Pflichtpraktika:\n1. **Orientierungspraktikum (5 LP):** 4 Wochen / 150 Stunden. Vor oder in den ersten Semestern machbar.\n2. **Berufspraktikum / BQT I (8 LP):** 6 Wochen / 240 Stunden (ab 3. Semester). Für den Psychotherapie-Weg muss dieses in einer klinischen Einrichtung absolviert werden.",
      actions: [
        { label: "💼 Guide: Praktika & BQT I", route: "guide", guideTab: "praktika" }
      ]
    },
    {
      keys: ["empra", "poster", "kongress", "projektseminar", "untersuchungsbericht", "methoden 3"],
      answer: "Das **Empra** (Methoden 3, 12 LP) erstreckt sich über 3 Semester (Sem. 3–5). In Kleingruppen plant und realisiert ihr eine eigene empirische Studie. Höhepunkt ist der alljährliche **Poster-Kongress** im Institut mit wissenschaftlicher Präsentation.",
      actions: [
        { label: "🔬 Guide: Empra & Kongress", route: "guide", guideTab: "vpn-empra" }
      ]
    },
    {
      keys: ["bachelorarbeit", "abschlussnote", "faktor 2", "zweiergruppe", "po § 16", "thesis", "abschluss"],
      answer: "Die **Bachelorarbeit** (12 LP) im 6. Semester zählt mit **doppelter Gewichtung (Faktor 2)** in die Bachelor-Abschlussnote!\nGemäß § 16 PO darf die Arbeit auch als **Zweiergruppe** verfasst werden, wenn die individuellen Beiträge klar abgegrenzt sind.",
      actions: [
        { label: "🎓 Guide: Bachelorarbeit & Fristen", route: "guide", guideTab: "abschluss" }
      ]
    },
    {
      keys: ["yoki", "uni-ki", "urz ki", "server", "ki plattform", "qwen"],
      answer: "Die Universität Heidelberg bietet unter [yoki.urz.uni-heidelberg.de](https://yoki.urz.uni-heidelberg.de/) eine eigene, **datenschutzkonforme Universitäts-KI (YoKI)** auf universitätseigenen Servern. Keine Datenweitergabe, DSGVO-sicher und kostenlos für Studierende im eduroam oder Uni-VPN nutzbar!",
      actions: [
        { label: "📚 Guide: IT & YoKI Details", route: "guide", guideTab: "tools" }
      ]
    },
    {
      keys: ["eduvpn", "cisco", "vpn-zugang", "netzwerk", "heimarbeit", "vpn"],
      answer: "Für den sicheren Zugriff von zu Hause auf Fachliteratur, YoKI und Institutsserver empfiehlt das URZ **eduVPN** (moderner Open-Source Client) oder den *Cisco Secure Client* (`vpn-ac.urz.uni-heidelberg.de`).",
      actions: [
        { label: "💻 Guide: VPN & Netzwerk-Zugang", route: "guide", guideTab: "tools" }
      ]
    },
    {
      keys: ["eduroam", "wlan", "wifi", "cat-tool", "cat.eduroam", "internet"],
      answer: "Richte das Campus-WLAN **eduroam** unbedingt über das offizielle **CAT-Tool** ein ([cat.eduroam.org](https://cat.eduroam.org/)), um das Sicherheitszertifikat zu installieren. Als Benutzername immer `<Uni-ID>@uni-heidelberg.de` eingeben!",
      actions: [
        { label: "💻 Guide: WLAN & CAT-Tool", route: "guide", guideTab: "tools" }
      ]
    },
    {
      keys: ["office", "word", "excel", "powerpoint", "m365", "microsoft", "software", "asknet"],
      answer: "Über das Campusabkommen des URZ steht allen immatrikulierten Studierenden der Uni Heidelberg **Microsoft 365** (Word, Excel, PowerPoint, Teams) kostenlos für bis zu 5 Endgeräte zur Verfügung.",
      actions: [
        { label: "💻 Guide: Software & M365", route: "guide", guideTab: "tools" }
      ]
    },
    {
      keys: ["scanner", "buchscanner", "buch", "f015", "testothek", "bibliothek", "ub", "raum 019", "testverfahren"],
      answer: "Im Institut stehen dir besondere Services zur Verfügung:\n• **Buchscanner:** Kostenlos in Raum F015 (Falzkorrektur & PDF direkt auf USB-Stick).\n• **Testothek:** Räume 019–021 (über 1.000 psychologische Testverfahren zur Ausleihe).\n• **Institutsbibliothek:** Neue Lernplätze mit Campus-Card-Einlass.",
      actions: [
        { label: "📚 Guide: Scanner, Testothek & Bib", route: "guide", guideTab: "tools" }
      ]
    },
    {
      keys: ["sprechzeit", "kontakt", "prüfungsamt", "f042", "öffnungszeit", "stefanie glawe", "telefon", "mail", "anschrift"],
      answer: "Das **Prüfungsamt (Raum F042)** bietet offene Sprechstunden an (Mo, Di, Do 10:00–11:30, Fr 11:00–12:00 Uhr). Telefonisch Di 14–15 & Do 12–13 Uhr (06221 / 54-7342). Fachstudienberaterin ist **Stefanie Glawe**.",
      actions: [
        { label: "📍 Zu Kontakten & Sprechzeiten", route: "infos" },
        { label: "📋 Guide: Prüfungsamt-Details", route: "guide", guideTab: "pruefungen" }
      ]
    },
    {
      keys: ["eks", "ersti", "kneipentour", "rallye", "begrüßung", "frühstück", "mentor", "mentoren"],
      answer: "Die **Einführungswoche (EKS)** startet am 5. Oktober mit Begrüßung im Hörsaal II, Institutsführungen, Mentoring-Gruppen, Stadtrallye und Kneipentour. Alle Termine und Gruppeneinteilungen findest du im EKS-Reiter!",
      actions: [
        { label: "🎉 Zur EKS-Woche", route: "eks" }
      ]
    },
    {
      keys: ["studienplan", "180 lp", "leistungspunkte", "modulhandbuch", "8 semester", "10 semester", "regelstudienzeit"],
      answer: "Der B.Sc. Psychologie umfasst **180 LP**. Wähle in unserem interaktiven Studienplaner zwischen 6 Semestern (Standard oder approbationsrelevant), 8 Semestern oder 10 Semestern, und lies alle Modulbeschreibungen mit direkten Links zum Modulhandbuch.",
      actions: [
        { label: "📊 Zum interaktiven Studienplaner", route: "studienplan" }
      ]
    }
  ];

  function matchIntent(query) {
    const q = query.toLowerCase();
    for (const item of KNOWLEDGE_INTENTS) {
      if (item.keys.some(k => q.includes(k))) {
        return item;
      }
    }
    return null;
  }

  function renderActionsHtml(actions) {
    if (!actions || !actions.length) return "";
    return `<div class="ai-route-actions">${actions.map(a => `
      <button type="button" class="ai-route-btn" data-go-route="${esc(a.route)}" ${a.guideTab ? `data-guide-tab="${esc(a.guideTab)}"` : ""} ${a.scrollTo ? `data-scroll-to="${esc(a.scrollTo)}"` : ""}>
        ${esc(a.label)} ➔
      </button>
    `).join("")}</div>`;
  }

  function formatAiMarkdown(text) {
    return String(text || "")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1 ↗</a>')
      .replace(/\n/g, "<br>");
  }

  async function getAiResponse(userText) {
    // 1. Direct local intent match (instant 0ms response, 100% reliable)
    const direct = matchIntent(userText);
    if (direct) {
      return {
        answer: direct.answer,
        actions: direct.actions
      };
    }

    // 2. Query free open AI endpoint (Pollinations AI – 100% free, no login, no API key)
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const res = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [
            { role: "system", content: AI_KNOWLEDGE_SUMMARY },
            { role: "user", content: userText }
          ],
          model: "openai",
          seed: 42
        })
      });
      clearTimeout(timer);
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim()) {
          // Determine best contextual actions from query or response
          const matched = matchIntent(text) || matchIntent(userText);
          const actions = matched ? matched.actions : [
            { label: "📋 Zum Studien-Guide", route: "guide", guideTab: "pruefungen" },
            { label: "📅 Zum Semesterkalender", route: "stundenplan" }
          ];
          return { answer: text.trim(), actions };
        }
      }
    } catch (e) {
      console.info("Pollinations online query bypassed, using intelligent local engine:", e);
    }

    // 3. Fallback
    return {
      answer: "Hier ist dein Heidelberger Studien-Assistent: Im B.Sc. Psychologie (180 LP) hast du im 1. Semester Propädeutik (inkl. 30 Vpn-Stunden), Deskriptive Statistik, Allgemeine Psychologie I, Entwicklungspsychologie 1 und Pädagogische Psychologie 1. Wähle unten einen Bereich, um direkt dorthin zu navigieren:",
      actions: [
        { label: "📅 Zum Kalender & Stundenplan", route: "stundenplan" },
        { label: "📋 Zum Studien-Guide", route: "guide", guideTab: "pruefungen" },
        { label: "👉 Zum Vpn-Tracker", route: "start", scrollTo: "#vpnTrackerCard" },
        { label: "📊 Zum Studienplan", route: "studienplan" }
      ]
    };
  }

  function initAiAssistant() {
    const modal = $("#aiModal");
    const openBtns = [$("#aiBtn"), $("#aiFloatBtn")].filter(Boolean);
    const closeBtn = $("#aiClose");
    const form = $("#aiForm");
    const input = $("#aiInput");
    const messages = $("#aiMessages");

    function openAi() {
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.setAttribute("open", "");
      input.focus();
    }
    function closeAi() {
      if (typeof modal.close === "function") modal.close();
      else modal.removeAttribute("open");
    }

    openBtns.forEach(b => b.addEventListener("click", openAi));
    if (closeBtn) closeBtn.addEventListener("click", closeAi);
    modal.addEventListener("click", ev => {
      if (ev.target === modal) closeAi();
    });

    async function handleSend(userText) {
      const clean = userText.trim();
      if (!clean) return;

      // User message
      const userBubble = document.createElement("div");
      userBubble.className = "ai-bubble user";
      userBubble.textContent = clean;
      messages.appendChild(userBubble);
      input.value = "";
      messages.scrollTop = messages.scrollHeight;

      // Thinking indicator
      const botBubble = document.createElement("div");
      botBubble.className = "ai-bubble bot typing";
      botBubble.textContent = "PsyBot sucht die Antwort …";
      messages.appendChild(botBubble);
      messages.scrollTop = messages.scrollHeight;

      const result = await getAiResponse(clean);

      botBubble.classList.remove("typing");
      botBubble.innerHTML = formatAiMarkdown(result.answer) + renderActionsHtml(result.actions);
      messages.scrollTop = messages.scrollHeight;
    }

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      handleSend(input.value);
    });

    messages.addEventListener("click", ev => {
      // Direct reroute button clicked
      const routeBtn = ev.target.closest(".ai-route-btn");
      if (routeBtn) {
        const targetRoute = routeBtn.dataset.goRoute;
        const guideTab = routeBtn.dataset.guideTab;
        const scrollToSelector = routeBtn.dataset.scrollTo;

        closeAi();

        if (guideTab) {
          state.guideSec = guideTab;
          save();
        }

        if (targetRoute) {
          if (location.hash === `#${targetRoute}`) {
            route();
          } else {
            location.hash = `#${targetRoute}`;
          }
        }

        setTimeout(() => {
          if (scrollToSelector) {
            const el = document.querySelector(scrollToSelector);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
              el.classList.remove("highlight-pulse");
              void el.offsetWidth;
              el.classList.add("highlight-pulse");
              setTimeout(() => el.classList.remove("highlight-pulse"), 2200);
            }
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 150);

        const routeNames = {
          start: "Startseite & Vpn-Tracker",
          stundenplan: "Kalender & Stundenplan",
          studienplan: "Studienplan & Module",
          guide: "Studien-Guide",
          eks: "EKS-Woche",
          infos: "Infos & Kontakte"
        };
        toast(`Weitergeleitet: ${routeNames[targetRoute] || targetRoute}`);
        return;
      }

      // Suggestion prompt clicked
      const promptBtn = ev.target.closest("[data-ai-prompt]");
      if (promptBtn) {
        handleSend(promptBtn.dataset.aiPrompt);
      }
    });
  }

  function icon(name) {
    if (name === "cal") return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm-2 8h14v10H5V10Zm6 2v3H8v2h3v3h2v-3h3v-2h-3v-3h-2Z"/></svg>`;
    return "";
  }

  /* ---------------- Start ---------------- */
  applyTheme();
  initSettings();
  initAiAssistant();
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
  route();
  // „Jetzt“-Anzeige jede Minute aktualisieren (nur Start & EKS)
  setInterval(() => {
    const r = (location.hash || "#start").slice(1);
    const typing = document.activeElement && /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName);
    if ((r === "start" || r === "eks") && !typing && !$("#settings").open && !$("#aiModal").open) route();
  }, 60000);
})();
