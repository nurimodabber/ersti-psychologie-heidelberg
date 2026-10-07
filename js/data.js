/* ==========================================================================
   DATEN – Ersti-Guide B.Sc. Psychologie, Universität Heidelberg, WiSe 2026/27
   --------------------------------------------------------------------------
   Alle Inhalte stammen aus dem heiBOX-Ordner „EKS_Materialien_Erstis“
   (Stand der Dokumente: 25.09.2026) sowie der Semesterterminseite der Uni.
   Wenn sich etwas ändert, NUR diese Datei anpassen – app.js liest alles hier.
   Zeiten sind Ortszeit Heidelberg (Europe/Berlin), Format "HH:MM".
   ========================================================================== */

window.ERSTI = {
  meta: {
    title: "Ersti-Guide Psychologie",
    subtitle: "B.Sc. Psychologie 100 % (polyvalent) · Uni Heidelberg · WiSe 2026/27",
    stand: "25.09.2026",
    heibox: "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/",
    semesterStart: "2026-10-12",   // Vorlesungszeit Uni (offiziell)
    lecturesStart: "2026-10-14",   // erste Psychologie-Vorlesung laut EKS-Plan
    semesterEnd: "2027-02-06",
    breakStart: "2026-12-21",
    breakEnd: "2027-01-06"
  },

  /* ------------------------------------------------------------------ */
  /* Orte                                                                */
  /* ------------------------------------------------------------------ */
  places: {
    "HS II":    { short: "HS II", name: "Hörsaal II", desc: "Erdgeschoss im Hintergebäude des Psychologischen Instituts, Hauptstr. 47–51", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "HS I":     { short: "HS I", name: "Hörsaal I", desc: "Psychologisches Institut, Hauptstr. 47–51", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "KG":       { short: "KG", name: "Kleingruppenraum", desc: "Raum deiner Kleingruppe – sagen dir deine Tutor:innen am ersten Tag", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "KG-PF":    { short: "KG-PF", name: "Praxisfeld-Kleingruppe", desc: "Achtung: andere Räume als deine normale Kleingruppe!", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "AE":       { short: "AE", name: "Arbeitseinheit", desc: "Räume der jeweiligen Arbeitseinheit (AE) – Treffpunkt mit Tutor:innen vereinbaren", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "PF":       { short: "PF vor Ort", name: "Praxisfeld vor Ort", desc: "Externer Ort, den deine Praxisfeld-Gruppe besucht", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "UB":       { short: "UB", name: "Universitätsbibliothek", desc: "Treffpunkt an der UB (Altstadt)", map: "Universitätsbibliothek Heidelberg, Plöck 107-109, 69117 Heidelberg" },
    "ÜR":       { short: "ÜR B/C", name: "ÜR B, A102 + ÜR C", desc: "Räume für die Hochschulpolitik-Session (Psychologisches Institut)", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "Uniplatz": { short: "Uniplatz", name: "Universitätsplatz", desc: "Altstadt, Begrüßung durch die Rektorin", map: "Universitätsplatz, 69117 Heidelberg" },
    "Bunsen":   { short: "Bunsen", name: "Bunsen-Statue", desc: "Vor dem Psychologischen Institut (Hauptstraße) – Treffpunkt für Abendprogramm", map: "Bunsen-Denkmal, Hauptstraße, 69117 Heidelberg" },
    "Foyer":    { short: "Foyer", name: "Foyer Hintergebäude", desc: "Foyer im Hintergebäude des Instituts", map: "Psychologisches Institut, Hauptstraße 47, 69117 Heidelberg" },
    "Altstadt": { short: "Altstadt", name: "Altstadt / Campus", desc: "Willkommenstag mit Infoständen rund um den Universitätsplatz", map: "Universitätsplatz, 69117 Heidelberg" }
  },

  /* ------------------------------------------------------------------ */
  /* EKS-Woche (Einführungs-Kompakt-Seminar)                             */
  /* groups: nur für diese EKS-Gruppen (1–6); ubGroup: UB-Führungsgruppe */
  /* tags: important | bring | optional | social | todo | food | info    */
  /* ------------------------------------------------------------------ */
  eksDays: [
    { date: "2026-10-05", label: "Mo 5.10.", title: "Tag 1 – Ankommen" },
    { date: "2026-10-06", label: "Di 6.10.", title: "Tag 2 – Studium & IT" },
    { date: "2026-10-07", label: "Mi 7.10.", title: "Tag 3 – Arbeitseinheiten" },
    { date: "2026-10-08", label: "Do 8.10.", title: "Tag 4 – Praxisfelder" },
    { date: "2026-10-09", label: "Fr 9.10.", title: "Tag 5 – Bibliothek & Abschluss" },
    { date: "2026-10-12", label: "Mo 12.10.", title: "Willkommenstag & EKS-Ende" },
    { date: "2026-10-13", label: "Di 13.10.", title: "Poster-Kongress" },
    { date: "2026-10-14", label: "Mi 14.10.", title: "Vorlesungsbeginn" }
  ],

  eks: [
    // Montag 05.10.
    { date: "2026-10-05", start: "09:15", end: "09:45", title: "Begrüßung", loc: "HS II", tags: ["important"],
      details: ["Prof. Dr. Tanja Bipp (Dekanat der Fakultät)", "Fachstudienberaterin Stefanie Glawe", "Studierende der Fachschaft Psychologie"],
      note: "In der Einladung steht 9:00 Uhr, im Wochenplan 9:15 Uhr – lieber etwas früher da sein und den Wegweisern zu Hörsaal II folgen." },
    { date: "2026-10-05", start: "09:45", end: "11:00", title: "Kennenlernen in den Kleingruppen", loc: "KG",
      details: ["Kennenlernen", "Klärung des Ablaufs der EKS-Woche"] },
    { date: "2026-10-05", start: "11:00", end: null, title: "Pufferslot", loc: "HS II", details: ["Änderungen noch möglich"] },
    { date: "2026-10-05", start: "11:45", end: "12:15", title: "Hausführung Psychologisches Institut", loc: "Foyer", groups: [1,2,3] },
    { date: "2026-10-05", start: "12:00", end: null, title: "Mittagessen", tags: ["food"], groups: [4,5,6] },
    { date: "2026-10-05", start: "12:30", end: null, title: "Mittagessen", tags: ["food"], groups: [1,2,3] },
    { date: "2026-10-05", start: "13:30", end: "14:00", title: "Hausführung Psychologisches Institut", loc: "Foyer", groups: [4,5,6] },
    { date: "2026-10-05", start: "14:00", end: "14:45", title: "Treffen in den Kleingruppen", loc: "KG" },
    { date: "2026-10-05", start: "14:45", end: null, title: "Eduroam einrichten (selbstständig)", tags: ["todo"],
      details: ["Uni-WLAN Eduroam auf allen Geräten einrichten, die du im Studium nutzen willst"] },

    // Dienstag 06.10.
    { date: "2026-10-06", start: "09:15", end: "10:00", title: "Infos zum polyvalenten B.Sc. Psychologie", loc: "HS II", tags: ["important"],
      details: ["Mit Stefanie Glawe (Fachstudienberatung)"] },
    { date: "2026-10-06", start: "10:15", end: "11:45", title: "Kennenlernspiel & Studienmotivation", loc: "KG",
      details: ["Erwartungen", "Ängste und Sorgen", "Schule vs. Uni", "Andere Arbeitstechniken"] },
    { date: "2026-10-06", start: "12:00", end: "12:45", title: "Institut & Studienplanung", loc: "KG", tags: ["important"],
      details: ["Institutsstruktur, who is who", "Studienplanung/-ablauf + Veranstaltungsarten", "Wahlmöglichkeiten im Studium"] },
    { date: "2026-10-06", start: "12:45", end: null, title: "Mittagessen", tags: ["food"] },
    { date: "2026-10-06", start: "14:00", end: "14:15", title: "Vorstellung IT-Team", loc: "HS II" },
    { date: "2026-10-06", start: "14:15", end: "15:15", title: "Praktische Einführung IT", loc: "KG", tags: ["bring", "important"],
      details: ["heiCO", "Uni-Mail", "VPN-Client", "Moodle", "heiBOX"],
      note: "Endgerät mitbringen, das du im Studium vor allem nutzt (Smartphone, Tablet, Laptop)." },
    { date: "2026-10-06", start: "15:30", end: "16:00", title: "Vorbereitung der Besuche der Arbeitseinheiten (AEs)", loc: "KG" },
    { date: "2026-10-06", start: "19:30", end: null, title: "Kneipenseminar", loc: "Bunsen", tags: ["social"],
      details: ["Treffpunkt: Bunsen-Statue vor dem Psychologischen Institut"] },

    // Mittwoch 07.10.
    { date: "2026-10-07", start: "09:45", end: "10:00", title: "Treffen in den AE-Gruppen", loc: "AE",
      details: ["Ort wird mit den Tutor:innen vereinbart"] },
    { date: "2026-10-07", start: "10:00", end: "10:45", title: "Besuch der Arbeitseinheiten (Runde 1)", loc: "AE" },
    { date: "2026-10-07", start: "11:15", end: "12:00", title: "Besuch der Arbeitseinheiten (Runde 2)", loc: "AE" },
    { date: "2026-10-07", start: "12:15", end: "13:00", title: "Nachbereitung der Besuche / Austausch", loc: "KG" },
    { date: "2026-10-07", start: "13:00", end: null, title: "Besprechung in den Kleingruppen", loc: "KG" },
    { date: "2026-10-07", start: "13:30", end: null, title: "Mittagessen", tags: ["food"] },
    { date: "2026-10-07", start: "14:45", end: "15:45", title: "Rund ums Studium – Tipps und Hinweise", loc: "HS II" },

    // Donnerstag 08.10.
    { date: "2026-10-08", start: "10:00", end: "10:15", title: "Vorstellung des Prüfungsausschussvorsitzenden", loc: "HS II",
      details: ["Prof. Dr. Oliver Schilling"] },
    { date: "2026-10-08", start: "10:30", end: "11:00", title: "Vorstellung Comenius-Programm", loc: "HS II", tags: ["optional", "important"],
      details: ["Begleitendes Peer-Mentoring über das 1. Semester", "Teilnahme freiwillig", "Anmeldung nötig"] },
    { date: "2026-10-08", start: "11:15", end: "12:00", title: "Zeit für Fragen", loc: "KG", details: ["Pufferzeitslot"] },
    { date: "2026-10-08", start: "12:15", end: "13:15", title: "Vorbereitung Besuch der Praxisfelder", loc: "KG-PF", tags: ["important"],
      note: "Achtung: andere Räume als sonst!" },
    { date: "2026-10-08", start: "13:15", end: null, title: "Mittagessen in den Praxisfeld-Kleingruppen", tags: ["food"] },
    { date: "2026-10-08", start: "14:00", end: null, title: "Praxisfeldbesuch vor Ort", loc: "PF" },
    { date: "2026-10-08", start: "19:00", end: null, title: "Stadtrallye mit der Fachschaft", loc: "Bunsen", tags: ["social"],
      details: ["Treffpunkt: Bunsen-Statue vor dem Psychologischen Institut"] },

    // Freitag 09.10.
    { date: "2026-10-09", start: "09:15", end: null, title: "Treffpunkt an der UB", loc: "UB", tags: ["important"],
      details: ["Führungen 09:30–11:00 Uhr in Gruppen à max. 30 Personen"] },
    { date: "2026-10-09", start: "09:30", end: "10:00", title: "Bibliotheksführung Gruppe 1", loc: "UB", ubGroup: 1 },
    { date: "2026-10-09", start: "10:00", end: "10:30", title: "Bibliotheksführung Gruppe 2", loc: "UB", ubGroup: 2 },
    { date: "2026-10-09", start: "10:30", end: "11:00", title: "Bibliotheksführung Gruppe 3", loc: "UB", ubGroup: 3 },
    { date: "2026-10-09", start: "11:15", end: "12:00", title: "Hochschulpolitik", loc: "ÜR" },
    { date: "2026-10-09", start: "12:00", end: "12:45", title: "Nachbesprechung Praxisfelder", loc: "KG" },
    { date: "2026-10-09", start: "12:45", end: null, title: "Mittagessen", tags: ["food"] },
    { date: "2026-10-09", start: "13:45", end: null, title: "Feedbackrunde und Abschluss in den KGs", loc: "KG",
      details: ["Räume aufräumen"] },
    { date: "2026-10-09", start: "14:30", end: null, title: "Vorbereitung der Sketche (ohne Tutor:innen)", loc: "KG", tags: ["todo"],
      details: ["Uhrzeit ungefähr – „anschließend“ an die Abschlussrunde", "Die Sketche werden am Mo 12.10. vorgeführt"] },

    // Montag 12.10.
    { date: "2026-10-12", start: "10:00", end: null, title: "Begrüßung aller Studienanfänger:innen durch die Rektorin", loc: "Uniplatz", tags: ["important"] },
    { date: "2026-10-12", start: "11:00", end: null, title: "Willkommenstag", loc: "Altstadt", tags: ["optional"],
      details: ["Informationsstände", "Willkommens-Bib-Tasche", "Campustouren (mit Anmeldung)"],
      link: "https://www.uni-heidelberg.de/de/studium/service-beratung/ins-studium-starten/willkommenstag" },
    { date: "2026-10-12", start: "12:00", end: null, title: "Mittagessen", tags: ["food"], note: "Uhrzeit im Plan nicht angegeben." },
    { date: "2026-10-12", start: "13:00", end: "14:00", title: "Vorführung der Sketche", loc: "HS II", tags: ["social"] },
    { date: "2026-10-12", start: "14:15", end: "15:15", title: "Studium im Ausland – Erfahrungsberichte", loc: "HS II" },
    { date: "2026-10-12", start: "15:15", end: null, title: "Gruppenbild", loc: "HS II" },
    { date: "2026-10-12", start: "16:00", end: null, title: "Abschluss und Feedbackrunde – Ende der EKS-Woche", loc: "HS II", tags: ["important"] },

    // Dienstag 13.10.
    { date: "2026-10-13", start: "14:00", end: null, title: "Poster-Kongress", loc: "Foyer", tags: ["optional"],
      details: ["HS II + Foyer im Hintergebäude", "Freiwillig für alle"],
      note: "Laut Tabelle stellen Studierende aus dem 5. Fachsemester aus, laut Fußnote Viertsemester aus dem Empirischen Projektseminar (Empra)." },

    // Mittwoch 14.10.
    { date: "2026-10-14", start: "11:15", end: "12:45", title: "Erste Vorlesung: Entwicklungspsychologie (Prof. Pauen)", loc: "HS II", tags: ["important"],
      details: ["Beginn der Vorlesungen"] }
  ],

  /* Termine außerhalb der Tabellen-Struktur */
  laterEvents: [
    { date: "2026-10-15", start: "21:00", title: "Party „Psychopathie“", loc: "Foyer", tags: ["social"],
      note: "Datum im Plan nicht eindeutig (Spalte ohne Datum, vermutlich Do 15.10.) – in der EKS-Woche nachfragen." },
    { date: "2026-11-13", dateEnd: "2026-11-15", start: null, title: "Ersti-Wochenende", tags: ["social", "important"],
      note: "13.–15.11.2026 – bitte vormerken." }
  ],

  /* ------------------------------------------------------------------ */
  /* Wichtige Termine & Meilensteine (Timeline & Kalender)              */
  /* ------------------------------------------------------------------ */
  keyDates: [
    { date: "2026-10-05", title: "Start EKS-Woche", text: "09:15 Uhr, Hörsaal II – Begrüßung & Einstieg", loc: "HS II", cat: "eks" },
    { date: "2026-10-06", dateEnd: "2026-10-09", title: "Übungsgruppe wählen (heiCO)", text: "Allgemeine Psychologie 1 direkt in heiCO belegen", deadline: true, cat: "exam" },
    { date: "2026-10-12", title: "Willkommenstag & EKS-Ende", text: "Rektorin 10:00 Uhr am Universitätsplatz; Beginn der Vorlesungszeit", loc: "Uniplatz", cat: "eks" },
    { date: "2026-10-13", title: "Poster-Kongress", text: "14:00 Uhr, Foyer & HS II – Präsentation der Forschungsprojekte", loc: "Foyer", cat: "eks" },
    { date: "2026-10-14", title: "Erste Vorlesung: Entwicklungspsychologie", text: "11:15–12:45 Uhr, Hörsaal II (Prof. Pauen)", loc: "HS II", cat: "vl" },
    { date: "2026-10-15", title: "Erste Vorlesung: Pädagogische Psychologie", text: "11:15–12:45 Uhr, Hörsaal II (Prof. Spinath)", loc: "HS II", cat: "vl" },
    { date: "2026-10-15", title: "Party „Psychopathie“", text: "Ab 21:00 Uhr im Foyer – Ersti-Party der Fachschaft", loc: "Foyer", cat: "eks" },
    { date: "2026-10-19", title: "Kern-Vorlesungen & Übungen starten", text: "Einführung (09:15), Allg. Psychologie I (11:15), Statistik-Übung (14:15)", loc: "HS II", cat: "vl" },
    { date: "2026-10-20", title: "Deskriptive Statistik startet", text: "09:15–10:45 Uhr, Hörsaal I (Prof. Voß)", loc: "HS I", cat: "vl" },
    { date: "2026-10-21", title: "Übungen Allgemeine Psychologie 1 starten", text: "Gruppe 1 (14:15, HS II) & Gruppe 2 (16:15, HS I)", cat: "ue" },
    { date: "2026-10-22", title: "Übung Allgemeine Psychologie 1 (Gr. 3)", text: "16:15–17:45 Uhr, Hörsaal II", loc: "HS II", cat: "ue" },
    { date: "2026-10-27", title: "Statistik-Tutorien starten", text: "Freiwillig – Di (Gr. 1), Mi (Gr. 2), Do (Gr. 3)", cat: "ue" },
    { date: "2026-11-13", dateEnd: "2026-11-15", title: "Ersti-Wochenende der Fachschaft", text: "Gemeinsames Hüttenwochenende zum Kennenlernen", cat: "eks" },
    { date: "2026-12-21", dateEnd: "2027-01-06", title: "Vorlesungsfreie Zeit (Weihnachten)", text: "Weihnachtspause – keine regulären Lehrveranstaltungen", holiday: true, cat: "holiday" },
    { date: "2027-01-15", dateEnd: "2027-02-15", title: "Rückmeldefrist SoSe 2027", text: "Semesterbeitrag für das Sommersemester 2027 überweisen", deadline: true, cat: "exam" },
    { date: "2027-02-06", title: "Ende der Vorlesungszeit WiSe 2026/27", text: "Letzter Tag der regelmäßigen Lehrveranstaltungen", cat: "exam" },
    { date: "2027-02-08", dateEnd: "2027-02-19", title: "Klausurenphase WiSe 2026/27", text: "Abschlussklausuren (Statistik, Allg. Psych. I, Entwicklung, Pädagogik)", exam: true, cat: "exam" },
    { date: "2027-03-31", title: "Semesterende WiSe 2026/27", text: "Offizielles Ende des Wintersemesters", cat: "exam" }
  ],

  /* ------------------------------------------------------------------ */
  /* Standard-To-dos (Häkchen werden lokal im Browser gespeichert)       */
  /* ------------------------------------------------------------------ */
  todos: [
    { id: "t-device", text: "Laptop/Tablet/Handy zur IT-Einführung mitbringen", due: "2026-10-06" },
    { id: "t-eduroam", text: "Eduroam (Uni-WLAN) auf allen Geräten einrichten", due: "2026-10-05" },
    { id: "t-it", text: "Uni-Mail, VPN-Client, Moodle und heiBOX einrichten", due: "2026-10-06" },
    { id: "t-heico", text: "Übungsgruppe Allgemeine Psychologie 1 in heiCO wählen", due: "2026-10-09" },
    { id: "t-comenius", text: "Comenius-Peer-Mentoring: entscheiden und ggf. anmelden", due: "2026-10-08" },
    { id: "t-campustour", text: "Campustour für den Willkommenstag anmelden", due: "2026-10-12" },
    { id: "t-sketch", text: "Sketch mit der Kleingruppe vorbereiten", due: "2026-10-12" },
    { id: "t-questions", text: "Offene Fragen in der EKS klären (FOV, AOV, approbationsrelevant vs. allgemein)", due: "2026-10-12" },
    { id: "t-tutorium", text: "Statistik-Tutorium: Einteilung nach Vorlesungsstart abwarten/eintragen", due: "2026-10-27" },
    { id: "t-wochenende", text: "Ersti-Wochenende 13.–15.11. einplanen", due: "2026-11-13" }
  ],

  /* ------------------------------------------------------------------ */
  /* Stundenplan 1. Semester (WiSe 26/27, Stand 25.09.26)                */
  /* day: 1=Mo … 5=Fr; choice: "ue" (Übungsgruppe Allg. Psych. 1, Pflicht */
  /* eine von drei) oder "tut" (Statistik-Tutorium, freiwillig)          */
  /* ------------------------------------------------------------------ */
  timetable: [
    { day: 1, start: "09:15", end: "10:45", kind: "VL", module: "einf", title: "Einführung in die Psychologie und Erkenntnistheorie", short: "Einführung Psychologie", who: "Prof. J. Rummel", loc: "HS II", first: "2026-10-19" },
    { day: 1, start: "11:15", end: "12:45", kind: "VL", module: "ap1",  title: "Allgemeine Psychologie I: Wahrnehmung, Lernen, Aufmerksamkeit & Gedächtnis", short: "Allgemeine Psychologie I", who: "Prof. J. Rummel", loc: "HS II", first: "2026-10-19" },
    { day: 1, start: "14:15", end: "15:45", kind: "Ü",  module: "statue1", title: "Übung zur deskriptiven Statistik", short: "Übung Statistik", who: "K. Keller", loc: "HS II", first: "2026-10-19" },
    { day: 2, start: "09:15", end: "10:45", kind: "VL", module: "deskr", title: "Deskriptive Statistik und Wahrscheinlichkeitstheorie", short: "Deskriptive Statistik", who: "Prof. A. Voß", loc: "HS I", first: "2026-10-20" },
    { day: 2, start: "11:15", end: "12:45", kind: "Tut", choice: "tut", group: 1, title: "Tutorium Deskriptive Statistik – Gruppe 1", short: "Statistik-Tutorium 1", who: "", loc: "", first: "2026-10-27" },
    { day: 3, start: "09:15", end: "10:45", kind: "Tut", choice: "tut", group: 2, title: "Tutorium Deskriptive Statistik – Gruppe 2", short: "Statistik-Tutorium 2", who: "", loc: "", first: "2026-10-28" },
    { day: 3, start: "11:15", end: "12:45", kind: "VL", module: "entw1", title: "Entwicklung über die Lebensspanne: Kindheit und Jugend", short: "Entwicklungspsychologie", who: "Prof. S. Pauen", loc: "HS II", first: "2026-10-14" },
    { day: 3, start: "14:15", end: "15:45", kind: "Ü",  choice: "ue", group: 1, module: "uap1", title: "Übung Allgemeine Psychologie 1 – Gruppe 1", short: "Übung Allg. Psych. 1 (Gr. 1)", who: "Hemming + Holt", loc: "HS II", first: "2026-10-21" },
    { day: 3, start: "16:15", end: "17:45", kind: "Ü",  choice: "ue", group: 2, module: "uap1", title: "Übung Allgemeine Psychologie 1 – Gruppe 2", short: "Übung Allg. Psych. 1 (Gr. 2)", who: "Hemming + Holt", loc: "HS I", first: "2026-10-21" },
    { day: 4, start: "09:15", end: "10:45", kind: "Tut", choice: "tut", group: 3, title: "Tutorium Deskriptive Statistik – Gruppe 3", short: "Statistik-Tutorium 3", who: "", loc: "", first: "2026-10-29" },
    { day: 4, start: "11:15", end: "12:45", kind: "VL", module: "paedv", title: "Einführung in die Pädagogische Psychologie I", short: "Pädagogische Psychologie", who: "Prof. B. Spinath", loc: "HS II", first: "2026-10-15" },
    { day: 4, start: "16:15", end: "17:45", kind: "Ü",  choice: "ue", group: 3, module: "uap1", title: "Übung Allgemeine Psychologie 1 – Gruppe 3", short: "Übung Allg. Psych. 1 (Gr. 3)", who: "Hemming + Holt", loc: "HS II", first: "2026-10-22" }
  ],
  timetableNotes: [
    "Freitag ist im 1. Semester frei.",
    "Von den drei Übungsgruppen „Allgemeine Psychologie 1“ besuchst du genau eine. Wahl ab Di 6.10. bis Fr 9.10. direkt in heiCO – in der EKS gibt es Raum, das gemeinsam zu machen.",
    "Die Statistik-Tutorien sind freiwillig. Die Einteilung findet erst nach Start der Vorlesung Deskriptive Statistik statt.",
    "Termine der Comenius-Gruppen (freiwillig) stehen noch nicht fest – Infos folgen in der EKS-Woche.",
    "Zusätzlich im 1. Semester laut Studienplan: Vpn-Stunden (1 LP, Eigenarbeit) und das Orientierungspraktikum (5 LP) – beides ohne festen Termin im Stundenplan."
  ],

  /* ------------------------------------------------------------------ */
  /* Module (gleiche IDs in allen Studienplänen → Fortschritt bleibt     */
  /* beim Wechsel der Variante erhalten)                                 */
  /* cat: methoden | grundlagen | anwendung | praktika | uebergreifend   */
  /* type: V Vorlesung · Ü Übung · S Seminar · KG Kleingruppe ·          */
  /*       EA Eigenarbeit · P Praktikum                                  */
  /* ------------------------------------------------------------------ */
  modules: {
    einf:     { group: "Propädeutik", name: "Einführung in die Psychologie", lp: 4, type: "V", cat: "methoden" },
    vpn:      { group: "Propädeutik", name: "Vpn-Stunden", lp: 1, type: "EA", cat: "methoden" },
    deskr:    { group: "Methoden 1", name: "Deskriptive Statistik", lp: 4, type: "V", cat: "methoden" },
    statue1:  { group: "Methoden 1", name: "Statistik-Übung I", lp: 2, type: "Ü", cat: "methoden" },
    inferenz: { group: "Methoden 1", name: "Inferenzstatistik", lp: 4, type: "V", cat: "methoden" },
    statue2:  { group: "Methoden 1", name: "Statistik-Übung II", lp: 2, type: "Ü", cat: "methoden" },
    versuch:  { group: "Methoden 2", name: "Versuchsplanung", lp: 4, type: "V", cat: "methoden" },
    kritlek:  { group: "Methoden 2", name: "Kritische Lektüre", lp: 4, type: "S", cat: "methoden" },
    ep1:      { group: "Methoden 3", name: "Empirisches Projektseminar 1", lp: 4, type: "KG", cat: "methoden" },
    ep2:      { group: "Methoden 3", name: "Empirisches Projektseminar 2", lp: 4, type: "KG", cat: "methoden" },
    ep3:      { group: "Methoden 3", name: "Empirisches Projektseminar 3", lp: 4, type: "KG", cat: "methoden" },

    ap1:      { group: "Grundlagen 1", name: "Allgemeine Psychologie 1", lp: 4, type: "V", cat: "grundlagen" },
    uap1:     { group: "Grundlagen 1", name: "Übung Allg. Psychologie 1", lp: 2, type: "Ü", cat: "grundlagen" },
    ap2:      { group: "Grundlagen 1", name: "Allgemeine Psychologie 2", lp: 4, type: "V", cat: "grundlagen" },
    uap2:     { group: "Grundlagen 1", name: "Übung Allg. Psychologie 2", lp: 2, type: "Ü", cat: "grundlagen" },
    entw1:    { group: "Grundlagen 2", name: "Entwicklungspsychologie 1", lp: 4, type: "V", cat: "grundlagen" },
    entw2:    { group: "Grundlagen 2", name: "Entwicklungspsychologie 2", lp: 4, type: "V", cat: "grundlagen" },
    diff1:    { group: "Grundlagen 3", name: "Differentielle Psychologie 1", lp: 4, type: "V", cat: "grundlagen" },
    diff2:    { group: "Grundlagen 3", name: "Differentielle Psychologie 2", lp: 4, type: "V", cat: "grundlagen" },
    bio1:     { group: "Grundlagen 4", name: "Biologische Psychologie 1", lp: 4, type: "V", cat: "grundlagen" },
    bio2:     { group: "Grundlagen 4", name: "Biologische Psychologie 2", lp: 4, type: "V", cat: "grundlagen" },
    sozv:     { group: "Grundlagen 5", name: "Sozialpsychologie (Vorlesung)", lp: 4, type: "V", cat: "grundlagen" },
    sozu:     { group: "Grundlagen 5", name: "Sozialpsychologie (Übung)", lp: 4, type: "Ü", cat: "grundlagen" },

    paedv:    { group: "Anwendung 1", name: "Pädagogische Psychologie (Vorlesung)", lp: 4, type: "V", cat: "anwendung" },
    paedu:    { group: "Anwendung 1", name: "Pädagogische Psychologie (Übung)", lp: 4, type: "Ü", cat: "anwendung" },
    diag1:    { group: "Anwendung 2", name: "Diagnostik 1", lp: 4, type: "V", cat: "anwendung" },
    diag2:    { group: "Anwendung 2", name: "Diagnostik 2", lp: 4, type: "S", cat: "anwendung" },
    stoer1:   { group: "Anwendung 3", name: "Störungslehre 1", lp: 4, type: "V", cat: "anwendung" },
    stoer2:   { group: "Anwendung 3", name: "Störungslehre 2", lp: 4, type: "S", cat: "anwendung" },
    gesund:   { group: "Anwendung 3", name: "Gesundheit & Prävention", lp: 4, type: "V", cat: "anwendung" },
    ao1:      { group: "Anwendung 4", name: "Arbeits- & Organisationspsychologie 1", lp: 4, type: "V", cat: "anwendung" },
    ao2:      { group: "Anwendung 4", name: "Arbeits- & Organisationspsychologie 2", lp: 4, type: "Ü", cat: "anwendung" },

    op:       { group: "Praktikum", name: "Orientierungspraktikum", lp: 5, type: "P", cat: "praktika" },
    bp:       { group: "Praktikum", name: "Berufspraktikum (BQT I)", lp: 8, type: "P", cat: "praktika" },

    fov1:     { group: "Übergreifend", name: "FOV (Teil 1)", lp: 4, type: "S", cat: "uebergreifend" },
    fov2:     { group: "Übergreifend", name: "FOV (Teil 2)", lp: 4, type: "S", cat: "uebergreifend" },
    praes1:   { group: "Übergreifend", name: "Präsentation eigener Forschung 1", lp: 2, type: "KG", cat: "uebergreifend" },
    praes2:   { group: "Übergreifend", name: "Präsentation eigener Forschung 2", lp: 2, type: "KG", cat: "uebergreifend" },
    is1:      { group: "Übergreifend", name: "Interdisziplinäre Studien 1", lp: 2, type: "–", cat: "uebergreifend" },
    is2:      { group: "Übergreifend", name: "Interdisziplinäre Studien 2", lp: 2, type: "–", cat: "uebergreifend" },
    ba:       { group: "Abschluss", name: "Bachelorarbeit", lp: 12, type: "–", cat: "uebergreifend" },

    // nur allgemeiner Weg
    ik1:      { group: "Wahlbereich allgemein", name: "Interdisziplinäre Kompetenzen 1", lp: 2, type: "S/V", cat: "anwendung", track: "allg" },
    ik2:      { group: "Wahlbereich allgemein", name: "Interdisziplinäre Kompetenzen 2", lp: 4, type: "S/V", cat: "anwendung", track: "allg" },
    aov1a:    { group: "Wahlbereich allgemein", name: "AOV 1 (Teil 1)", lp: 4, type: "S/V", cat: "anwendung", track: "allg" },
    aov1b:    { group: "Wahlbereich allgemein", name: "AOV 1 (Teil 2)", lp: 4, type: "S", cat: "anwendung", track: "allg" },
    aov2a:    { group: "Wahlbereich allgemein", name: "AOV 2 (Teil 1)", lp: 4, type: "S", cat: "anwendung", track: "allg" },
    aov2b:    { group: "Wahlbereich allgemein", name: "AOV 2 (Teil 2)", lp: 4, type: "S/KG", cat: "anwendung", track: "allg" },

    // nur approbationsrelevanter Weg
    ethik:    { group: "Approbation", name: "Ethik und Recht", lp: 2, type: "V", cat: "anwendung", track: "approb" },
    verf1:    { group: "Approbation", name: "Verfahrenslehre 1", lp: 4, type: "V", cat: "anwendung", track: "approb" },
    klindiag: { group: "Approbation", name: "Klinische Diagnostik", lp: 4, type: "S", cat: "anwendung", track: "approb" },
    medpt:    { group: "Approbation", name: "Medizinische Aspekte der Psychotherapie", lp: 4, type: "V", cat: "anwendung", track: "approb" },
    verf2:    { group: "Approbation", name: "Verfahrenslehre 2", lp: 4, type: "S", cat: "anwendung", track: "approb" },
    gespr:    { group: "Approbation", name: "Gesprächsführung", lp: 4, type: "KG", cat: "anwendung", track: "approb" }
  },

  categories: {
    methoden:      { label: "Methoden", color: "var(--c-methoden)" },
    grundlagen:    { label: "Grundlagen der Psychologie", color: "var(--c-grundlagen)" },
    anwendung:     { label: "Anwendung", color: "var(--c-anwendung)" },
    praktika:      { label: "Praktika", color: "var(--c-praktika)" },
    uebergreifend: { label: "Abteilungsübergreifend", color: "var(--c-uebergreifend)" }
  },

  types: {
    "V": "Vorlesung", "Ü": "Übung", "S": "Seminar", "KG": "Kleingruppe", "EA": "Eigenarbeit",
    "P": "Praktikum", "S/V": "Seminar oder Vorlesung", "S/KG": "Seminar oder Kleingruppe", "–": "ohne Angabe"
  },

  /* ------------------------------------------------------------------ */
  /* Studienverlaufspläne. "span" = Modul läuft über n Semester          */
  /* (LP werden für die Semestersumme gleichmäßig aufgeteilt).           */
  /* ------------------------------------------------------------------ */
  plans: {
    "6-approb": {
      label: "6 Semester · approbationsrelevant",
      short: "6 Sem. approb.",
      desc: "Regelstudienzeit mit den Veranstaltungen, die für den Weg zur Approbation (Master Klinische Psychologie und Psychotherapie) nötig sind. Rot markiert = nur in diesem Plan.",
      source: "4. Studienplan_BSc_100%_approbationsrelevant_Regelstudienzeit 6 Sem.pdf",
      semesters: [
        ["einf", "vpn", "deskr", "statue1", "ap1", "uap1", "entw1", "paedv", "op"],
        ["versuch", "kritlek", "inferenz", "statue2", "ap2", "uap2", "entw2", "paedu"],
        ["ep1", "diff1", "bio1", "sozv", "sozu", "diag1", "stoer1", "gesund"],
        ["ep2", "diff2", "bio2", "ao1", "ao2", "diag2", "stoer2", "ethik"],
        ["ep3", "fov1", "praes1", "bp", "verf1", "klindiag", "medpt"],
        ["is1", "is2", "fov2", "praes2", "ba", "verf2", "gespr"]
      ]
    },
    "6-allg": {
      label: "6 Semester · allgemein",
      short: "6 Sem. allgemein",
      desc: "Regelstudienzeit ohne approbationsrelevante Vertiefung – stattdessen AOV und Interdisziplinäre Kompetenzen.",
      source: "3. Studienplan_BSc_100%_allgemein_Regelstudienzeit 6 Sem.pdf",
      semesters: [
        ["einf", "vpn", "deskr", "statue1", "ap1", "uap1", "entw1", "paedv", "op"],
        ["versuch", "kritlek", "inferenz", "statue2", "ap2", "uap2", "entw2", "paedu"],
        ["ep1", "diff1", "bio1", "sozv", "sozu", "diag1", "stoer1", "gesund"],
        ["ep2", "diff2", "bio2", "ao1", "ao2", "diag2", "stoer2", "ik1"],
        ["ep3", "fov1", "praes1", "bp", "aov1a", "aov2a", "ik2"],
        ["is1", "is2", "fov2", "praes2", "ba", "aov1b", "aov2b"]
      ]
    },
    "8-allg": {
      label: "8 Semester · allgemein (Beispiel)",
      short: "8 Sem.",
      desc: "Beispielplan zum Strecken auf 8 Semester (allgemeiner Weg). Die Bachelorarbeit läuft über Semester 7 und 8.",
      source: "5. Studienplan_BSc_100%_allgemein_8Sem.pdf",
      span: { ba: 2 },
      semesters: [
        ["einf", "vpn", "deskr", "statue1", "ap1", "uap1", "paedv"],
        ["versuch", "kritlek", "inferenz", "statue2", "ap2", "uap2", "paedu"],
        ["ep1", "diff1", "entw1", "sozv", "sozu", "op"],
        ["ep2", "diff2", "entw2", "ao1", "ao2", "is1", "is2"],
        ["ep3", "bio1", "diag1", "stoer1", "gesund", "fov1"],
        ["bio2", "diag2", "stoer2", "ik1", "bp"],
        ["ba", "praes1", "aov1a", "aov2a", "ik2"],
        ["praes2", "aov1b", "aov2b", "fov2"]
      ]
    },
    "10-allg": {
      label: "10 Semester · allgemein (Beispiel)",
      short: "10 Sem.",
      desc: "Beispielplan zum Strecken auf 10 Semester (allgemeiner Weg), z. B. bei Job, Familie oder Krankheit. Die Bachelorarbeit läuft über Semester 9 und 10.",
      source: "6. Studienplan_BSc_100%_allgemein_10Sem.pdf",
      span: { ba: 2 },
      semesters: [
        ["einf", "vpn", "deskr", "statue1", "ap1", "uap1"],
        ["versuch", "kritlek", "inferenz", "statue2", "ap2", "uap2"],
        ["ep1", "diff1", "entw1", "sozv", "sozu"],
        ["ep2", "diff2", "entw2", "is1", "op"],
        ["ep3", "bio1", "diag1", "stoer1"],
        ["ik1", "bio2", "diag2", "stoer2", "fov1"],
        ["ik2", "gesund", "paedv", "aov1a"],
        ["ao1", "ao2", "paedu", "aov1b", "bp"],
        ["ba", "praes1", "is2", "aov2a"],
        ["praes2", "fov2", "aov2b"]
      ]
    }
  },

  /* ------------------------------------------------------------------ */
  /* Kontakte, Systeme, Glossar, offene Fragen, Quellen                  */
  /* ------------------------------------------------------------------ */
  contacts: [
    { role: "Fachstudienberatung & EKS-Leitung", name: "Dipl.-Psych. Stefanie Glawe", extra: "Fachstudienberaterin B.Sc." },
    { role: "EKS-Leitung & Prüfungsausschuss (Vorsitz)", name: "apl. Prof. Dr. Oliver Schilling", extra: "Ansprechpartner für Prüfungsfragen" },
    { role: "Dekanat der Fakultät", name: "Prof. Dr. Tanja Bipp", extra: "" },
    { role: "Studienberatung Bachelor (E-Mail)", name: "studienberatung-bachelor@psychologie.uni-heidelberg.de", mail: "studienberatung-bachelor@psychologie.uni-heidelberg.de", extra: "" },
    { role: "Telefon EKS-Leitung", name: "06221 / 54-7787", tel: "+49622154 7787", extra: "" },
    { role: "Adresse", name: "Psychologisches Institut, Hauptstr. 47–51, 69117 Heidelberg", extra: "Hörsaal II: Erdgeschoss im Hintergebäude" },
    { role: "Fachschaft Psychologie", name: "Studierendenvertretung", extra: "Organisiert Kneipenseminar, Stadtrallye, Ersti-Wochenende" }
  ],

  systems: [
    { name: "heiCO", what: "Campus-Management: Kurse wählen (z. B. Übungsgruppen), Prüfungen, Studienbescheinigungen, ToR", link: "https://heico.uni-heidelberg.de" },
    { name: "Uni-Mail (SOGo)", what: "Offizielle E-Mail-Adresse (@stud.uni-heidelberg.de) der Universität Heidelberg", link: "https://mail.uni-heidelberg.de" },
    { name: "Moodle", what: "Zentrale Lernplattform: Folien, Materialien, Abgaben und Kursforen", link: "https://moodle.uni-heidelberg.de" },
    { name: "YoKI (Uni-KI)", what: "Datenschutzkonforme, universitätseigene KI auf Uni-Servern (Open-Source LLMs wie Qwen)", link: "https://yoki.urz.uni-heidelberg.de" },
    { name: "eduVPN & Cisco", what: "Zugriff aufs Uni-Netz von zu Hause (für Fachdatenbanken, YoKI & CIP-Pool)", link: "https://www.urz.uni-heidelberg.de/de/support/it-fuer-jede-zielgruppe/it-fuer-studierende" },
    { name: "Eduroam (WLAN)", what: "Campus-WLAN – sicher vorkonfiguriert per CAT-Tool (cat.eduroam.org)", link: "https://cat.eduroam.org" },
    { name: "heiBOX Cloud", what: "30 GB kostenloser persönlicher Cloud-Speicher des URZ für Studierende", link: "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/" },
    { name: "Microsoft 365", what: "Kostenfreie Campus-Lizenz für Office-Anwendungen (Word, Excel, PPT)", link: "https://www.urz.uni-heidelberg.de/de/service-katalog/arbeitsplatz-und-endgeraete/software-und-software-lizenzen/microsoft-campusabkommen" },
    { name: "Campus-Card & Drucken", what: "Follow-Me Drucken/Kopieren in Bibliotheken, Mensakarte & Ausweis", link: "https://www.urz.uni-heidelberg.de/de/service-katalog/arbeitsplatz-und-endgeraete/druckausgabe-und-kopieren" },
    { name: "HeiChat (Matrix)", what: "Verschlüsselter Uni-Messenger für Lerngruppen und Projekte", link: "https://heichat.uni-heidelberg.de" },
    { name: "MFA-Portal", what: "Mehr-Faktor-Authentifizierung zur Absicherung deines Uni-ID-Accounts", link: "https://mfa.uni-heidelberg.de" }
  ],

  glossary: [
    ["EKS", "Einführungs-Kompakt-Seminar – die Ersti-Woche am Psychologischen Institut"],
    ["KG", "Kleingruppe (mit studentischen Tutor:innen)"],
    ["AE", "Arbeitseinheit – die Forschungsabteilungen des Instituts"],
    ["HS I / HS II", "Hörsaal I / Hörsaal II (HS II: Erdgeschoss im Hintergebäude)"],
    ["UB", "Universitätsbibliothek"],
    ["LP", "Leistungspunkte (ECTS). Der Bachelor umfasst 180 LP, also ca. 30 LP pro Semester"],
    ["V / Ü / S", "Vorlesung / Übung / Seminar"],
    ["EA", "Eigenarbeit"],
    ["Vpn-Stunden", "Versuchspersonenstunden – du nimmst selbst an Studien teil (1 LP)"],
    ["Empra", "Empirisches Projektseminar (Methoden 3, Semester 3–5)"],
    ["polyvalent", "Der Bachelor hält beide Wege offen: approbationsrelevant (Psychotherapie) oder allgemein"],
    ["approbationsrelevant", "Plan mit den Modulen, die für den späteren Weg zur Approbation als Psychotherapeut:in nötig sind (Ethik und Recht, Verfahrenslehre, Klinische Diagnostik, Medizinische Aspekte der PT, Gesprächsführung)"],
    ["BQT I", "Berufspraktikum, im approbationsrelevanten Plan als BQT I bezeichnet (8 LP)"],
    ["Comenius-Programm", "Freiwilliges Peer-Mentoring durch höhere Semester im 1. Semester (Anmeldung nötig)"],
    ["Poster-Kongress", "Präsentation der Poster aus dem Empirischen Projektseminar"],
    ["MES", "Master-Einführungs-Seminar (für Master-Erstis, nicht für dich)"],
    ["FOV", "In den Unterlagen nicht erklärt – in der EKS nachfragen"],
    ["AOV", "In den Unterlagen nicht erklärt – in der EKS nachfragen (Wahlbereich im allgemeinen Plan)"]
  ],

  openQuestions: [
    "Startzeit am 5.10.: Einladung sagt 9:00 Uhr, Wochenplan 9:15 Uhr.",
    "Wofür stehen FOV und AOV, und wie wählt man die AOV-Schwerpunkte?",
    "Wann genau ist die Party „Psychopathie“ (im Plan ohne Datum, vermutlich Do 15.10.)?",
    "Poster-Kongress: Stellen das 4. oder das 5. Fachsemester aus?",
    "Bis wann muss man sich zwischen approbationsrelevant und allgemein entscheiden? (Unterschied beginnt laut Plan im 4. Semester)",
    "Wie und wo werden die Vpn-Stunden gesammelt und das Orientierungspraktikum anerkannt?",
    "Wann und wie laufen die Comenius-Gruppen?"
  ],

  sources: [
    { title: "1. EKS-Einladung_2026.pdf", desc: "Einladung, Zeitraum, Themen, Kontakt" },
    { title: "1.1 EKS-Woche_Plan_2026.pdf", desc: "Ablauf EKS-Woche, Stand 25.09.2026" },
    { title: "2. Übersicht Veranstaltungen 1. Semester WiSe 26-27, Stand 25.09.26.pdf", desc: "Stundenplan 1. Semester" },
    { title: "3. Studienplan_BSc_100%_allgemein_Regelstudienzeit 6 Sem.pdf", desc: "Musterstudienverlauf allgemein" },
    { title: "4. Studienplan_BSc_100%_approbationsrelevant_Regelstudienzeit 6 Sem.pdf", desc: "Musterstudienverlauf approbationsrelevant" },
    { title: "5. Studienplan_BSc_100%_allgemein_8Sem.pdf", desc: "Beispiel 8 Semester" },
    { title: "6. Studienplan_BSc_100%_allgemein_10Sem.pdf", desc: "Beispiel 10 Semester" },
    { title: "Uni Heidelberg – Semestertermine", desc: "Vorlesungszeit 12.10.2026–06.02.2027, vorlesungsfrei 21.12.2026–06.01.2027", link: "https://www.uni-heidelberg.de/en/study/management-of-studies/key-dates-deadlines/further-semester-dates" }
  ]
};
