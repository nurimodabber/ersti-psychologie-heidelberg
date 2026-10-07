/* ==========================================================================
   ERGÄNZUNG: Modulhandbuch (Fassung 17.01.2024), Institutsseiten, Quellen-Links
   Jede Angabe hat einen Link zur Originalquelle (src / page).
   ========================================================================== */
(function (E) {
  const HB_FOLDER = "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/";
  const HB_FILE = "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/files/?p=/Modulhandbuch_BSc_Psych_17.01.24.pdf";
  const HB = HB_FOLDER;
  const AZ = "https://www.psychologie.uni-heidelberg.de/studium/a-z/";
  const BOX = "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/files/?p=%2F";

  E.src = {
    handbook: HB_FILE,
    handbookFolder: HB_FOLDER,
    hbPage: (p) => `${HB_FILE}`,
    heibox: "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/",
    eksInvite: BOX + encodeURIComponent("1. EKS-Einladung_2026.pdf"),
    eksPlan: BOX + encodeURIComponent("1.1 EKS-Woche_Plan_2026.pdf"),
    timetable: BOX + encodeURIComponent("2. Übersicht Veranstaltungen 1. Semester WiSe 26-27, Stand 25.09.26.pdf"),
    plan6allg: BOX + encodeURIComponent("3. Studienplan_BSc_100%_allgemein_Regelstudienzeit 6 Sem.pdf"),
    plan6approb: BOX + encodeURIComponent("4. Studienplan_BSc_100%_approbationsrelevant_Regelstudienzeit 6 Sem.pdf"),
    plan8: BOX + encodeURIComponent("5. Studienplan_BSc_100%_allgemein_8Sem.pdf"),
    plan10: BOX + encodeURIComponent("6. Studienplan_BSc_100%_allgemein_10Sem.pdf"),
    semester: "https://www.uni-heidelberg.de/de/studium/studienorganisation/termine-und-fristen",
    institute: "https://www.psychologie.uni-heidelberg.de/",
    az: AZ,
    willkommenstag: "https://www.uni-heidelberg.de/de/studium/service-beratung/ins-studium-starten/willkommenstag"
  };
  // Quelle je Studienplan-Variante
  E.plans["6-approb"].src = E.src.plan6approb;
  E.plans["6-allg"].src = E.src.plan6allg;
  E.plans["8-allg"].src = E.src.plan8;
  E.plans["10-allg"].src = E.src.plan10;

  /* Zuordnung Studienplan-Baustein → Modul im Modulhandbuch */
  E.hbMap = {
    einf: "prop", vpn: "prop", deskr: "m1", statue1: "m1", inferenz: "m1", statue2: "m1",
    versuch: "m2", kritlek: "m2", ep1: "m3", ep2: "m3", ep3: "m3",
    ap1: "g1", uap1: "g1", ap2: "g1", uap2: "g1", entw1: "g2", entw2: "g2", diff1: "g3", diff2: "g3",
    bio1: "g4", bio2: "g4", sozv: "g5", sozu: "g5", op: "op", paedv: "a1", paedu: "a1",
    diag1: "a2", diag2: "a2", stoer1: "a3", stoer2: "a3", gesund: "a3", ao1: "a4", ao2: "a4",
    ik1: "ik", ik2: "ik", ethik: "ik", medpt: "ik", aov1a: "aov1", aov1b: "aov1", verf1: "aov1", verf2: "aov1",
    aov2a: "aov2", aov2b: "aov2", klindiag: "aov2", gespr: "aov2", fov1: "fov", fov2: "fov",
    praes1: "praes", praes2: "praes", bp: "bp", ba: "ba", is1: "is", is2: "is"
  };

  /* Module laut Modulhandbuch (Seite = PDF-Seite) */
  E.handbook = [
    { id: "prop", name: "Propädeutik der Psychologie", lp: 5, sem: "1.", who: "Rummel", page: 8, turnus: "jährlich, WiSe", dauer: "1 Semester",
      parts: ["Einführung in die Psychologie und Erkenntnistheorie (V, WiSe) – 4 LP", "Vpn-Stunden: Teilnahme an Experimenten, mind. 30 Std. – 1 LP"],
      exam: "Klausur bestehen + Nachweis von mind. 30 Versuchspersonenstunden", grade: "unbenotet",
      content: "Einführung ins Studium, Fächerstruktur und Arbeitsfelder, Geschichte der Psychologie und Psychotherapie, Erkenntnistheorie, wissenschaftliches Arbeiten." },
    { id: "m1", name: "Methoden 1: Wissenschaftliche Methoden", lp: 12, sem: "1.–2.", who: "Voß", page: 10, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Deskriptive Statistik & Wahrscheinlichkeitstheorie (V, WiSe) – 4 LP", "Übung deskriptive Statistik (Ü, WiSe) – 2 LP", "Inferenzstatistik (V, SoSe) – 4 LP", "Übung Inferenzstatistik (Ü, SoSe) – 2 LP"],
      exam: "Klausuren „Deskriptive Statistik“ und „Inferenzstatistik“ bestehen", grade: "Note = Klausur Inferenzstatistik",
      content: "Messtheorie, Wahrscheinlichkeitsrechnung, Verteilungen, Signifikanztests (t-Test, ANOVA, Korrelation, Regression), Auswertung mit Statistik-Software." },
    { id: "m2", name: "Methoden 2: Empirisches Arbeiten (1)", lp: 8, sem: "2.", who: "Voß", page: 12, turnus: "jährlich, SoSe", dauer: "1 Semester",
      parts: ["Versuchsplanung (V, SoSe) – 4 LP", "Kritische Lektüre von Fachliteratur (S, SoSe) – 4 LP"],
      exam: "Klausur Versuchsplanung + Ausarbeitung mit kritischer Stellungnahme", grade: "Note = Klausur Versuchsplanung",
      content: "Logik des Testens, Forschungsdesigns, Forschungsethik, gute wissenschaftliche Praxis, Fachartikel kritisch lesen, Grundlagen qualitativer Forschung." },
    { id: "m3", name: "Methoden 3: Empirisches Arbeiten (2) – „Empra“", lp: 12, sem: "3.–5.", who: "Voß", page: 14, turnus: "jährlich, WiSe + SoSe", dauer: "3 Semester (optional 4)",
      parts: ["Empirisches Projektseminar 1 (KG, WiSe) – 4 LP", "Empirisches Projektseminar 2 (KG, SoSe) – 4 LP", "Praktikumskongress (KG, WiSe) + schriftlicher Untersuchungsbericht – 4 LP"],
      exam: "Mitarbeit an einer eigenen empirischen Studie, Datenanalyse, Untersuchungsbericht", grade: "unbenotet",
      req: "Methoden 2 erfolgreich abgeschlossen",
      note: "Option: In der Entwicklungspsychologie/Biologischen Psychologie kann eine begrenzte Zahl Studierender schon im 2. Semester starten und auf 4 Semester strecken.",
      content: "Open Science, Datenerhebung und -auswertung unter Supervision, Bericht und Präsentation der Ergebnisse (Poster-Kongress)." },
    { id: "g1", name: "Grundlagen 1: Allgemeine Psychologie", lp: 12, sem: "1.–2.", who: "Rummel", page: 16, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Allg. Psychologie I: Wahrnehmen, Lernen, Aufmerksamkeit, Gedächtnis (V, WiSe) – 4 LP", "Übung I (Ü, WiSe) – 2 LP", "Allg. Psychologie II: Denken & Sprache, Problemlösen, Entscheiden, Motivation, Emotion (V, SoSe) – 4 LP", "Übung II (Ü, SoSe) – 2 LP"],
      exam: "Abschlussklausuren zu Allg. Psych. I und II; Aufgabenblätter in den Übungen regelmäßig bearbeiten (unbenotet)", grade: "Mittelwert beider Klausuren" },
    { id: "g2", name: "Grundlagen 2: Entwicklung über die Lebensspanne", lp: 8, sem: "1.–2.", who: "Pauen / Wrzus", page: 18, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Entwicklungspsychologie 1: Kindheit und Jugend (V, WiSe) – 4 LP", "Entwicklungspsychologie 2: Erwachsenenalter und hohes Alter (V, SoSe) – 4 LP"],
      exam: "Zwei benotete Leistungen: Arbeitsmappe, Klausur oder mündliche Prüfung (Form legt die Lehrperson zu Semesterbeginn fest)", grade: "Mittelwert der zwei Teilleistungen",
      note: "Kann mit Grundlagen 4 (Biologische Psychologie) getauscht werden – beide sind Pflicht." },
    { id: "g3", name: "Grundlagen 3: Differentielle Psychologie", lp: 8, sem: "3.–4.", who: "Hagemann", page: 20, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Differentielle Psychologie 1 – Grundlagen (V, WiSe) – 4 LP", "Differentielle Psychologie 2 – Geschlechterforschung oder Vertiefung (V, SoSe) – 4 LP"],
      exam: "Je eine Klausur zu Diff. 1 und Diff. 2", grade: "Mittelwert beider Klausuren" },
    { id: "g4", name: "Grundlagen 4: Biologische Psychologie", lp: 8, sem: "3.–4.", who: "Pauen", page: 22, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Biologische Psychologie 1: Grundlagen der Neuropsychologie (V, WiSe) – 4 LP", "Biologische Psychologie 2: Ausgewählte Themen (V, SoSe) – 4 LP"],
      exam: "Abschlussklausur, evtl. mündliche Prüfung", grade: "Note = Klausur nach Bio. Psych. 2",
      note: "Kann mit Grundlagen 2 (Entwicklung) getauscht werden – beide sind Pflicht." },
    { id: "g5", name: "Grundlagen 5: Sozialpsychologie", lp: 8, sem: "3.", who: "Fiedler", page: 24, turnus: "jährlich, WiSe", dauer: "1 Semester",
      parts: ["Vorlesung Sozialpsychologie 1 (V, WiSe) – 4 LP", "Übung Sozialpsychologie (Ü, WiSe) – 4 LP"],
      exam: "Klausur oder mündliche Prüfung zur Vorlesung; Übung unbenotet", grade: "Note = Klausur der Vorlesung" },
    { id: "op", name: "Orientierungspraktikum", lp: 5, sem: "1.–2.", who: "Stefanie Glawe", page: 26, turnus: "frei wählbar", dauer: "4 Wochen / 150 Std.",
      parts: ["Praktikum 4 Wochen (150 Std.), im Block oder studienbegleitend – 5 LP"],
      exam: "Erfahrungsbericht + Praktikumsbescheinigung", grade: "unbenotet",
      note: "Praktika vor Studienbeginn können auf Antrag angerechnet werden." },
    { id: "a1", name: "Anwendung 1: Pädagogische Psychologie", lp: 8, sem: "1.–2.", who: "Spinath", page: 28, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Pädagogische Psychologie 1 (V, WiSe) – 4 LP", "Pädagogische Psychologie 2 (Ü, SoSe) – 4 LP"],
      exam: "Vorlesung: schriftliche Arbeiten im Semester + Klausur; Übung: Thesenpapier mit mündlicher Verteidigung", grade: "Mittelwert beider Semester" },
    { id: "a2", name: "Anwendung 2: Diagnostische Psychologie", lp: 8, sem: "3.–4.", who: "Hagemann", page: 30, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Diagnostische Psychologie 1 (V, WiSe) – 4 LP", "Diagnostische Psychologie 2 (S, SoSe) – 4 LP"],
      exam: "Klausur zur Vorlesung + benotete Einzelleistung im Seminar (Präsentation, Hausarbeit, Essay, Workshop)", grade: "Mittelwert Klausur + Seminar" },
    { id: "a3", name: "Anwendung 3: Klinische und Gesundheitspsychologie", lp: 12, sem: "3.–4.", who: "Barnow / Sieverding", page: 32, turnus: "jährlich, WiSe + SoSe", dauer: "2 Semester",
      parts: ["Störungslehre 1 (V, WiSe) – 4 LP", "Störungslehre 2 (S, SoSe) – 4 LP", "Gesundheit, Prävention, Rehabilitation (V, WiSe) – 4 LP"],
      exam: "Klausuren oder mündliche Prüfungen + benotete Einzelleistung im Seminar", grade: "Mittelwert der drei Veranstaltungen" },
    { id: "a4", name: "Anwendung 4: Arbeits- und Organisationspsychologie", lp: 8, sem: "4.", who: "Bipp", page: 34, turnus: "jährlich, SoSe", dauer: "1 Semester",
      parts: ["A&O: Einführung (V, SoSe) – 4 LP", "A&O: Übung (Ü, SoSe) – 4 LP"],
      exam: "Klausur oder mündliche Prüfung zur Vorlesung; Übung unbenotet", grade: "Note = Klausur der Vorlesung",
      note: "Empfohlen: vorher Grundlagen Sozialpsychologie und Diagnostik/Differentielle Psychologie." },
    { id: "ik", name: "Interdisziplinäre Kompetenzen", lp: 6, sem: "4.–5.", who: "Pauen", page: 36, turnus: "jährlich, SoSe + WiSe", dauer: "2 Semester",
      parts: ["Schwerpunkt 1 – Wissenschaftliche Basiskompetenzen: Seminar SoSe (2 LP) + Seminar WiSe (4 LP), z. B. Wissensvermittlung, Forschungstechniken, interdisziplinäre Forschung, wissenschaftliches Schreiben", "Schwerpunkt 2 – Psychotherapeutische Basiskompetenzen (approbationsrelevant): Ethik und Recht (V, SoSe) – 2 LP + Medizinische Aspekte der Klinischen Psychologie und Psychotherapie (V, WiSe) – 4 LP"],
      exam: "Projekt-/Tutoriumsprotokoll bzw. Seminaranforderungen; im PT-Schwerpunkt Klausuren", grade: "unbenotet",
      note: "Im approbationsrelevanten Plan heißen die Bausteine „Ethik und Recht“ und „Medizinische Aspekte der PT“ – das ist Schwerpunkt 2 dieses Moduls." },
    { id: "aov1", name: "AOV 1 – Anwendungsorientierte Vertiefung", lp: 8, sem: "5.–6.", who: "Barnow", page: 39, turnus: "halbjährlich", dauer: "2 Semester",
      parts: ["Pro Semester eine Veranstaltung (4 LP) aus: A Pädagogische Psychologie · B Gesundheitspsychologie · C Klinische Psychologie und Psychotherapie: Verfahrenslehre 1 (V, WiSe) / Verfahrenslehre 2 (S, SoSe) · D Arbeits- und Organisationspsychologie"],
      exam: "Referat mit Ausarbeitung, Hausarbeit oder Klausur; aktive Teilnahme", grade: "Note aus Seminar/Vorlesung 1 oder 2 (bei zwei Noten Mittelwert)",
      note: "Für den approbationsrelevanten Weg: Option C (Verfahrenslehre). Auf der Institutsseite sind approbationsrelevante AOVs mit „AP“ markiert." },
    { id: "aov2", name: "AOV 2 – Anwendungsorientierte Vertiefung", lp: 8, sem: "5.–6.", who: "Bipp", page: 41, turnus: "halbjährlich", dauer: "2 Semester",
      parts: ["Pro Semester eine Veranstaltung (4 LP) aus: A Pädagogische Psychologie · B Gesundheitspsychologie · C Klinische Psychologie und Psychotherapie: Klinische Diagnostik (S, WiSe) / Gesprächsführung (KG, SoSe) · D Arbeits- und Organisationspsychologie"],
      exam: "Referat mit Ausarbeitung, Hausarbeit oder Klausur; aktive Teilnahme", grade: "Note aus Seminar 1 oder 2 (bei zwei Noten Mittelwert)",
      note: "Für den approbationsrelevanten Weg: Option C (Klinische Diagnostik + Gesprächsführung)." },
    { id: "fov", name: "FOV – Forschungsorientierte Vertiefung", lp: 8, sem: "5.–6.", who: "Wrzus", page: 44, turnus: "halbjährlich", dauer: "2 Semester",
      parts: ["Pro Semester ein Forschungsseminar (S, 4 LP) aus: A Allgemeine Psychologie · B Entwicklungs-/Biologische Psychologie · C Differentielle Psychologie · D Sozialpsychologie · E Methodenlehre"],
      exam: "Benotete Einzelleistung in jedem Seminar", grade: "Mittelwert beider Seminare" },
    { id: "praes", name: "Präsentation eigener Forschung", lp: 4, sem: "5.–6.", who: "Pauen", page: 46, turnus: "halbjährlich", dauer: "2 Semester",
      parts: ["Präsentation eigener Forschung 1 (KG, WiSe) – 2 LP", "Präsentation eigener Forschung 2 (KG, SoSe) – 2 LP"],
      exam: "Schriftliches Protokoll der Präsentation zur eigenen Abschlussarbeit", grade: "unbenotet" },
    { id: "bp", name: "Berufspraktikum (Berufsqualifizierende Tätigkeit I)", lp: 8, sem: "4.–5.", who: "Stefanie Glawe", page: 47, turnus: "frei wählbar", dauer: "6 Wochen / 240 Std.",
      parts: ["Berufspraktische Tätigkeit 6 Wochen (240 Std.), zwischen 3. und 6. Semester, im Block oder studienbegleitend – 8 LP"],
      exam: "Erfahrungsbericht nach dem Praktikum", grade: "unbenotet",
      req: "Frühestens nach dem ersten Studienjahr" },
    { id: "ba", name: "Bachelorarbeit", lp: 12, sem: "6.", who: "–", page: 49, turnus: "–", dauer: "ca. 1 Semester",
      parts: ["Regelungen siehe Prüfungsordnung § 17"], exam: "siehe PO § 17", grade: "siehe PO § 17" },
    { id: "is", name: "Interdisziplinäre Studien", lp: 4, sem: "6.", who: "Spinath", page: 50, turnus: "frei wählbar", dauer: "1 Semester",
      parts: ["Interdisziplinäre Studien 1 – 2 LP", "Interdisziplinäre Studien 2 – 2 LP", "Optional: Vorlesung „Anwendungsfelder der Psychologie“ (SoSe, 2 LP)"],
      exam: "Regelmäßige Teilnahme (mind. 4/5 der Semesterwochen, bestätigt) + Kriterien der Veranstaltung", grade: "bestanden / nicht bestanden",
      note: "Veranstaltungen außerhalb der Psychologie: je 2 SWS, an einer Uni bzw. anerkannten Hochschule, mit wissenschaftlichem Bezug." }
  ];

  /* Wichtige Regeln & Fakten – dynamisch aus ERSTI_KNOWLEDGE gespeist */
  const factIds = [
    "orientierungspruefung",
    "krankmeldung_attest",
    "wiederholung_pruefungen",
    "anwesenheitspflicht",
    "freie_spitze",
    "arbeiten_studium",
    "maximalstudiendauer",
    "teilzeitstudium",
    "bachelorarbeit",
    "praktika_ueberblick",
    "master_studiengaenge",
    "lernplaetze_bibliothek",
    "it_yoki_ki",
    "drucken_campuscard",
    "comenius_mentoring"
  ];
  E.facts = factIds.map(fid => {
    const k = (window.ERSTI_KNOWLEDGE || []).find(x => x.id === fid);
    if (!k) return null;
    return {
      t: k.title,
      d: k.summary,
      src: k.sources[0]?.url || HB_FOLDER,
      knowledgeId: k.id,
      status: k.status,
      verifiedAt: k.verifiedAt
    };
  }).filter(Boolean);

  /* Linksammlung (Originalseiten zum Prüfen) */
  E.resources = [
    { cat: "Studium & Organisation", links: [
      ["Institut für Psychologie – Startseite", "https://www.psychologie.uni-heidelberg.de/"],
      ["Studium von A bis Z", AZ],
      ["Bachelorstudiengang", "https://www.psychologie.uni-heidelberg.de/studium/bachelor/"],
      ["Aufbau des Bachelors", "https://www.psychologie.uni-heidelberg.de/studium/bachelor/aufbau/"],
      ["Dokumente & Ordnungen (heiBOX)", HB_FOLDER],
      ["Modulhandbuch B.Sc. (PDF)", HB_FILE],
      ["Semestertermine der Uni", E.src.semester],
      ["heiCO – Kurse & Anmeldung", "https://heico.uni-heidelberg.de"],
      ["Abkürzungen", AZ + "#abkuerzungen"],
      ["c.t. / s.t. (akademische Zeit)", AZ + "#ct-st-akademische-zeitangabe"],
      ["Häufig gestellte Fragen (FAQ)", "https://www.psychologie.uni-heidelberg.de/studium/bachelor/faq/"]
    ]},
    { cat: "Prüfungen & Fristen", links: [
      ["Prüfungsamt Psychologie", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/"],
      ["Prüfungsamt Kontakt & Sprechzeiten", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/kontakt/"],
      ["Prüfungsausschuss", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/pruefungsausschuss/"],
      ["Anmeldung zu Prüfungen (heiCO)", "https://heico.uni-heidelberg.de"],
      ["Seminarwahl & -anmeldung", "https://www.psychologie.uni-heidelberg.de/studium/seminarwahl/"],
      ["Attest & Krankmeldung", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/"],
      ["Anwesenheitspflicht", AZ + "#Anwesenheitspflicht"],
      ["Anerkennung von Leistungen", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/anerkennung/"],
      ["Bachelorarbeit Richtlinien", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/abschlussarbeiten/"]
    ]},
    { cat: "Wahlbereiche & Praxis", links: [
      ["Praktika B.Sc. (Übersicht)", "https://www.psychologie.uni-heidelberg.de/studium/praktikum/"],
      ["Praktika Checklisten (heiBOX)", "https://heibox.uni-heidelberg.de/d/7dc87b81907742e5b557/"],
      ["Empirisches Praktikum (Empra)", "https://www.psychologie.uni-heidelberg.de/studium/empra/"],
      ["Arbeitseinheiten des Instituts", "https://www.psychologie.uni-heidelberg.de/ae/"],
      ["Hiwi-Stellen & Ausschreibungen", "https://heibox.uni-heidelberg.de/d/3a9e41878141460c9468/"],
      ["Arbeiten während des Studiums", AZ + "#arbeiten-waehrend-des-studiums"]
    ]},
    { cat: "Beratung & Unterstützung", links: [
      ["Fachstudienberatung B.Sc.", AZ + "#fachstudienberatung"],
      ["Comenius-Programm (Peer-Mentoring)", AZ + "#comenius-programm"],
      ["Coaching-Projekt", AZ + "#coaching-projekt"],
      ["Psychosoziale Beratung (PBS)", "https://www.stw.uni-heidelberg.de/de/beratung"],
      ["BAföG-Beauftragte", AZ + "#bafoeg"],
      ["Zentrale Studienberatung (ZSB)", "https://www.uni-heidelberg.de/de/studium/service-beratung/beratungsangebote-der-zentralen-studienberatung"]
    ]},
    { cat: "Campus, IT & Lernorte", links: [
      ["Gebäude des Instituts", AZ + "#Gebäude"],
      ["Bibliothek & Testothek", "https://www.psychologie.uni-heidelberg.de/bibliothek/"],
      ["Lern- und Arbeitsräume", AZ + "#Arbeitsräume"],
      ["URZ IT für Studierende", "https://www.urz.uni-heidelberg.de/de/support/it-fuer-jede-zielgruppe/it-fuer-studierende"],
      ["YoKI – Universitäre KI", "https://yoki.urz.uni-heidelberg.de/"],
      ["Drucken mit Campus-Card (Ricoh)", "https://www.urz.uni-heidelberg.de/de/service-katalog/drucken/oeffentliche-drucker-und-kopierer"],
      ["eduroam CAT Tool", "https://cat.eduroam.org/"],
      ["Microsoft 365 Campus-Lizenz", "https://www.urz.uni-heidelberg.de/de/service-katalog/software-und-anwendungen/microsoft-hochschulrahmenvertrag"]
    ]},
    { cat: "Studierendenvertretung", links: [
      ["Fachschaft Psychologie", "https://www.psychologie.uni-heidelberg.de/studium/a-z/fachschaft"],
      ["Fachschaftskeller", AZ + "#fachschaftskeller"],
      ["Willkommenstag der Uni", E.src.willkommenstag]
    ]},
    { cat: "Deine EKS-Unterlagen (heiBOX)", links: [
      ["Ordner EKS_Materialien_Erstis", E.src.heibox],
      ["EKS-Einladung 2026", E.src.eksInvite],
      ["EKS-Wochenplan 2026", E.src.eksPlan],
      ["Veranstaltungen 1. Semester", E.src.timetable],
      ["Studienplan 6 Sem. allgemein", E.src.plan6allg],
      ["Studienplan 6 Sem. approbationsrelevant", E.src.plan6approb],
      ["Studienplan 8 Sem.", E.src.plan8],
      ["Studienplan 10 Sem.", E.src.plan10]
    ]}
  ];

  /* Glossar: Lücken schließen + A–Z Abkürzungen */
  const gl = Object.fromEntries(E.glossary);
  gl["FOV"] = "Forschungsorientierte Vertiefung (5.–6. Sem., 2 × 4 LP): Forschungsseminare in Allgemeiner, Entwicklungs-/Bio-, Differentieller, Sozialpsychologie oder Methodenlehre";
  gl["AOV"] = "Anwendungsorientierte Vertiefung (AOV 1 + AOV 2, je 8 LP, 5.–6. Sem.): Optionen A Päd. Psych., B Gesundheit, C Klinische Psych./Psychotherapie (approbationsrelevant, „AP“), D A&O";
  gl["KLF / PSQ"] = "Weitere Wahlalternativen laut Institutsseite: Kritische Lektüre (KLF), Personenbezogene Schlüsselqualifikationen (PSQ)";
  gl["BQT I"] = "Berufsqualifizierende Tätigkeit I = Berufspraktikum (6 Wochen / 240 Std., 8 LP, frühestens nach 60 LP)";
  gl["Interdisziplinäre Kompetenzen"] = "Pflichtmodul (6 LP) mit zwei Schwerpunkten: wissenschaftliche oder psychotherapeutische Basiskompetenzen (Ethik & Recht, Medizinische Aspekte)";
  gl["KliPP"] = "M.Sc. Klinische Psychologie und Psychotherapie (approbationskonformer Masterstudiengang am PI)";
  gl["PFA"] = "M.Sc. Psychologie: Forschung und Anwendung (konsekutiver forschungsorientierter Master am PI)";
  gl["KliPs"] = "Klinische Psychologie und Psychotherapie (Arbeitseinheit am Institut)";
  gl["KiJu"] = "Klinische Psychologie des Kindes- und Jugendalters (Arbeitseinheit am Institut)";
  gl["PäPs"] = "Pädagogische Psychologie (Arbeitseinheit am Institut)";
  gl["Diff"] = "Differentielle Psychologie und Psychologische Diagnostik (Arbeitseinheit am Institut)";
  gl["AO / A&O"] = "Arbeits- und Organisationspsychologie (Arbeitseinheit am Institut)";
  gl["PI"] = "Psychologisches Institut der Universität Heidelberg (Hauptstraße 47–51)";
  gl["UB"] = "Universitätsbibliothek Heidelberg (Plöck 107–109)";
  gl["URZ"] = "Universitätsrechenzentrum (Im Neuenheimer Feld 293 / 330)";
  gl["ZPP"] = "Zentrum für Psychologische Psychotherapie der Universität Heidelberg";
  gl["F"] = "Friedrichsbau (Hauptstraße 47–51, Institutsgebäude mit Vorder- und Hintergebäude)";
  gl["A"] = "Alte Anatomie (Hauptstraße 47–51, Hofgebäude, z. B. Übungsraum A102)";
  gl["P"] = "Pavillon (Akademiestraße 3, Institutsgebäude im Anatomiegarten)";
  gl["SoSe / WiSe"] = "Sommersemester / Wintersemester";
  gl["SWS"] = "Semesterwochenstunden";
  gl["PO"] = "Prüfungsordnung (maßgeblich: PO vom 12.07.2021)";
  gl["PsychThApprO"] = "Approbationsordnung für Psychotherapeutinnen und Psychotherapeuten";
  gl["c.t. / s.t."] = "cum tempore (Beginn 15 Min. später, z. B. 9 c.t. = 9:15) / sine tempore (pünktlich)";
  E.glossary = Object.entries(gl);
  E.glossarySrc = {
    "FOV": AZ + "#fov-im-bsc",
    "AOV": AZ + "#aov-im-bsc",
    "KLF / PSQ": AZ + "#aov-im-bsc",
    "c.t. / s.t.": AZ + "#ct-st-akademische-zeitangabe",
    "Comenius-Programm": AZ + "#comenius-programm",
    "EKS": AZ + "#eks",
    "LP": AZ + "#ects-punkte-leistungspunkte-lp",
    "BQT I": HB_FILE,
    "Interdisziplinäre Kompetenzen": HB_FILE,
    "Vpn-Stunden": HB_FILE,
    "Empra": HB_FILE,
    "AE": AZ + "#arbeitseinheiten",
    "KliPP": "https://www.psychologie.uni-heidelberg.de/studium/bachelor/faq/",
    "PFA": "https://www.psychologie.uni-heidelberg.de/studium/bachelor/faq/",
    "F": AZ + "#Gebäude",
    "A": AZ + "#Gebäude",
    "P": AZ + "#Gebäude"
  };

  /* Offene Fragen: Vpn-Nachweis-Details */
  E.openQuestions = E.openQuestions.filter(q => !q.startsWith("Wofür stehen FOV"));

  /* ========================================================================
     STUDIEN-GUIDE: Lebensphasen, Regelungen & Offizielle Ressourcen
     (referenziert ERSTI_KNOWLEDGE als Single Source of Truth)
     ======================================================================== */
  E.guideSections = [
    {
      id: "pruefungen",
      title: "Prüfungen & Fristen",
      icon: "📋",
      desc: "Orientierungsprüfung, Atteste, Wiederholungsfristen und Anwesenheit.",
      items: [
        { knowledgeId: "orientierungspruefung" },
        { knowledgeId: "krankmeldung_attest" },
        { knowledgeId: "wiederholung_pruefungen" },
        { knowledgeId: "automatische_pruefungsanmeldung" },
        { knowledgeId: "anwesenheitspflicht" },
        { knowledgeId: "pruefungszeitraum" }
      ]
    },
    {
      id: "studium",
      title: "Studienaufbau & Regeln",
      icon: "📊",
      desc: "Freie Spitze, Regelstudienzeit, Teilzeit und Arbeiten während des Studiums.",
      items: [
        { knowledgeId: "freie_spitze" },
        { knowledgeId: "maximalstudiendauer" },
        { knowledgeId: "teilzeitstudium" },
        { knowledgeId: "arbeiten_studium" },
        { knowledgeId: "empra_poster_kongress" }
      ]
    },
    {
      id: "vpn-empra",
      title: "Vpn-Stunden & Empra",
      icon: "🔬",
      desc: "30 Versuchspersonenstunden sammeln, Studienportal nutzen und das Empirische Praktikum meistern.",
      items: [
        {
          knowledgeId: null,
          title: "30 Pflicht-Vpn-Stunden (1 LP im Propädeutik-Modul)",
          body: `<p>Im Bachelor muss jede:r Studierende an psychologischen Studien als Versuchsperson teilnehmen (1 LP):</p>
            <ul>
              <li><strong>Umfang:</strong> Mindestens <strong>30 Stunden</strong>.</li>
              <li><strong>Laufzettel:</strong> Vor der Tür des Prüfungsamts (Raum F042) zum Mitnehmen.</li>
              <li><strong>Ablauf:</strong> Nach jeder Studie gegenzeichnen lassen. Vollständige Zettel am Semesterende im Prüfungsamt einreichen.</li>
            </ul>`,
          link: "https://studienportal.psychologie.uni-heidelberg.de/",
          linkText: "Zum Studienportal des Instituts ↗"
        },
        {
          knowledgeId: null,
          title: "Das Studienportal der Universität Heidelberg",
          body: `<p>Über das Heidelberger Studienportal kannst du dich registrieren und freie Termine für experimentelle Studien (Online, Labor, Eyetracking, EEG) buchen.</p>`,
          link: "https://studienportal.psychologie.uni-heidelberg.de/",
          linkText: "studienportal.psychologie.uni-heidelberg.de ↗"
        },
        { knowledgeId: "empra_poster_kongress" }
      ]
    },
    {
      id: "praktika",
      title: "Praktika & BQT I",
      icon: "💼",
      desc: "Orientierungspraktikum, berufsqualifizierende Tätigkeit (BQT I) und Approbationskriterien.",
      items: [
        { knowledgeId: "praktika_ueberblick" }
      ]
    },
    {
      id: "tools",
      title: "Lernorte, Testothek & IT",
      icon: "📚",
      desc: "Arbeitsplätze, Testothek, Buchscanner, YoKI und Netzwerkzugang.",
      items: [
        { knowledgeId: "lernplaetze_bibliothek" },
        { knowledgeId: "testothek_scanner" },
        { knowledgeId: "it_yoki_ki" },
        { knowledgeId: "drucken_campuscard" },
        { knowledgeId: "cip_pool_aufgeloest" },
        { knowledgeId: "vpn_eduvpn" }
      ]
    },
    {
      id: "leben",
      title: "Campus, Community & Erste Hilfe",
      icon: "🏛️",
      desc: "Comenius-Mentoring, Fachschaft, Erste Hilfe und Institutszeiten.",
      items: [
        { knowledgeId: "comenius_mentoring" },
        { knowledgeId: "fachschaft_psychologie" },
        { knowledgeId: "erste_hilfe_f017" },
        { knowledgeId: "gebaeude_raumcodes" },
        { knowledgeId: "oeffnungszeiten_institut" }
      ]
    },
    {
      id: "abschluss",
      title: "Bachelorarbeit & Master",
      icon: "🎓",
      desc: "Voraussetzungen, doppelte Notengewichtung (Faktor 2), Zweier-Teams und Master KliPP / PFA.",
      items: [
        { knowledgeId: "bachelorarbeit" },
        { knowledgeId: "master_studiengaenge" }
      ]
    }
  ];

  /* Bessere Gruppen-Labels im approbationsrelevanten Plan */
  Object.assign(E.modules.ethik, { group: "Interdisz. Kompetenzen · PT" });
  Object.assign(E.modules.medpt, { group: "Interdisz. Kompetenzen · PT" });
  Object.assign(E.modules.verf1, { group: "AOV 1 · Option C" });
  Object.assign(E.modules.verf2, { group: "AOV 1 · Option C" });
  Object.assign(E.modules.klindiag, { group: "AOV 2 · Option C" });
  Object.assign(E.modules.gespr, { group: "AOV 2 · Option C" });
  E.modules.fov1.name = "FOV – Forschungsseminar 1"; E.modules.fov2.name = "FOV – Forschungsseminar 2";
  E.modules.aov1a.name = "AOV 1 – Seminar/VL 1"; E.modules.aov1b.name = "AOV 1 – Seminar 2";
  E.modules.aov2a.name = "AOV 2 – Seminar 1"; E.modules.aov2b.name = "AOV 2 – Seminar 2";
  E.sources.push({ title: "Modulhandbuch Bachelor Psychologie (Fassung 17.01.2024)", desc: "Module, Prüfungsformen, LP, Turnus", link: HB });
  E.sources.push({ title: "Institut für Psychologie – Studium A bis Z", desc: "Regeln, Anmeldungen, Beratung", link: AZ });
  const srcKeys = ["eksInvite", "eksPlan", "timetable", "plan6allg", "plan6approb", "plan8", "plan10"];
  E.sources.forEach((s, i) => { if (!s.link) s.link = E.src[srcKeys[i]] || E.src.heibox; });
})(window.ERSTI);
