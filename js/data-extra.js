/* ==========================================================================
   ERGÄNZUNG: Modulhandbuch (Fassung 17.01.2024), Institutsseiten, Quellen-Links
   Jede Angabe hat einen Link zur Originalquelle (src / page).
   ========================================================================== */
(function (E) {
  const HB = "https://backend.uni-heidelberg.de/de/dokumente/modulhandbuch-psychologie-ba-2024-01-17/download";
  const AZ = "https://www.psychologie.uni-heidelberg.de/studium/a-z/";
  const BOX = "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/files/?p=%2F";

  E.src = {
    handbook: HB,
    hbPage: (p) => `${HB}#page=${p}`,
    heibox: "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/",
    eksInvite: BOX + encodeURIComponent("1. EKS-Einladung_2026.pdf"),
    eksPlan: BOX + encodeURIComponent("1.1 EKS-Woche_Plan_2026.pdf"),
    timetable: BOX + encodeURIComponent("2. Übersicht Veranstaltungen 1. Semester WiSe 26-27, Stand 25.09.26.pdf"),
    plan6allg: BOX + encodeURIComponent("3. Studienplan_BSc_100%_allgemein_Regelstudienzeit 6 Sem.pdf"),
    plan6approb: BOX + encodeURIComponent("4. Studienplan_BSc_100%_approbationsrelevant_Regelstudienzeit 6 Sem.pdf"),
    plan8: BOX + encodeURIComponent("5. Studienplan_BSc_100%_allgemein_8Sem.pdf"),
    plan10: BOX + encodeURIComponent("6. Studienplan_BSc_100%_allgemein_10Sem.pdf"),
    semester: "https://www.uni-heidelberg.de/en/study/management-of-studies/key-dates-deadlines/further-semester-dates",
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

  /* Wichtige Regeln & Fakten (mit Quelle) */
  E.facts = [
    { t: "Prüfungen", d: "Geprüft wird meist in Einzelprüfungen je Veranstaltung. Die genauen Modalitäten werden in der ersten Sitzung bekannt gegeben.", src: HB + "#page=7" },
    { t: "Unbenotete Module", d: "Propädeutik, Methoden 3 (Empra), Orientierungs- und Berufspraktikum, Interdisziplinäre Kompetenzen, Präsentation eigener Forschung, Interdisziplinäre Studien.", src: HB },
    { t: "Vpn-Stunden", d: "Mindestens 30 Stunden Teilnahme an psychologischen Experimenten – nachgewiesen und belegt (1 LP).", src: HB + "#page=8" },
    { t: "Orientierungspraktikum", d: "4 Wochen Vollzeit (150 Std.), frei wählbar, Block oder studienbegleitend. Bescheinigung + Erfahrungsbericht. Frühere Praktika auf Antrag anrechenbar.", src: HB + "#page=26" },
    { t: "Berufspraktikum (BQT I)", d: "6 Wochen (240 Std.), frühestens nach dem 1. Studienjahr, zwischen 3. und 6. Semester. Erfahrungsbericht.", src: HB + "#page=47" },
    { t: "Empra (Methoden 3)", d: "Setzt bestandenes Methoden 2 voraus. Option: Start schon im 2. Semester in der Entwicklungspsychologie (begrenzte Plätze).", src: HB + "#page=14" },
    { t: "Tauschoption", d: "Grundlagen 2 (Entwicklung) und Grundlagen 4 (Biologische Psychologie) können in der Reihenfolge getauscht werden.", src: HB + "#page=18" },
    { t: "Approbationsweg", d: "Approbationsrelevant = Interdisziplinäre Kompetenzen Schwerpunkt 2 + AOV 1 und AOV 2 jeweils Option C (Klinische Psychologie und Psychotherapie).", src: HB + "#page=36" },
    { t: "Teilzeit", d: "Vollzeitstudium; Teilzeitstudium ist auf Antrag möglich.", src: HB + "#page=1" },
    { t: "Kursanmeldung", d: "Kurse, Übungen und Seminare wählst du in heiCO. Das komplette Lehrangebot findest du in heiCO unter der Kachel „Lehrangebot“.", src: "https://www.psychologie.uni-heidelberg.de/studium/a-z/veranstaltungsuebersicht" }
  ];

  /* Linksammlung (Originalseiten zum Prüfen) */
  E.resources = [
    { cat: "Studium & Organisation", links: [
      ["Institut für Psychologie – Startseite", "https://www.psychologie.uni-heidelberg.de/"],
      ["Studium von A bis Z", AZ],
      ["Bachelorstudiengang", "https://www.psychologie.uni-heidelberg.de/studium/bachelor/"],
      ["Aufbau des Bachelors", "https://www.psychologie.uni-heidelberg.de/studium/bachelor/aufbau/"],
      ["Studienplan (A–Z)", AZ + "studienplan"],
      ["Modulhandbuch B.Sc. (17.01.2024, PDF)", HB],
      ["Semester- und Vorlesungszeiten (Institut)", "https://www.psychologie.uni-heidelberg.de/semester/"],
      ["Semestertermine der Uni", E.src.semester],
      ["Veranstaltungsübersicht (→ heiCO „Lehrangebot“)", "https://www.psychologie.uni-heidelberg.de/studium/a-z/veranstaltungsuebersicht"],
      ["heiCO – Kurse & Anmeldung", "https://heico.uni-heidelberg.de/heiCO/ee/ui/ca2/app/desktop/#/slc.tm.cp/student/courses"],
      ["Abkürzungen", AZ + "abkuerzungen"],
      ["c.t. / s.t. (akademische Zeit)", AZ + "ct-st-akademische-zeitangabe"],
      ["Häufig gestellte Fragen", AZ + "haeufig-gestellte-fragen"],
      ["Formulare und Dateien", AZ + "formulare-und-dateien"]
    ]},
    { cat: "Prüfungen & Anmeldung", links: [
      ["Prüfungsamt", "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/"],
      ["Anmeldung zu den Klausuren (Vorlesungen)", AZ + "anmeldung-zu-den-klausuren-vorlesungen"],
      ["Anmeldungen zu Seminaren", AZ + "anmeldungen-zu-seminaren"],
      ["Seminarwahl", "https://www.psychologie.uni-heidelberg.de/studium/seminarwahl/"],
      ["An-/Abmeldung von Veranstaltungen", AZ + "abmeldungen-von-veranstaltungen"],
      ["Benotung", AZ + "benotung"],
      ["Attest (Krankheit bei Prüfungen)", AZ + "attest"],
      ["Anwesenheitspflicht", AZ + "anwesenheitspflicht"],
      ["Anrechnung von Prüfungsleistungen", AZ + "anrechnung-von-pruefungsleistungen"],
      ["Anmeldung der Bachelorarbeit", AZ + "anmeldung-der-bachelorarbeit-ba"],
      ["Bachelorarbeit", AZ + "bachelorarbeit"],
      ["Eigenständigkeitserklärung", AZ + "eigenstaendigkeitserklaerung"]
    ]},
    { cat: "Wahlbereiche & Praxis", links: [
      ["AOV im B.Sc.", AZ + "aov-im-bsc"],
      ["FOV im B.Sc.", AZ + "fov-im-bsc"],
      ["Praktikum (Orientierungs- & Berufspraktikum)", "https://www.psychologie.uni-heidelberg.de/studium/praktikum/"],
      ["Empirisches Praktikum (Empra)", "https://www.psychologie.uni-heidelberg.de/studium/empra/"],
      ["Empirisches Praktikum – Kongress", AZ + "empirisches-praktikum-kongress"],
      ["Arbeitseinheiten des Instituts", AZ + "arbeitseinheiten"],
      ["Hiwi-Jobs", AZ + "hiwi"],
      ["Arbeiten während des Studiums", AZ + "arbeiten-waehrend-des-studiums"],
      ["Weg zur Psychotherapie (Approbation)", AZ + "ausbildung-zum-psychologischen-psychotherapeuten"],
      ["Berufsmöglichkeiten", AZ + "berufsmoeglichkeiten"]
    ]},
    { cat: "Ausland", links: [
      ["Auslandssemester", AZ + "auslandssemester"],
      ["Auslandspraktikum", AZ + "auslandspraktikum"],
      ["Erasmus", AZ + "erasmus"]
    ]},
    { cat: "Beratung & Unterstützung", links: [
      ["Fachstudienberatung", AZ + "fachstudienberatung"],
      ["Allgemeine Studienberatung", AZ + "allgemeine-studienberatung"],
      ["Comenius-Programm (Peer-Mentoring)", AZ + "comenius-programm"],
      ["EKS (Ersti-Woche)", AZ + "eks"],
      ["Coaching-Projekt", AZ + "coaching-projekt"],
      ["Behinderung & chronische Erkrankung", AZ + "behinderung"],
      ["BAföG", AZ + "bafoeg"],
      ["Finanzielle Förderung", AZ + "finanzielle-foerderungsmoeglichkeiten"],
      ["Beurlaubung", AZ + "beurlaubung"],
      ["Career Service", AZ + "career-service"]
    ]},
    { cat: "Campus, IT & Bibliothek", links: [
      ["Gebäude des Instituts", "https://www.psychologie.uni-heidelberg.de/willkomm/gebaeude/"],
      ["Institutsbibliothek / Testothek", "https://www.psychologie.uni-heidelberg.de/service/bib/"],
      ["Fachliteratur", AZ + "fachliteratur"],
      ["CIP-Pool (PC-Raum)", AZ + "cip-pool"],
      ["Arbeitsräume", AZ + "arbeitsraeume"],
      ["Drucken", AZ + "drucken"],
      ["E-Mail-Account", AZ + "e-mail-account"],
      ["IT-Administration", "https://www.psychologie.uni-heidelberg.de/service/edv/"],
      ["Campus Card", AZ + "campus-card"],
      ["URZ IT für Studierende", "https://www.urz.uni-heidelberg.de/de/support/it-fuer-jede-zielgruppe/it-fuer-studierende"],
      ["YoKI – Universitäre KI", "https://yoki.urz.uni-heidelberg.de/"],
      ["eduroam CAT Tool (WLAN-Profile)", "https://cat.eduroam.org/"],
      ["Sprachkurse & Hochschulsport", AZ + "anmeldungen-zu-sprachkursen-und-hochschulsport"]
    ]},
    { cat: "Studierende", links: [
      ["Fachschaft (A–Z)", AZ + "fachschaft"],
      ["Fachschaftskeller", AZ + "fachschaftskeller"],
      ["Dschungelbuch", AZ + "dschungelbuch"],
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

  /* Glossar: Lücken schließen + Quellen */
  const gl = Object.fromEntries(E.glossary);
  gl["FOV"] = "Forschungsorientierte Vertiefung (5.–6. Sem., 2 × 4 LP): Forschungsseminare in Allgemeiner, Entwicklungs-/Bio-, Differentieller, Sozialpsychologie oder Methodenlehre";
  gl["AOV"] = "Anwendungsorientierte Vertiefung (AOV 1 + AOV 2, je 8 LP, 5.–6. Sem.): Optionen A Päd. Psych., B Gesundheit, C Klinische Psych./Psychotherapie (approbationsrelevant, „AP“), D A&O";
  gl["KLF / PSQ"] = "Weitere Wahlalternativen laut Institutsseite: Kritische Lektüre (KLF), Personenbezogene Schlüsselqualifikationen (PSQ)";
  gl["BQT I"] = "Berufsqualifizierende Tätigkeit I = Berufspraktikum (6 Wochen / 240 Std., 8 LP)";
  gl["Interdisziplinäre Kompetenzen"] = "Pflichtmodul (6 LP) mit zwei Schwerpunkten: wissenschaftliche oder psychotherapeutische Basiskompetenzen (Ethik & Recht, Medizinische Aspekte)";
  gl["SoSe / WiSe"] = "Sommersemester / Wintersemester";
  gl["SWS"] = "Semesterwochenstunden";
  gl["PO"] = "Prüfungsordnung";
  gl["PsychThApprO"] = "Approbationsordnung für Psychotherapeutinnen und Psychotherapeuten";
  gl["c.t. / s.t."] = "cum tempore (Beginn 15 Min. später, z. B. 9 c.t. = 9:15) / sine tempore (pünktlich)";
  E.glossary = Object.entries(gl);
  E.glossarySrc = { "FOV": AZ + "fov-im-bsc", "AOV": AZ + "aov-im-bsc", "KLF / PSQ": AZ + "aov-im-bsc", "c.t. / s.t.": AZ + "ct-st-akademische-zeitangabe",
    "Comenius-Programm": AZ + "comenius-programm", "EKS": AZ + "eks", "LP": AZ + "ects-punkte-leistungspunkte-lp", "BQT I": HB + "#page=47",
    "Interdisziplinäre Kompetenzen": HB + "#page=36", "Vpn-Stunden": HB + "#page=8", "Empra": HB + "#page=14", "AE": AZ + "arbeitseinheiten" };

  /* Offene Fragen aktualisieren (FOV/AOV jetzt geklärt) */
  E.openQuestions = E.openQuestions.filter(q => !q.startsWith("Wofür stehen FOV"));
  E.openQuestions.push("Wie werden Vpn-Stunden nachgewiesen (Formular/Portal)? Die Mindestzahl ist 30 Std.");

  /* ========================================================================
     STUDIEN-GUIDE: Lebensphasen, Regelungen & Offizielle Ressourcen
     ======================================================================== */
  E.guideSections = [
    {
      id: "pruefungen",
      title: "Prüfungen & Fristen",
      icon: "📋",
      desc: "Atteste, Klausurregeln, Wiederholungsfristen und die Orientierungsprüfung.",
      items: [
        {
          title: "Krankmeldung & Attest bei Klausuren (3-Tage-Frist!)",
          body: `<p>Wer wegen Krankheit eine Klausur nicht mitschreiben kann, muss unverzüglich handeln:</p>
            <ul>
              <li><strong>Frist:</strong> Spätestens <strong>innerhalb von 3 Tagen</strong> muss das ärztliche Attest zusammen mit dem Formular zur Prüfungsunfähigkeit im Prüfungsamt eingereicht werden.</li>
              <li><strong>Einreichung:</strong> Entweder in das Postfach Nr. 55 im Institut werfen oder per E-Mail an <code>pruefungsamt@psychologie.uni-heidelberg.de</code> senden (Betreff: Matrikelnummer & Klausurname).</li>
              <li><strong>Bestätigung:</strong> Das Prüfungsamt bestätigt den Eingang nicht manuell – du erhältst eine Benachrichtigung direkt über das <strong>heiCO-System</strong>.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/",
          linkText: "Prüfungsamt & Formulare"
        },
        {
          title: "Orientierungsprüfung (§ 3 Abs. 4 PO)",
          body: `<p>Die Orientierungsprüfung ist eine gesetzliche Pflichtprüfung zur Überprüfung der Studienorientierung:</p>
            <ul>
              <li><strong>Welche Klausur?</strong> Sie ist identisch mit der Abschlussklausur in <strong>Inferenzstatistik</strong> (Modul Methoden 1) am Ende des 2. Semesters.</li>
              <li><strong>Frist & Versuche:</strong> Bei Nichtbestehen darf die Klausur <strong>nur einmal</strong> wiederholt werden und muss spätestens bis zum Ende des <strong>3. Fachsemesters</strong> bestanden sein!</li>
              <li><strong>Achtung:</strong> Wird diese Frist versäumt, erlischt der Prüfungsanspruch im Bachelor Psychologie unwiderruflich.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/zwischenpruefung/musterantworten",
          linkText: "Musterantworten zur Orientierungsprüfung"
        },
        {
          title: "Wiederholung von Prüfungsleistungen",
          body: `<p>Nicht bestandene Prüfungsleistungen müssen <strong>spätestens innerhalb des folgenden Semesters</strong> nachgeholt werden.</p>
            <div class="callout">
              <strong>Wichtig:</strong> Im Falle einer nicht bestandenen Klausur meldet dich das Prüfungsamt in der Regel <em>automatisch</em> für den nächsten Nachholtermin an. Informiere dich frühzeitig bei den Dozierenden über das genaue Prüfungsformat.
            </div>`
        },
        {
          title: "Prüfungsamt: Sprechzeiten & E-Mail-Richtlinien",
          body: `<p>Das Prüfungsamt (Raum F042, Hauptstr. 47) bearbeitet Leistungsübersichten, ToR, Krankmeldungen und Abschlussdokumente:</p>
            <ul>
              <li><strong>Offene Sprechstunde:</strong> Mo, Di, Do 10:00–11:30 Uhr · Fr 11:00–12:00 Uhr</li>
              <li><strong>Telefon:</strong> 06221 / 54-7342 (Di 14:00–15:00 Uhr & Do 12:00–13:00 Uhr)</li>
              <li><strong>E-Mail-Regel:</strong> Ausschließlich an <code>pruefungsamt@psychologie.uni-heidelberg.de</code> schreiben. Bei dringenden Fristen das Zieldatum in die Betreffzeile setzen und stets die <strong>Matrikelnummer</strong> angeben.</li>
              <li><strong>Digitales Transcript (ToR):</strong> Kannst du dir jederzeit selbst online über heiCO als verifiziertes PDF herunterladen.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/kontakt/",
          linkText: "Prüfungsamt Kontakt & Sprechzeiten"
        }
      ]
    },
    {
      id: "vpn-empra",
      title: "Vpn-Stunden & Empra",
      icon: "🔬",
      desc: "30 Versuchspersonenstunden sammeln, Studienportal nutzen und das Empirische Praktikum meistern.",
      items: [
        {
          title: "30 Pflicht-Vpn-Stunden (1 LP im Propädeutik-Modul)",
          body: `<p>Im Bachelor muss jede/r Studierende an psychologischen Studien als Versuchsperson teilnehmen, um experimentelle Forschung aus Teilnehmerperspektive kennenzulernen:</p>
            <ul>
              <li><strong>Umfang:</strong> Insgesamt <strong>30 Stunden</strong> (entspricht 1 LP).</li>
              <li><strong>Laufzettel:</strong> Die Vpn-Bestätigungszettel liegen an den Öffnungstagen vor der Tür des Prüfungsamts (Raum F042) zum Mitnehmen aus.</li>
              <li><strong>Ablauf:</strong> Nach jeder Teilnahme lässt du dir Datum, Studie und Dauer von den Versuchsleiter:innen gegenzeichnen. Vollständige Zettel werden im Prüfungsamt eingereicht.</li>
            </ul>`,
          link: "https://studienportal.psychologie.uni-heidelberg.de/",
          linkText: "Zum Studienportal des Instituts"
        },
        {
          title: "Das Studienportal der Universität Heidelberg",
          body: `<p>Über das institutseigene <strong>Studienportal</strong> kannst du dich kostenlos registrieren und dir freie Timeslots für psychologische Studien (Online, Labor, Eyetracking, EEG etc.) buchen. Später kannst du hier auch eigene Studien für dein Empra oder deine Bachelorarbeit ausschreiben.</p>`,
          link: "https://studienportal.psychologie.uni-heidelberg.de/",
          linkText: "studienportal.psychologie.uni-heidelberg.de ↗"
        },
        {
          title: "Empirisches Arbeiten: Empra (Methoden 3)",
          body: `<p>Das Empra erstreckt sich vom 3. bis zum 5. Semester (12 LP, unbenotet):</p>
            <ul>
              <li><strong>Voraussetzung:</strong> Erfolgreicher Abschluss des Moduls Methoden 2 (Versuchsplanung).</li>
              <li><strong>Projektseminare 1 & 2:</strong> In Kleingruppen konzipiert ihr eine eigene empirische Untersuchung, erhebt Daten und wertet diese mit R oder SPSS aus.</li>
              <li><strong>Poster-Kongress:</strong> Zu Beginn jedes Wintersemesters präsentieren alle Gruppen ihre Forschungsarbeiten auf dem öffentlichen <em>EmPra-Kongress</em> im Institut, auf dem auch Preise verliehen werden.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/empra/",
          linkText: "Offizielle EmPra-Infoseite"
        }
      ]
    },
    {
      id: "praktika",
      title: "Praktika & BQT I",
      icon: "💼",
      desc: "Orientierungspraktikum, berufsqualifizierende Tätigkeit (BQT I) und Approbationskriterien.",
      items: [
        {
          title: "Orientierungspraktikum (5 LP)",
          body: `<p>Dient dem Kennenlernen psychologischer Berufsfelder in einer frühen Studienphase:</p>
            <ul>
              <li><strong>Dauer:</strong> 4 Wochen Vollzeit bzw. <strong>150 Arbeitsstunden</strong>.</li>
              <li><strong>Zeitpunkt:</strong> Frei wählbar, meist in der vorlesungsfreien Zeit der ersten beiden Semester (Block oder studienbegleitend).</li>
              <li><strong>Leistungsnachweis:</strong> Praktikumsbescheinigung der Institution + schriftlicher Erfahrungsbericht (unbenotet).</li>
              <li><strong>Anrechnung:</strong> Einschlägige Praktika vor Studienbeginn können auf Antrag von Fachstudienberaterin Stefanie Glawe anerkannt werden.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/praktikum/",
          linkText: "Praktikumsleitfaden & Formulare"
        },
        {
          title: "Berufspraktikum / BQT I (8 LP)",
          body: `<p>Vertieftes Fachpraktikum (Berufsqualifizierende Tätigkeit I):</p>
            <ul>
              <li><strong>Dauer:</strong> Mindestens 6 Wochen bzw. <strong>240 Arbeitsstunden</strong>.</li>
              <li><strong>Voraussetzung:</strong> Frühestens nach dem 1. Studienjahr (in der Regel zwischen dem 3. und 6. Semester).</li>
              <li><strong>Für den Psychotherapie-Weg (Approbation):</strong> Muss in einer anerkannten klinischen Einrichtung unter Aufsicht approbierter Psychotherapeut:innen absolviert werden. Die Kriterien der PsychThApprO müssen exakt erfüllt sein.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/praktika/",
          linkText: "Prüfungsamt: Praktikumsrichtlinien & Genehmigung"
        }
      ]
    },
    {
      id: "tools",
      title: "Bibliothek, Testothek & IT",
      icon: "📚",
      desc: "Arbeitsplätze, Testverfahren ausleihen, Buchscanner und Campus-Netzwerkzugang.",
      items: [
        {
          title: "Institutsbibliothek & neue UB-Lernplätze",
          body: `<p>Die Institutsbibliothek an der Hauptstraße 47–51 bietet einen ruhigen Lernort im Herzen der Altstadt:</p>
            <ul>
              <li><strong>Bestand:</strong> Rund 6.000 Monografien als Präsenzbestand. Ausleihe erfolgt über die zentrale Universitätsbibliothek (UB Plöck).</li>
              <li><strong>Neue Arbeitsplätze:</strong> Im großen Saal stehen renovierte Arbeitsplätze mit WLAN und Stromversorgung bereit. Der Einlass erfolgt elektronisch über deine <strong>Campus-Card</strong>.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/service/bib/",
          linkText: "Bibliothek & Öffnungszeiten"
        },
        {
          title: "Testothek: Psychologische Testverfahren ausleihen",
          body: `<p>Die Testothek befindet sich im Vordergebäude in den Räumen <strong>019–021 (Zwischengeschoss)</strong>:</p>
            <ul>
              <li><strong>Angebot:</strong> Über 1.000 psychologische Testverfahren (Intelligenz-, Persönlichkeits- und klinische Diagnostik) sowie Testhandbücher und Fragebögen.</li>
              <li><strong>Ausleihe:</strong> Exklusiv für Studierende des Psychologischen Instituts für Diagnostik-Seminare, Empra und Abschlussarbeiten.</li>
              <li><strong>Kontakt:</strong> Frau Marianne Beschorner (Tel: 06221 / 54-7275).</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/service/bib/",
          linkText: "Testothek Details"
        },
        {
          title: "Kostenloser Buchscanner (F015) & CIP-Pool",
          body: `<p>Praktische Tools für Seminararbeiten und Datenanalysen:</p>
            <ul>
              <li><strong>Buchaufsichtscanner:</strong> Während der Bauarbeiten in <strong>Raum F015</strong> (bei Herrn Kulczynski) aufgestellt. Buchschonendes Scannen mit automatischer Falzkorrektur – PDF-Speicherung direkt auf USB-Stick mit optionaler OCR-Texterkennung.</li>
              <li><strong>CIP-Pool & Remote Desktop:</strong> Vom heimischen Laptop aus kannst du dich per Remotedesktop auf die Institutsrechner einwählen, um Softwarelizenzen (SPSS, AMOS, RStudio) im Uni-Netzwerk zu nutzen.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/service/edv/",
          linkText: "IT-Service & Wissensdatenbank"
        },
        {
          title: "YoKI – Die universitätseigene KI (Datenschutzkonform)",
          body: `<p>Die Universität Heidelberg betreibt unter <code>yoki.urz.uni-heidelberg.de</code> eine eigene, datenschutzkonforme KI-Plattform:</p>
            <ul>
              <li><strong>Datenschutz:</strong> Deine Eingaben und Texte verlassen nicht das Heidelberger Rechenzentrum. Sie werden <em>nicht</em> zum Trainieren kommerzieller Modelle verwendet.</li>
              <li><strong>Modelle:</strong> Aktuelle Open-Source Large Language Models (u. a. Qwen 2.5 / 3) für Textüberarbeitung, Literaturzusammenfassungen und Coding.</li>
              <li><strong>Zugang:</strong> Kostenlos für alle immatrikulierten Studierenden mit Uni-ID. Voraussetzung ist eine Verbindung im Campus-Netz (eduroam) oder über Uni-VPN von zu Hause.</li>
            </ul>`,
          link: "https://yoki.urz.uni-heidelberg.de/",
          linkText: "Zu YoKI (yoki.urz.uni-heidelberg.de) ↗"
        },
        {
          title: "eduVPN & Cisco Secure Client (Netzwerkzugang von daheim)",
          body: `<p>Für den Zugriff auf Fachdatenbanken (APA PsycNet, SpringerLink, Hogrefe), YoKI und Zeitschriften-Volltexte von zu Hause benötigst du VPN:</p>
            <ul>
              <li><strong>Empfehlung des URZ:</strong> <strong>eduVPN</strong> ist der moderne, schlanke Open-Source-Client (erhältlich für macOS, Windows, iOS, Android). Einfach „Universität Heidelberg“ wählen und mit Uni-ID anmelden.</li>
              <li><strong>Alternative:</strong> Der klassische <em>Cisco Secure Client</em> über Server <code>vpn-ac.urz.uni-heidelberg.de</code>.</li>
              <li><strong>Tipp:</strong> Verbinde dein VPN, bevor du im Bibliothekskatalog HEIDI nach Fachliteratur suchst, um sofort Volltext-PDFs öffnen zu können.</li>
            </ul>`,
          link: "https://www.urz.uni-heidelberg.de/de/support/it-fuer-jede-zielgruppe/it-fuer-studierende",
          linkText: "URZ: VPN-Einrichtungsanleitung"
        },
        {
          title: "eduroam Campus-WLAN: Immer über das CAT-Tool!",
          body: `<p>Verbinde dich im WLAN niemals mit der manuellen Eingabe deines Passworts ohne Profil:</p>
            <ul>
              <li><strong>Sichere Einrichtung:</strong> Besuche <strong>cat.eduroam.org</strong> und lade das offizielle Konfigurationsprofil für dein Betriebssystem herunter.</li>
              <li><strong>Benutzername:</strong> Immer <code>&lt;Uni-ID&gt;@uni-heidelberg.de</code> (z. B. <code>ab123@uni-heidelberg.de</code> – nicht deine E-Mail-Adresse!).</li>
              <li><strong>Warum CAT?</strong> Das Profil hinterlegt das kryptografische Wurzelzertifikat der Uni, sodass niemand deine Zugangsdaten durch gefälschte Hotspots abfangen kann.</li>
            </ul>`,
          link: "https://cat.eduroam.org/",
          linkText: "cat.eduroam.org Konfigurations-Tool ↗"
        },
        {
          title: "Microsoft 365 Campus-Lizenz & Software",
          body: `<p>Über das Campusabkommen des URZ erhalten immatrikulierte Studierende kostenlose bzw. stark vergünstigte Lizenzen:</p>
            <ul>
              <li><strong>Microsoft 365:</strong> Word, Excel, PowerPoint, OneDrive und Teams für bis zu 5 Endgeräte. Registrierung erfolgt über das asknet-Studierendenportal der Uni Heidelberg.</li>
              <li><strong>Statistiksoftware:</strong> <em>R & RStudio</em> sowie <em>JASP / Jamovi</em> sind ohnehin kostenlose Open-Source-Tools. <em>SPSS</em> und <em>AMOS</em> stehen im CIP-Pool und via Remote Desktop zur Verfügung.</li>
              <li><strong>Follow-Me-Drucken:</strong> Mit deiner Campus-Card kannst du Druckaufträge online über <code>qpilot.urz.uni-heidelberg.de</code> absenden und an jedem beliebigen Multifunktionsdrucker in der UB oder am Institut abholen.</li>
            </ul>`,
          link: "https://www.urz.uni-heidelberg.de/de/service-katalog/arbeitsplatz-und-endgeraete/software-und-software-lizenzen/microsoft-campusabkommen",
          linkText: "URZ: Microsoft 365 für Studierende"
        }
      ]
    },
    {
      id: "abschluss",
      title: "Bachelorarbeit & Abschluss",
      icon: "🎓",
      desc: "Voraussetzungen, doppelte Notengewichtung (Faktor 2), Zweier-Teams und Master-Übergang.",
      items: [
        {
          title: "Die Bachelorarbeit (12 LP) – 2-fache Gewichtung!",
          body: `<p>Die Bachelorarbeit ist die zentrale Abschlussarbeit deines Studiums:</p>
            <ul>
              <li><strong>Notengewichtung:</strong> Im Gegensatz zu allen anderen Modulen zählt die Bachelorarbeit bei der Gesamtnote mit dem <strong>Faktor 2</strong>!</li>
              <li><strong>Gruppenarbeit:</strong> Nach § 16 der Prüfungsordnung kann die Bachelorarbeit auch in einer <strong>Zweiergruppe</strong> verfasst werden, wenn der individuelle Beitrag klar abgrenzbar ist.</li>
              <li><strong>Themenfindung:</strong> Themen werden in den Arbeitseinheiten (AEs) angeboten oder können im Rahmen laufender Forschungsprojekte eigeninitiativ abgesprochen werden.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/abschlussarbeiten/",
          linkText: "Prüfungsamt: Anmeldung der Bachelorarbeit"
        },
        {
          title: "Master-Übergang: M.Sc. Klinische Psychologie & M.Sc. Psychologie",
          body: `<p>In Heidelberg bestehen zwei Masterstudiengänge:</p>
            <ul>
              <li><strong>M.Sc. Klinische Psychologie und Psychotherapie:</strong> Erfordert den approbationskonformen Bachelor-Abschluss. Studierende im B.Sc. 100% nach PO 2021 mit den entsprechenden Wahlmodulen (Interdisz. Kompetenzen Schwerpunkt 2 + Verfahrenslehre + Klin. Diagnostik) erfüllen automatisch die Kriterien der Kategorie A.</li>
              <li><strong>M.Sc. Psychologie (Forschung & Schwerpunkte):</strong> Vertiefung in Kognitionspsychologie, Entwicklungspsychologie, Arbeits- und Organisationspsychologie oder Methodenlehre.</li>
            </ul>`,
          link: "https://www.psychologie.uni-heidelberg.de/studium/master/",
          linkText: "Masterangebote am Institut"
        }
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
