/* ==========================================================================
   KNOWLEDGE BASE – Single Source of Truth
   Ersti-Guide B.Sc. Psychologie (polyvalent), Universität Heidelberg, WiSe 2026/27
   --------------------------------------------------------------------------
   Alle offiziellen Regeln, Fristen, Anlaufstellen, Systeme und Lernorte.
   Schema:
     id: string (eindeutiger Bezeichner)
     title: string (Prägnanter Titel)
     summary: string (Präzise 1–3 Sätze für Quick-Info, Facts & PsyBot-Antworten)
     bodyHtml: string (Ausführliche Erklärung mit Markup für Guide-Karten)
     category: "studium" | "pruefungen" | "it" | "leben" | "orga" | "praxis"
     tags: string[] (Suchbegriffe für PsyBot und Volltextsuche)
     semesters?: number[] (Relevante Semester, z. B. [1, 2])
     track?: "all" | "polyvalent" | "psychotherapie"
     sources: [{ title: string, url: string }]
     verifiedAt: string (Datum der Faktenprüfung, z. B. "2026-10-07")
     status: "offiziell" | "eks-unterlagen" | "fachschaft" | "unbestaetigt"
   ========================================================================== */

window.ERSTI_KNOWLEDGE = [
  /* ------------------------------------------------------------------ */
  /* 1. PRÜFUNGEN, FRISTEN & STUDIENORDNUNG                             */
  /* ------------------------------------------------------------------ */
  {
    id: "orientierungspruefung",
    title: "Orientierungsprüfung (§ 3 Abs. 3 PO)",
    summary: "Im B.Sc. Psychologie müssen die Lehrveranstaltungen „Deskriptive Statistik“ (1. Sem.) UND „Inferenzstatistik“ (2. Sem.) im Pflichtmodul Methoden 1 bis zum Ende des 2. Semesters erbracht und spätestens bis zum Ende des 3. Fachsemesters bestanden sein. Bei Fristüberschreitung erlischt der Prüfungsanspruch.",
    bodyHtml: `<p>Die Orientierungsprüfung ist eine gesetzliche Kontrollprüfung in den Anfangssemestern gem. <strong>§ 3 Abs. 3 der Prüfungsordnung (PO vom 12.07.2021)</strong>:</p>
      <ul>
        <li><strong>Welche Prüfungen?</strong> Du musst die erfolgreiche Teilnahme an <strong>beiden</strong> Vorlesungen/Prüfungen des Moduls Methoden 1 nachweisen:
          <ol>
            <li><em>Deskriptive Statistik & Wahrscheinlichkeitstheorie</em> (1. Fachsemester, WiSe)</li>
            <li><em>Inferenzstatistik</em> (2. Fachsemester, SoSe)</li>
          </ol>
        </li>
        <li><strong>Bestehenskriterium:</strong> Beide schriftliche Prüfungsleistungen müssen mit mindestens <strong>„ausreichend“ (4,0)</strong> bewertet sein.</li>
        <li><strong>Fristen & Wiederholung (§ 20 Abs. 1 & 3 PO):</strong>
          <ul>
            <li>Reguläre Erbringung: bis zum Ende des 2. Semesters.</li>
            <li>Letztmögliche Frist: Wer die erfolgreiche Teilnahme nicht spätestens bis zum <strong>Ende des 3. Fachsemesters</strong> nachweisen kann, <strong>verliert den Prüfungsanspruch</strong> unwiderruflich, es sei denn, die Fristüberschreitung ist nicht selbst zu vertreten.</li>
            <li>Nicht bestandene Prüfungen können <strong>nur einmal wiederholt</strong> werden (eine zweite Wiederholung ist für die Orientierungsprüfung ausgeschlossen!). Die Wiederholung muss spätestens im folgenden Semester stattfinden.</li>
          </ul>
        </li>
      </ul>
      <div class="callout callout-alert">
        <strong>Achtung:</strong> Ältere inoffizielle Texte nannten fälschlicherweise nur Inferenzstatistik. Laut amtlicher PO vom 12.07.2021 gehören <em>Deskriptive Statistik</em> und <em>Inferenzstatistik</em> zwingend dazu!
      </div>`,
    category: "pruefungen",
    tags: ["orientierungsprüfung", "orientierung", "statistik", "deskriptive statistik", "inferenzstatistik", "fristen", "prüfungsanspruch", "klausur", "methode 1"],
    semesters: [1, 2, 3],
    track: "all",
    sources: [
      { title: "Prüfungsordnung B.Sc. Psychologie (12.07.2021) § 3 Abs. 3 & § 20", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" },
      { title: "A–Z Glossar: Orientierungsprüfung", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Orientierungsprüfung" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "krankmeldung_attest",
    title: "Krankmeldung & Attest bei Prüfungen (3-Tage-Frist)",
    summary: "Wer wegen Krankheit eine Klausur versäumt, muss unverzüglich – spätestens innerhalb von 3 Tagen – ein ärztliches Attest mit Prüfungsunfähigkeits-Formular beim Prüfungsamt einreichen (Postfach 55 oder Mail). Die Bestätigung erfolgt direkt in heiCO.",
    bodyHtml: `<p>Bei krankheitsbedingtem Versäumnis einer Prüfung gilt der offizielle Ablauf des Prüfungsamts:</p>
      <ul>
        <li><strong>Frist:</strong> Spätestens <strong>innerhalb von 3 Tagen</strong> nach dem Prüfungstermin müssen das ärztliche Attest (vom Prüfungstag) und das ausgefüllte Formular zur Prüfungsunfähigkeit eingereicht werden.</li>
        <li><strong>Einreichung:</strong>
          <ul>
            <li>Einwurf in das <strong>Postfach Nr. 55</strong> im Foyer/Gebäude des Psychologischen Instituts (Hauptstr. 47–51), oder</li>
            <li>Per E-Mail an <code>pruefungsamt@psychologie.uni-heidelberg.de</code> (Betreff: Matrikelnummer, Modul, Klausurname).</li>
          </ul>
        </li>
        <li><strong>Bestätigung:</strong> Das Prüfungsamt versendet aus Kapazitätsgründen keine manuellen Bestätigungsmails. Sobald das Attest verbucht ist, erhältst du eine Systembenachrichtigung in <strong>heiCO</strong>.</li>
      </ul>`,
    category: "pruefungen",
    tags: ["krankmeldung", "attest", "klausur krank", "prüfungsunfähig", "postfach 55", "3 tage", "heico", "prüfungsamt"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "Prüfungsamt: Allgemeine Informationen & Atteste", url: "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/" },
      { title: "A–Z Glossar: Attest", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Attest" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "wiederholung_pruefungen",
    title: "Wiederholung von Prüfungsleistungen (§ 20 PO)",
    summary: "Nicht bestandene Prüfungsleistungen können einmal wiederholt werden und müssen spätestens im folgenden Semester nachgeholt werden. Maximal zwei Prüfungen dürfen im gesamten Bachelorstudium ein zweites Mal wiederholt werden (auf Antrag).",
    bodyHtml: `<p>Die Wiederholungsregeln sind in <strong>§ 20 der Prüfungsordnung</strong> geregelt:</p>
      <ul>
        <li><strong>Erste Wiederholung:</strong> Nicht bestandene Prüfungsleistungen können einmal wiederholt werden. Die Wiederholung muss <strong>spätestens im folgenden Semester</strong> erfolgen. Bei Fristversäumnis erlischt der Prüfungsanspruch (§ 20 Abs. 3).</li>
        <li><strong>Zweite Wiederholung (Härtefall/Antrag):</strong> Eine zweite Wiederholung (also ein 3. Versuch) ist im gesamten Bachelorstudium <strong>nur bei höchstens zwei</strong> studienbegleitenden Prüfungsleistungen auf Antrag an den Prüfungsausschuss zulässig (§ 20 Abs. 1).</li>
        <li><strong>Ausnahmen:</strong> Für die Orientierungsprüfung und die Bachelorarbeit ist eine zweite Wiederholung gesetzlich ausgeschlossen!</li>
        <li><strong>Bestandene Prüfungen:</strong> Das Wiederholen einer bereits bestandenen Prüfungsleistung zur Notenverbesserung ist nicht möglich (§ 20 Abs. 2).</li>
      </ul>
      <div class="callout callout-warning">
        <strong>Wichtig zur Anmeldung:</strong> Verlasse dich nicht blind auf eine automatische Wiederanmeldung in heiCO. Prüfe zu Semesterbeginn stets deinen Prüfungsstatus in heiCO und melde dich fristgerecht an!
      </div>`,
    category: "pruefungen",
    tags: ["wiederholung", "nicht bestanden", "zweite wiederholung", "fristen", "prüfungsanspruch", "heico"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "Prüfungsordnung B.Sc. Psychologie (12.07.2021) § 20", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" },
      { title: "A–Z Glossar: Wiederholung von Prüfungen", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Wiederholung" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "anwesenheitspflicht",
    title: "Anwesenheitspflicht in Vorlesungen & Seminaren",
    summary: "In Vorlesungen herrscht grundsätzlich keine Anwesenheitspflicht. In Seminaren und Kleingruppen besteht Anwesenheitspflicht; in der Regel sind höchstens zwei Fehltermine pro Semester zulässig.",
    bodyHtml: `<p>Regelungen zur Teilnahme laut A–Z Glossar des Instituts:</p>
      <ul>
        <li><strong>Vorlesungen:</strong> Grundsätzlich <strong>keine Anwesenheitspflicht</strong>. Das Selbststudium anhand von Folien, Moodle-Materialien und Lehrbüchern liegt in deiner Verantwortung.</li>
        <li><strong>Seminare & Übungen:</strong> Hier herrscht grundsätzlich <strong>Anwesenheitspflicht</strong>. Pro Semester sind in der Regel <strong>höchstens zwei Fehltermine</strong> (z. B. wegen Krankheit) gestattet.</li>
        <li><strong>Mehr als zwei Fehltermine:</strong> Bei mehr als zwei versäumten Terminen muss rechtzeitig Rücksprache mit der Lehrperson gehalten werden (ggf. Kompensationsleistung). Andernfalls kann die Studienleistung nicht anerkannt werden.</li>
      </ul>`,
    category: "studium",
    tags: ["anwesenheitspflicht", "anwesenheit", "fehltage", "seminare", "vorlesung", "fehltermine"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Anwesenheitspflicht", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Anwesenheitspflicht" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "pruefungszeitraum",
    title: "Prüfungszeitraum & Klausurphasen",
    summary: "Abschlussklausuren finden typischerweise in der letzten Woche der Vorlesungszeit und in den ersten zwei Wochen der vorlesungsfreien Zeit statt. Genaue Termine werden in heiCO und in den ersten Vorlesungswochen bekanntgegeben.",
    bodyHtml: `<p>Klausurorganisation am Psychologischen Institut:</p>
      <ul>
        <li><strong>Klausurenphase WiSe 2026/27:</strong> Beginnt in der letzten Vorlesungswoche (Anfang Februar 2027) und erstreckt sich über die ersten beiden Wochen der vorlesungsfreien Zeit (bis ca. 19. Februar 2027).</li>
        <li><strong>Anmeldung:</strong> Zu Klausuren meldest du dich über das <strong>heiCO-Portal</strong> an. Beachte die von den Dozierenden genannten An- und Abmeldefristen.</li>
        <li><strong>Nachholklausuren:</strong> Finden meist am Ende der vorlesungsfreien Zeit oder zu Beginn des Folgesemesters statt.</li>
      </ul>`,
    category: "pruefungen",
    tags: ["prüfungszeitraum", "klausurenphase", "klausurtermine", "heico anmeldung"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Anmeldung zu den Klausuren", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#anmeldung-zu-den-klausuren-vorlesungen" },
      { title: "Semestertermine Universität Heidelberg", url: "https://www.uni-heidelberg.de/de/studium/studienorganisation/termine-und-fristen" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "maximalstudiendauer",
    title: "Regelstudienzeit & Maximalstudiendauer (§ 3 PO)",
    summary: "Die Regelstudienzeit beträgt 6 Semester (180 LP). Die Maximalstudiendauer liegt bei 10 Fachsemestern (§ 3 Abs. 6 PO: Regelstudienzeit + 4 Semester). Wer die Bachelorprüfung bis dahin nicht vollständig abgelegt hat, verliert den Prüfungsanspruch.",
    bodyHtml: `<p>Rahmenzeiten des Bachelorstudiengangs nach <strong>§ 3 der Prüfungsordnung</strong>:</p>
      <ul>
        <li><strong>Regelstudienzeit:</strong> 6 Semester einschließlich Prüfungen und Bachelorarbeit (180 LP, durchschnittlich 30 LP/Semester).</li>
        <li><strong>Verlängerungsmöglichkeiten:</strong> Das Institut stellt offizielle Studienpläne für 6, 8 und 10 Semester bereit (z. B. zur Vereinbarkeit mit Erwerbstätigkeit oder Betreuungsaufgaben).</li>
        <li><strong>Ausschlussfrist (§ 3 Abs. 6 PO):</strong> Wird die Bachelorprüfung nicht spätestens <strong>vier Semester nach Ablauf der Regelstudienzeit</strong> (also nach dem 10. Fachsemester) vollständig abgelegt, erlischt der Prüfungsanspruch, es sei denn, die Fristüberschreitung ist nicht selbst zu vertreten.</li>
      </ul>`,
    category: "studium",
    tags: ["maximalstudiendauer", "regelstudienzeit", "10 semester", "6 semester", "studienplan", "fristen"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "Prüfungsordnung B.Sc. Psychologie (12.07.2021) § 3 Abs. 1 & 6", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "teilzeitstudium",
    title: "Teilzeitstudium (§ 3 Abs. 1a PO)",
    summary: "Ein Teilzeitstudium kann auf Antrag beim Studierendensekretariat genehmigt werden. Es können maximal 36 LP pro Studienjahr erworben werden. Achtung: Im Teilzeitstudium besteht kein BAföG-Anspruch!",
    bodyHtml: `<p>Regelungen zum Teilzeitstudium gem. § 3 Abs. 1a PO und universitäter Teilzeitordnung:</p>
      <ul>
        <li><strong>Antrag:</strong> Schriftlich vor Semesterbeginn bei der Studierendenadministration mit begründetem Studienverlaufsplan.</li>
        <li><strong>Umfang:</strong> Pro Studienjahr (2 Semester) dürfen maximal <strong>36 Leistungspunkte (LP)</strong> erworben werden. Ein Teilzeitjahr zählt als 1 Fachsemester, aber 2 Hochschulsemester.</li>
        <li><strong>Wichtige Konsequenz:</strong> Während eines genehmigten Teilzeitstudiums besteht <strong>kein Anspruch auf BAföG-Förderung</strong>!</li>
      </ul>`,
    category: "studium",
    tags: ["teilzeit", "teilzeitstudium", "bafoeg", "36 lp", "studienplan", "studierendenadministration"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "Prüfungsordnung B.Sc. Psychologie (12.07.2021) § 3 Abs. 1a", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" },
      { title: "A–Z Glossar: Teilzeitstudium", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#teilzeitstudium" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "freie_spitze",
    title: "Freie Spitze / Interdisziplinäre Studien (Modul IS, 4 LP)",
    summary: "4 LP im Modul Interdisziplinäre Studien: Es müssen zwei Veranstaltungen à 2 LP (jeweils mind. 2 SWS) außerhalb der Psychologie belegt werden. Sprachkurse sind ausgeschlossen. Veranstaltungen an Uni Heidelberg, Uni Mannheim und PH Heidelberg sind anrechenbar.",
    bodyHtml: `<p>Die „Freie Spitze“ (Modul Interdisziplinäre Studien, 4 LP) im 6. Fachsemester:</p>
      <ul>
        <li><strong>Umfang:</strong> 2 Veranstaltungen mit jeweils mind. <strong>2 SWS</strong> und mind. <strong>2 LP</strong>.</li>
        <li><strong>Welche Fächer?</strong> Alle universitären Fächer außerhalb der Psychologie. Veranstaltungen an der <strong>Universität Heidelberg, Universität Mannheim und PH Heidelberg</strong> werden problemlos anerkannt.</li>
        <li><strong>Ausschlüsse:</strong> Sprachkurse dürfen laut Fachprüfungsausschuss <strong>nicht</strong> für die Freie Spitze angerechnet werden!</li>
        <li><strong>Prüfungsform:</strong> In der Regel genügt der Nachweis der regelmäßigen Teilnahme (unbenotet).</li>
        <li><strong>Nachweis:</strong> Formular <em>Teilnahmebescheinigung „Freie Spitze“</em> von der Institutswebsite ausfüllen, von der Lehrperson unterschreiben lassen und am Semesterende im Prüfungsamt einreichen.</li>
      </ul>`,
    category: "studium",
    tags: ["freie spitze", "interdisziplinäre studien", "is", "4 lp", "sprachkurse", "anerkennung", "mannheim", "ph heidelberg"],
    semesters: [5, 6],
    track: "all",
    sources: [
      { title: "Modulhandbuch B.Sc. Psychologie S. 50", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" },
      { title: "A–Z Glossar: Freie Spitze", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#freie-spitze" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "arbeiten_studium",
    title: "Arbeiten während des Studiums (20-Stunden-Regel)",
    summary: "Studierende dürfen während der Vorlesungszeit neben dem Studium bis zu 20 Stunden pro Woche arbeiten. Mehr als 20 Wochenstunden müssen von der Studierendenadministration genehmigt werden.",
    bodyHtml: `<p>Richtlinien zur Erwerbstätigkeit laut A–Z Glossar:</p>
      <ul>
        <li><strong>Regelgrenze:</strong> Bis zu <strong>20 Stunden pro Woche</strong> während der Vorlesungszeit sind ohne gesonderte universitäre Genehmigung zulässig (Werkstudentenprivileg).</li>
        <li><strong>Mehr als 20 Stunden:</strong> Müssen von der Studierendenadministration genehmigt werden. Kurze Phasen (z. B. in den Semesterferien) sind hiervon ausgenommen – hier reicht eine Bescheinigung des Arbeitgebers.</li>
        <li><strong>Hiwi-Jobs:</strong> Forschungspraktische Erfahrungen an den Arbeitseinheiten des Psychologischen Instituts bieten ideale Einblicke in Forschung und Lehre.</li>
      </ul>`,
    category: "leben",
    tags: ["arbeiten", "nebenjob", "werkstudent", "20 stunden", "hiwi", "studienfinanzierung"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Arbeiten während des Studiums", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#arbeiten-waehrend-des-studiums" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "bachelorarbeit",
    title: "Bachelorarbeit (§ 17 & 18 PO)",
    summary: "12 LP, 20 Wochen Bearbeitungszeit. Zählt mit doppelter Gewichtung (Faktor 2) in die Gesamtnote! Sprache: Deutsch oder Englisch (§ 17 Abs. 5 PO). Zweiergruppen sind zulässig (§ 16 PO). Die Themenstellung ist in beiden Studienrichtungen frei wählbar.",
    bodyHtml: `<p>Vorgaben für die Bachelorarbeit:</p>
      <ul>
        <li><strong>Umfang & Gewichtung:</strong> 12 LP. Das Modul geht mit <strong>doppelter Gewichtung (Faktor 2)</strong> in die Bachelor-Gesamtnote ein!</li>
        <li><strong>Bearbeitungszeit:</strong> 20 Wochen ab Themenausgabe. Im Teilzeitstudium verlängerbar.</li>
        <li><strong>Sprache:</strong> Die Bachelorarbeit kann wahlweise auf <strong>Deutsch oder Englisch</strong> verfasst werden (§ 17 Abs. 5 PO).</li>
        <li><strong>Gruppenarbeit:</strong> Gemäß § 16 PO darf die Bachelorarbeit auch als <strong>Zweiergruppe</strong> angefertigt werden, sofern die individuellen Beiträge klar abgegrenzt und bewertbar sind.</li>
        <li><strong>Themenwahl auf beiden Tracks:</strong> Das Thema ist frei wählbar. Auch Studierende im approbationsrelevanten Track können ihre Abschlussarbeit außerhalb der Klinischen Psychologie (z. B. Kognition, Sozial- oder Entwicklungspsychologie) schreiben!</li>
      </ul>`,
    category: "studium",
    tags: ["bachelorarbeit", "faktor 2", "abschlussnote", "englisch", "deutsch", "zweiergruppe", "po § 17", "thesis"],
    semesters: [6],
    track: "all",
    sources: [
      { title: "Prüfungsordnung B.Sc. Psychologie (12.07.2021) §§ 16–18", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" },
      { title: "A–Z Glossar: Bachelorarbeit", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#bachelorarbeit" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  /* ------------------------------------------------------------------ */
  /* 2. PRAKTIKA & WEG ZUR PSYCHOTHERAPIE (APPROBATION)                 */
  /* ------------------------------------------------------------------ */
  {
    id: "praktika_ueberblick",
    title: "Pflichtpraktika: Orientierungs- & Berufspraktikum",
    summary: "Zwei Pflichtpraktika: Orientierungspraktikum (4 Wochen / 150 Std., 5 LP, ab 1. Sem.) und Berufspraktikum BQT I (6 Wochen / 240 Std., 8 LP, frühestens nach 60 LP). Für den Psychotherapie-Weg müssen beide Praktika den Vorgaben der PsychThApprO §§ 14 & 15 entsprechen.",
    bodyHtml: `<p>Die zwei verpflichtenden Praktika im polyvalenten B.Sc. Psychologie:</p>
      <ul>
        <li><strong>1. Orientierungspraktikum (OP, 5 LP):</strong>
          <ul>
            <li>Dauer: 4 Wochen Vollzeit bzw. <strong>150 Arbeitsstunden</strong>.</li>
            <li>Zeitpunkt: Empfohlen zwischen dem 1. und 2. Semester oder in der vorlesungsfreien Zeit. Vor Studienbeginn erbrachte Praktika können auf Antrag angerechnet werden.</li>
            <li>Für Psychotherapie: Erfüllung der Vorgaben nach <strong>§ 14 PsychThApprO</strong> (interdisziplinäre Einrichtungen der Gesundheitsversorgung).</li>
          </ul>
        </li>
        <li><strong>2. Berufspraktikum / BQT I (8 LP):</strong>
          <ul>
            <li>Dauer: 6 Wochen Vollzeit bzw. <strong>240 Arbeitsstunden</strong>.</li>
            <li>Voraussetzung: Frühestens nach Erreichen von <strong>mindestens 60 LP</strong> (gem. § 3 Abs. 4 PO).</li>
            <li>Für Psychotherapie: Berufsqualifizierende Tätigkeit I (BQT I) nach <strong>§ 15 PsychThApprO</strong> in klinischen/psychotherapeutischen Einrichtungen.</li>
          </ul>
        </li>
        <li><strong>Checklisten & Formulare:</strong> Die offiziellen Bestätigungsformulare und Prüfkriterien der Fachstudienberatung liegen im zentralen heiBOX-Ordner.</li>
        <li><strong>Zuständigkeit für Anerkennung:</strong> Fachstudienberaterin Stefanie Glawe.</li>
      </ul>`,
    category: "praxis",
    tags: ["praktikum", "orientierungspraktikum", "berufspraktikum", "bqt i", "psychthappro", "150 stunden", "240 stunden", "glawe", "checkliste"],
    semesters: [1, 2, 3, 4, 5],
    track: "all",
    sources: [
      { title: "Checklisten Pflichtpraktika (heiBOX Ordner)", url: "https://heibox.uni-heidelberg.de/d/7dc87b81907742e5b557/" },
      { title: "Institutsseite Praktika B.Sc.", url: "https://www.psychologie.uni-heidelberg.de/studium/praktikum/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "master_studiengaenge",
    title: "Masterstudiengänge am Institut: KliPP & PFA",
    summary: "Das Institut bietet zwei konsekutive Master an: M.Sc. Klinische Psychologie und Psychotherapie (KliPP, approbationskonform) und M.Sc. Psychologie: Forschung und Anwendung (PFA). Beide Studiengänge starteten im WiSe 2023/24.",
    bodyHtml: `<p>Die beiden Master-Optionen an der Universität Heidelberg:</p>
      <ul>
        <li><strong>M.Sc. Klinische Psychologie und Psychotherapie (KliPP):</strong>
          <ul>
            <li>Berechtigt nach Abschluss zur staatlichen psychotherapeutischen Prüfung zur Approbation (PsychThG / PsychThApprO).</li>
            <li>Voraussetzung: Vollständig approbationskonformer B.Sc. (polyvalent) mit den erforderlichen klinischen Bausteinen (Interdisz. Kompetenzen Schwerpunkt 2, AOV 1 & 2 Option C, klinisches BQT I).</li>
          </ul>
        </li>
        <li><strong>M.Sc. Psychologie: Forschung und Anwendung (PFA):</strong>
          <ul>
            <li>Fokussiert auf kognitive, neurowissenschaftliche, organisationale und entwicklungspsychologische Spitzenforschung und angewandte Berufsfelder.</li>
            <li>Offen für alle Absolvent:innen des allgemeinen und des polyvalenten B.Sc. Psychologie.</li>
          </ul>
        </li>
      </ul>`,
    category: "studium",
    tags: ["master", "klipp", "pfa", "psychotherapie master", "approbation", "forschung und anwendung"],
    semesters: [4, 5, 6],
    track: "all",
    sources: [
      { title: "Master Aufbau & Studiengänge PI", url: "https://www.psychologie.uni-heidelberg.de/studium/bachelor/faq/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  /* ------------------------------------------------------------------ */
  /* 3. LERNORTE, BIBLIOTHEK & GEBÄUDE                                   */
  /* ------------------------------------------------------------------ */
  {
    id: "lernplaetze_bibliothek",
    title: "Lernplätze & Status der Institutsbibliothek",
    summary: "Die Institutsbibliothek ist seit WS 2023/24 wegen Bauarbeiten geschlossen. Im Institut stehen alternative Lernbereiche zur Verfügung (Aufenthaltsraum Keller Hintergebäude, Studierenden-Ecke 1. OG Vordergebäude, freie Übungsräume). Ab WS 2026/27 richtet die UB temporäre Arbeitsplätze im Bibliotheksraum ein (Campus-Card-Zugang).",
    bodyHtml: `<p>Aktueller Status der Bibliotheks- und Arbeitsräume:</p>
      <ul>
        <li><strong>Institutsbibliothek:</strong> Seit dem Wintersemester 2023/24 wegen umfassender Brandschutz- und Sanierungsarbeiten <strong>geschlossen</strong>. Der Buchbestand (ca. 6.000 Monografien) ist derzeit magaziniert und nicht zugänglich.</li>
        <li><strong>Neue UB-Arbeitsplätze im Institut:</strong> Da die Universitätsbibliothek Plöck wegen Wasserschadens zusätzlichen Platzbedarf hat, wird der große Bibliotheksraum renoviert und ab dem <strong>WiSe 2026/27 als öffentlicher UB-Lernbereich</strong> mit WLAN bereitgestellt. Der Zugang erfolgt über die Tür von der Hauptstraße mit der elektronischen Campus-Card.</li>
        <li><strong>Offizielle Arbeits- und Ruheräume im Institut (A–Z):</strong>
          <ul>
            <li><strong>Aufenthaltsraum für Studierende:</strong> Im Keller des Hintergebäudes (gemütliche Sitzecken).</li>
            <li><strong>Studierenden-Ecke:</strong> Im 1. OG des Vordergebäudes unter der Treppe zum 2. OG.</li>
            <li><strong>Übungsräume:</strong> Sofern sie geöffnet und nicht durch Lehrveranstaltungen belegt sind.</li>
          </ul>
        </li>
        <li><strong>Universitätsbibliothek (UB Plöck):</strong> Großer Lesesaal, Triplex-Bereich und buchbare Einzelarbeitskabinen („Carrels“) für konzentriertes Arbeiten.</li>
      </ul>`,
    category: "leben",
    tags: ["bibliothek", "lernplätze", "institutsbibliothek", "arbeitsräume", "carrels", "ub plöck", "geschlossen", "campus card"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Arbeitsräume & Bibliothek", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Arbeitsräume" },
      { title: "Institutsseite Bibliothek & Umbau-News", url: "https://www.psychologie.uni-heidelberg.de/bibliothek/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "testothek_scanner",
    title: "Testothek & Buchaufsichtscanner",
    summary: "Testothek: Raum 019–021 (Vordergebäude Zwischengeschoss, Marianne Beschorner, Tel. 54-7275) mit über 1.000 Testverfahren für Lehre und Forschung. Buchaufsichtscanner: Kostenlos in Raum F015 (Herr Kulczynski, Buchfalz-Korrektur, Speichern auf USB-Stick).",
    bodyHtml: `<p>Spezifische Infrastruktur am Psychologischen Institut:</p>
      <ul>
        <li><strong>Testothek (Raum 019–021, Vordergebäude Zwischengeschoss):</strong>
          <ul>
            <li>Enthält über 1.000 psychologische Testverfahren, Fragebögen und Testhandbücher.</li>
            <li>Ausleihe für Studierende und Lehrende des Instituts während der Öffnungszeiten (Mo–Fr feste Sprechstunden).</li>
            <li>Ansprechpartnerin: Frau Marianne Beschorner (<code>marianne.beschorner@psychologie.uni-heidelberg.de</code>, Tel. +49 6221 54-7275).</li>
          </ul>
        </li>
        <li><strong>Buchaufsichtscanner (Raum F015):</strong>
          <ul>
            <li>Wegen Bauarbeiten aufgestellt im Zimmer von Peter Kulczynski (Raum F015, Nähe Testothek).</li>
            <li>Schonendes Scannen mit automatischer Buchfalz-Korrektur und Schräglagen-Ausgleich.</li>
            <li>Erstellt durchsuchbare PDFs direkt auf einen mitgebrachten USB-Stick. Kostenlose Nutzung für Institutsstudierende.</li>
          </ul>
        </li>
      </ul>`,
    category: "it",
    tags: ["testothek", "scanner", "buchscanner", "f015", "019-021", "beschorner", "kulczynski", "testverfahren"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "Institutsseite Testothek & Buchscanner", url: "https://www.psychologie.uni-heidelberg.de/bibliothek/" },
      { title: "A–Z Glossar: Testothek", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Testothek" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "erste_hilfe_f017",
    title: "Erste-Hilfe-Zimmer & Ruheraum (Raum F017)",
    summary: "Das 1.-Hilfe-Zimmer befindet sich in Raum F017 (Vordergebäude, schräg gegenüber vom Aufzug) und ist mit einer Liege ausgestattet. Der Schlüssel ist im Verwaltungssekretariat (Annemarie Preuschoff) erhältlich.",
    bodyHtml: `<p>Für Notfälle und gesundheitliche Ruhepausen im Institut:</p>
      <ul>
        <li><strong>Ort:</strong> Raum <strong>F017</strong> im Friedrichsbau (Vordergebäude, schräg gegenüber vom Fahrstuhl).</li>
        <li><strong>Ausstattung:</strong> Medizinische Notfallausstattung, Verbandskasten und Ruheliege.</li>
        <li><strong>Zugang:</strong> Der Schlüssel kann im <strong>Verwaltungssekretariat</strong> (Frau Preuschoff, Vordergebäude) abgeholt werden.</li>
        <li><strong>Ersthelfer:innen:</strong> Mehrere Institutsmitarbeiter:innen (u. a. Stefanie Glawe, Peter Kulczynski, Reiner Meßner) sind ausgebildete betriebliche Ersthelfer:innen.</li>
      </ul>`,
    category: "leben",
    tags: ["erste hilfe", "ruheraum", "f017", "liege", "notfall", "preuschoff", "schlüssel"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Erste Hilfe / Notfall", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#F017" },
      { title: "Personalfunktionen Erste Hilfe PI", url: "https://www.psychologie.uni-heidelberg.de/funktion/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "gebaeude_raumcodes",
    title: "Gebäudestruktur & Raumbezeichnungen (F, A, P)",
    summary: "Die Raumcodes des Psychologischen Instituts nutzen Gebäudekennungen: F = Friedrichsbau (Hauptstr. 47–51), A = Alte Anatomie (Hauptstr. 47–51), P = Pavillon (Akademiestr. 3 / Garten).",
    bodyHtml: `<p>Systematik der Raumbezeichnungen am Psychologischen Institut:</p>
      <ul>
        <li><strong>F... = Friedrichsbau (Hauptstraße 47–51):</strong>
          <ul>
            <li>Vordergebäude (Straßenseite): u. a. Dekanat, Testothek (019–021), Buchscanner (F015), Erste Hilfe (F017).</li>
            <li>Hintergebäude (Gartenseite): u. a. Hörsaal II (EG), Hörsaal I (1. OG), Prüfungsamt (F042), Fachschaftskeller (UG).</li>
          </ul>
        </li>
        <li><strong>A... = Alte Anatomie:</strong>
          <ul>
            <li>Angrenzendes historisches Universitätsgebäude. Z. B. Übungsraum A102 (1. OG).</li>
          </ul>
        </li>
        <li><strong>P... = Pavillon (Akademiestraße 3):</strong>
          <ul>
            <li>Freistehendes Institutsgebäude im Anatomiegarten mit Seminarräumen und Büros.</li>
          </ul>
        </li>
      </ul>`,
    category: "orga",
    tags: ["gebäude", "raumcodes", "friedrichsbau", "alte anatomie", "pavillon", "f042", "orientierung"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Gebäude des Instituts", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Gebäude" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "oeffnungszeiten_institut",
    title: "Öffnungs- und Schließzeiten des Instituts",
    summary: "Vorlesungszeit: Mo–Do 8:00–20:00 Uhr, Fr 8:00–19:00 Uhr. Vorlesungsfreie Zeit: Mo–Fr 8:00–19:00 Uhr. Zwischen 24.12. und 06.01. ist das Institut komplett geschlossen.",
    bodyHtml: `<p>Gebäudeöffnungszeiten (Hauptstraße 47–51):</p>
      <ul>
        <li><strong>Vorlesungszeit:</strong>
          <ul>
            <li>Montag bis Donnerstag: <strong>08:00 – 20:00 Uhr</strong></li>
            <li>Freitag: <strong>08:00 – 19:00 Uhr</strong></li>
          </ul>
        </li>
        <li><strong>Vorlesungsfreie Zeit:</strong>
          <ul>
            <li>Montag bis Freitag: <strong>08:00 – 19:00 Uhr</strong></li>
          </ul>
        </li>
        <li><strong>Feste Schließzeiten:</strong> Über die Weihnachts- und Neujahrsfeiertage (vom <strong>24. Dezember bis 06. Januar</strong>) ist das Institut ausnahmslos geschlossen.</li>
      </ul>`,
    category: "orga",
    tags: ["öffnungszeiten", "schließzeiten", "gebäude", "weihnachten", "institut zu"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "Prüfungsamt & Institut Öffnungszeiten", url: "https://www.psychologie.uni-heidelberg.de/studium/pruefungsamt/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  /* ------------------------------------------------------------------ */
  /* 4. IT, DIGITALE SYSTEME & DATENSCHUTZ                              */
  /* ------------------------------------------------------------------ */
  {
    id: "it_yoki_ki",
    title: "YoKI – Universitäre KI-Plattform der Uni Heidelberg",
    summary: "YoKI (yoki.urz.uni-heidelberg.de) ist die datenschutzkonforme KI-Plattform der Universität Heidelberg auf eigenen Servern des Universitätsrechenzentrums (URZ). Kostenlos und ohne Datenweitergabe nutzbar für alle Studierenden im eduroam oder Uni-VPN.",
    bodyHtml: `<p>Die universitäre KI für Studium und Forschung:</p>
      <ul>
        <li><strong>Plattform:</strong> Unter <strong><a href="https://yoki.urz.uni-heidelberg.de/" target="_blank" rel="noopener">yoki.urz.uni-heidelberg.de</a></strong> stellt das URZ eine sichere Weboberfläche bereit.</li>
        <li><strong>Datenschutz & DSGVO:</strong> Alle Anfragen verbleiben auf den gesicherten Rechenclustern der Universität Heidelberg in Deutschland. Keine Datenweitergabe an externe Konzerne, keine Nutzung für Modelltraining.</li>
        <li><strong>Zugang:</strong> Kostenfrei für alle immatrikulierten Studierenden mit Uni-ID. Erreichbar aus dem Campus-Netz (eduroam) oder über das Universitäts-VPN von zu Hause.</li>
      </ul>`,
    category: "it",
    tags: ["yoki", "ki", "künstliche intelligenz", "urz", "datenschutz", "dsgvo", "uni-ki"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "YoKI Plattform URZ Heidelberg", url: "https://yoki.urz.uni-heidelberg.de/" },
      { title: "URZ IT für Studierende", url: "https://www.urz.uni-heidelberg.de/de/support/it-fuer-jede-zielgruppe/it-fuer-studierende" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "drucken_campuscard",
    title: "Drucken & Kopieren mit der Campus-Card (Ricoh myPrint)",
    summary: "Drucken an allen öffentlichen Multifunktionsgeräten der Universität über das Ricoh Pull-Print-System. Aufträge per Webportal oder Mail an mailprint@uni-heidelberg.de senden und mit der Campus-Card am Gerät freigeben. (Hinweis: Das alte qpilot-System existiert nicht mehr).",
    bodyHtml: `<p>Zentraler Druckservice des Universitätsrechenzentrums:</p>
      <ul>
        <li><strong>Ricoh Pull-Print:</strong> Standortunabhängiges Drucken an allen Geräten der Universitätsbibliothek und der Institute.</li>
        <li><strong>Ablauf:</strong>
          <ol>
            <li>Druckdatei über das Webportal <em>Ricoh myPrint</em> hochladen oder per E-Mail an <code>mailprint@uni-heidelberg.de</code> senden (PIN-Code per Rückmail).</li>
            <li>An einem beliebigen Campus-Drucker mit der <strong>Campus-Card</strong> oder Uni-ID anmelden.</li>
            <li>Druckauftrag auswählen, freigeben und kontaktlos per Campus-Card bezahlen.</li>
          </ol>
        </li>
      </ul>`,
    category: "it",
    tags: ["drucken", "kopieren", "ricoh", "myprint", "campus card", "pull-print", "urz"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "URZ Öffentliche Drucker & Kopierer", url: "https://www.urz.uni-heidelberg.de/de/service-katalog/drucken/oeffentliche-drucker-und-kopierer" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "cip_pool_aufgeloest",
    title: "Auflösung der CIP-Pools am Institut",
    summary: "Die früheren stationären CIP-Pools (Computer-Arbeitsräume) am Psychologischen Institut wurden offiziell aufgelöst. Für computergestützte Übungen (R, RStudio, SPSS) nutzen Studierende ihre eigenen Laptops; Softwarelizenzen stellt das URZ bereit.",
    bodyHtml: `<p>Aktueller Status der Computerarbeitsplätze am Institut laut A–Z Glossar:</p>
      <ul>
        <li><strong>Status:</strong> Die historischen CIP-Pools wurden aufgelöst, da die Hardware veraltet war und heute alle Studierenden über eigene Laptops verfügen.</li>
        <li><strong>Statistik-Software:</strong> R und RStudio sind freie Open-Source-Software und werden im 1. und 2. Semester lokal auf dem eigenen Rechner installiert.</li>
        <li><strong>Lizenzen & Software:</strong> Campuslizenzen (u. a. Microsoft 365, SPSS) können über das Serviceportal des URZ bezogen werden.</li>
      </ul>`,
    category: "it",
    tags: ["cip-pool", "pc-raum", "computer", "aufgelöst", "r", "rstudio", "spss"],
    semesters: [1, 2],
    track: "all",
    sources: [
      { title: "A–Z Glossar: CIP-Pool", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#cip-pool" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "vpn_eduvpn",
    title: "Uni-VPN & Netzwerkzugang von zu Hause",
    summary: "Zugriff auf Fachliteratur, Datenbanken und interne Uni-Dienste von zu Hause über eduVPN oder Cisco Secure Client. VPN-Zettel für Vpn-Versuchspersonen liegen Mo/Di/Do/Fr vor Raum F042 aus.",
    bodyHtml: `<p>Sicherer Fernzugriff auf das Heidelberger Universitätsnetz:</p>
      <ul>
        <li><strong>Empfohlener Client:</strong> Das URZ empfiehlt <strong>eduVPN</strong> (kostenlos für Windows, macOS, Linux, iOS, Android über <code>eduvpn.org</code>).</li>
        <li><strong>Alternative:</strong> <em>Cisco Secure Client</em> über das Webportal <code>vpn-ac.urz.uni-heidelberg.de</code>.</li>
        <li><strong>Nutzen:</strong> Zugriff auf elektronische Zeitschriften, lizenzierte Volltexte der UB, PsycINFO, Web of Science und interne Dienste von außerhalb des Campus.</li>
      </ul>`,
    category: "it",
    tags: ["vpn", "eduvpn", "cisco", "netzwerk", "urz", "zeitschriften", "heimarbeit"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "URZ VPN-Zugang für Studierende", url: "https://www.urz.uni-heidelberg.de/de/support/it-fuer-jede-zielgruppe/it-fuer-studierende" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  /* ------------------------------------------------------------------ */
  /* 5. MENTORING, COMMUNITY & VERANSTALTUNGEN                          */
  /* ------------------------------------------------------------------ */
  {
    id: "comenius_mentoring",
    title: "Comenius-Programm (Peer-Mentoring für Erstsemester)",
    summary: "Freiwilliges Peer-Mentoring im 1. Semester: Erstsemester werden in Kleingruppen à 5–8 Studierende von Studierenden höherer Semester begleitet. Bietet Lernhilfen, Vernetzung und Orientierung im Universitätsalltag. Kontakt: comenius@uni-hd.de.",
    bodyHtml: `<p>Peer-Mentoring am Psychologischen Institut (A–Z Glossar):</p>
      <ul>
        <li><strong>Konzept:</strong> Basiert auf Peer-Learning: Erfahrene Psychologiestudierende höherer Fachsemester begleiten Erstis über das gesamte Wintersemester.</li>
        <li><strong>Gruppengröße:</strong> Feste Kleingruppen von <strong>5 bis 8 Studierenden</strong> (beantwortet die offene Frage nach der Gruppengröße!).</li>
        <li><strong>Inhalte:</strong> Unterstützung bei der Bewältigung des Studiums, Lernstrategien, Prüfungsvorbereitung und Aufbau sozialer Netzwerke.</li>
        <li><strong>Anmeldung & Kontakt:</strong> Die Vorstellung erfolgt in der EKS-Woche. Fragen per Mail an <code>comenius@uni-hd.de</code>.</li>
      </ul>`,
    category: "leben",
    tags: ["comenius", "mentoring", "peer-learning", "kleingruppen", "5-8 studierende", "erstsemester"],
    semesters: [1],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Comenius-Programm", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#comenius-programm" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  {
    id: "fachschaft_psychologie",
    title: "Fachschaft Psychologie & Wöchentliche Sitzung",
    summary: "Die Studierendenvertretung der Fachschaft vertritt deine Interessen im Fakultäts- und Fachrat, organisiert das Ersti-Wochenende, Psychopartys und Spieleabende. Treffen: Jeden Montag um 18:00 Uhr im Fachschaftskeller (Hauptstr. 47, Hintergebäude UG).",
    bodyHtml: `<p>Studentische Mitbestimmung und Gemeinschaft am Institut:</p>
      <ul>
        <li><strong>Wer wir sind:</strong> Die Gruppe der aktiven Studierenden aller Semester. Jede:r kann mitmachen!</li>
        <li><strong>Wöchentliche Sitzung:</strong> <strong>Jeden Montag um 18:00 Uhr im Fachschaftskeller</strong> (Hauptstraße 47–51, Keller des Hintergebäudes).</li>
        <li><strong>Aktivitäten:</strong> Ersti-Wochenende auf der Hütte, Kneipentouren, Psychoparty, Winterball, Beratung bei Studienproblemen.</li>
        <li><strong>Kontakt:</strong> <code>fachschaft@psychologie.uni-heidelberg.de</code> oder direkt im Fachschaftskeller.</li>
      </ul>`,
    category: "leben",
    tags: ["fachschaft", "fachschaftskeller", "sitzung montag", "18 uhr", "ersti-wochenende", "psychoparty", "engagement"],
    semesters: [1, 2, 3, 4, 5, 6],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Fachschaft & Fachschaftskeller", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#Fachschaft" },
      { title: "Fachschaftsseite Psychologie Heidelberg", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/fachschaft" }
    ],
    verifiedAt: "2026-10-07",
    status: "fachschaft"
  },

  {
    id: "empra_poster_kongress",
    title: "Empra-Poster-Kongress (13.10.2026)",
    summary: "Der alljährliche wissenschaftliche Poster-Kongress des Empirischen Projektseminars (Methoden 3) findet am Dienstagnachmittag der ersten Vorlesungswoche (13.10.2026 ab 14:00 Uhr) im Hörsaal II und Foyer statt.",
    bodyHtml: `<p>Wissenschaftlicher Höhepunkt des Methoden-3-Moduls:</p>
      <ul>
        <li><strong>Termin WiSe 2026/27:</strong> <strong>Dienstag, 13. Oktober 2026 ab 14:00 Uhr</strong> im Foyer und Hörsaal II.</li>
        <li><strong>Wer stellt aus?</strong> Die Studierenden des 4./5. Fachsemesters präsentieren die Ergebnisse ihrer empirischen Studien auf wissenschaftlichen Postern im Kongressformat.</li>
        <li><strong>Für Erstis:</strong> Eine ideale Gelegenheit, die Forschungsmethoden und Arbeitseinheiten kennenzulernen und mit höheren Semestern ins Gespräch zu kommen!</li>
      </ul>`,
    category: "studium",
    tags: ["empra", "poster-kongress", "methoden 3", "13. oktober", "foyer", "forschungspräsentation"],
    semesters: [1, 3, 4, 5],
    track: "all",
    sources: [
      { title: "A–Z Glossar: Empirisches Praktikum – Kongress", url: "https://www.psychologie.uni-heidelberg.de/studium/a-z/#empirisches-praktikum-kongress" },
      { title: "EKS-Wochenplan 2026", url: "https://heibox.uni-heidelberg.de/d/888790bfb3c64870b7da/" }
    ],
    verifiedAt: "2026-10-07",
    status: "offiziell"
  },

  /* ------------------------------------------------------------------ */
  /* 6. PENDENZEN & UNBESTÄTIGTE ANGABEN                                */
  /* ------------------------------------------------------------------ */
  {
    id: "automatische_pruefungsanmeldung",
    title: "Automatische Wiederanmeldung zu Nachholklausuren",
    summary: "In manchen Erstsemester-Informationen wird behauptet, das Prüfungsamt melde Studierende nach Nichtbestehen automatisch zur Nachholprüfung an. Dies ist satzungsrechtlich in der PO nicht garantiert – kontrolliere deinen Prüfungsstatus stets eigenständig in heiCO!",
    bodyHtml: `<p>Warnhinweis zur Klausuranmeldung:</p>
      <div class="callout callout-warning">
        <strong>Status: Unbestätigt & riskant!</strong><br>
        In der amtlichen Prüfungsordnung (§ 20 PO) ist lediglich geregelt, dass die Prüfung im folgenden Semester wiederholt werden <em>muss</em>. Eine Garantie, dass heiCO oder das Prüfungsamt dich ohne dein Zutun anmeldet, existiert nicht.
        <br><br>
        <strong>Empfehlung:</strong> Prüfe zu Semesterbeginn in heiCO unter deinen Prüfungsterminen, ob du für den Nachholtermin registriert bist, und melde dich im Zweifelsfall fristgerecht selbst an!
      </div>`,
    category: "pruefungen",
    tags: ["automatische anmeldung", "wiederanmeldung", "heico", "nachholklausur", "unbestätigt"],
    semesters: [1, 2, 3, 4],
    track: "all",
    sources: [
      { title: "Prüfungsordnung § 20 Fristen", url: "https://heibox.uni-heidelberg.de/d/95707d86f0674bb2a781/" }
    ],
    verifiedAt: "2026-10-07",
    status: "unbestaetigt"
  }
];
