# Ersti-Guide Psychologie Heidelberg (WiSe 2026/27)

Eine kleine, statische Webseite für Erstsemester im **B.Sc. Psychologie 100 % (polyvalent)** an der Universität Heidelberg.
Sie hilft durch die Ersti-Woche (EKS) und bei der Planung des ganzen Studiums.

> Inoffiziell. Alle Inhalte stammen aus dem heiBOX-Ordner **EKS_Materialien_Erstis** (Stand 25.09.2026)
> und der Semestertermin-Seite der Uni. Im Zweifel gilt der Ordner.

## Starten

Keine Installation, kein Build. Einfach `index.html` im Browser öffnen.

Oder mit lokalem Server (empfohlen, z. B. für Handy-Tests im WLAN):

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

Zum Testen eines anderen Zeitpunkts (z. B. mitten in der EKS-Woche):
`index.html?now=2026-10-06T10:30`

## Funktionen

| Bereich | Was es kann |
| --- | --- |
| **Start** | Countdown, „Jetzt / Als Nächstes“ (EKS + Kurse), wichtige Termine, To-do-Liste mit eigenen Einträgen, Studienfortschritt, eigene Gruppen |
| **EKS-Woche** | Tagesansicht 5.–14.10. als Zeitstrahl, „läuft gerade“-Markierung, Filter nach EKS-/UB-Gruppe, Orte mit Kartenlink, Export der ganzen Woche als `.ics` |
| **Stundenplan** | Wochenraster 1. Semester (mobil als Liste), Auswahl Übungsgruppe & Statistik-Tutorium, Export als wöchentliche `.ics`-Serie bis 06.02.2027 ohne Weihnachtspause |
| **Studienplan** | 4 Varianten (6 Sem. approbationsrelevant, 6 Sem. allgemein, 8 Sem., 10 Sem.), Module abhaken, LP-Fortschritt gesamt und je Bereich, Filter, Vergleich approbationsrelevant vs. allgemein, Druckansicht |
| **Studienplan → Modulhandbuch** | Alle 22 Module: Veranstaltungen, Prüfungsform, Benotung, Turnus, Voraussetzungen – mit Link auf die PDF-Seite |
| **Infos** | Kontakte, Regeln (Praktika, Vpn-Stunden, Approbationsweg …), Glossar mit Quellen, offene Fragen, über 70 Links zu den Originalseiten |

Gruppen, Häkchen und To-dos werden nur in `localStorage` des Browsers gespeichert (Schlüssel `ersti-guide-psy-hd-v1`).
Design: Neumorphism „Sandstone“ (Soft UI) – Tiefe nur über Licht/Schatten, keine Rahmen, Schriften Plus Jakarta Sans + DM Sans (Google Fonts, sonst Systemschrift). Water/Glass ist laut Designsystem für KI reserviert und wird hier nur im Logo verwendet.

## Struktur

```
ersti-psychologie-heidelberg/
├── index.html        # Gerüst: Navigation, 5 Views, Einstellungs-Dialog
├── css/style.css     # Design-Tokens (hell/dunkel), Layout, Komponenten
├── js/data.js        # Inhalte aus den EKS-Unterlagen (Termine, Kurse, Pläne, Kontakte …)
├── js/data-extra.js  # Modulhandbuch (17.01.2024), Regeln, Linksammlung, Quellen-URLs
├── js/app.js         # Logik: Router, Rendering, localStorage, .ics-Export
└── assets/icon.svg   # Favicon
```

Reines HTML/CSS/JavaScript ohne Abhängigkeiten. `data.js` wird als Skript geladen (nicht per `fetch`),
damit die Seite auch per Doppelklick (`file://`) funktioniert.

## Inhalte ändern

Nur `js/data.js` bzw. `js/data-extra.js` anfassen:

- **EKS-Termin ändern/hinzufügen:** Eintrag in `eks` (`date`, `start`, `end`, `title`, `loc`, `details`, `tags`, optional `groups`, `ubGroup`, `note`, `link`).
- **Ort:** Schlüssel aus `places` bei `loc` verwenden; neue Orte dort anlegen (mit `map` = Suchbegriff/Adresse für Google Maps).
- **Kurs im Stundenplan:** Eintrag in `timetable` (`day` 1=Mo … 5=Fr, `first` = erster Termin). Wahlgruppen über `choice: "ue" | "tut"` und `group`.
- **Studienplan:** Module in `modules` (gleiche ID in allen Plänen, damit Häkchen planübergreifend gelten), Reihenfolge je Semester in `plans[...].semesters`. Module über mehrere Semester: `span: { id: n }`.
- **Neues Semester (2. Semester etc.):** `timetable` ersetzen, `meta` (Semesterdaten) anpassen, `STORE_KEY` in `app.js` nur ändern, wenn alte Speicherdaten verworfen werden sollen.

## Bekannte Lücken in den Quelldaten

- Start am 5.10.: Einladung sagt 9:00, Wochenplan 9:15 Uhr.
- Folgende Institutsseiten konnten beim Erstellen nicht gelesen werden (nur verlinkt): FOV im B.Sc., Praktikum, Anmeldung zu den Klausuren.
- Modulhandbuch-Link (backend.uni-heidelberg.de) stammt aus der Websuche – bei Änderung in `data-extra.js` anpassen.
- Party „Psychopathie“ steht ohne Datum im Plan (vermutlich Do 15.10.).
- Poster-Kongress: 4. oder 5. Fachsemester – widersprüchlich.
- Ende einiger EKS-Punkte ohne Uhrzeit → im Kalender-Export mit 30 Min. (Essen 45 Min.) angesetzt.
- Räume der Statistik-Tutorien sind noch nicht bekannt.

## Ideen zum Weiterbauen

- Als PWA installierbar machen (Manifest + Service Worker für Offline-Nutzung).
- Stundenplan für das 2. Semester ergänzen, sobald veröffentlicht.
- Notenrechner pro Modul (Gewichtung nach LP).
- Export/Import des Fortschritts als JSON (Gerätewechsel).
- Karte des Instituts / der Altstadt mit allen Orten.
