# Classic Cars – Kataloge bestellen & herunterladen

Kleine Web-App zur Anzeige von „Classic Cars“-Artikeln (Kataloge/Prospekte) mit Suchfunktion, Warenkorb/Bestellung sowie Download-Ansicht. Zusätzlich sind rechtliche Seiten (Datenschutz/AGB/Impressum) verlinkt.

## Funktionen
- Artikelübersicht als Karten/Grid
- Suche nach Artikeln
- Zwei Ansichten: **Bestellen** und **Herunterladen**
- Bestell-Modal mit 2 Schritten:
  1) Adresseingabe  
  2) Bestätigung inkl. AGB-Checkbox
- Login-Modal (Demo)
- Footer mit Links zu Impressum, Datenschutz und AGB

## Demo-Login
Die Zugangsdaten sind in der Oberfläche als Demo angegeben:
- E-Mail: `feser@gso.test`
- Passwort: `1234`

## Projektstruktu
- `index.html` – Startseite
- `index.css` – zusätzliche Styles
- `src/main.js` – Logik (Rendern der Artikel, Suche, Warenkorb, Login/Modals)
- `legal/privacy.html` – Datenschutzseite
- `legal/terms.html` – AGB 
- `legal/imprint.html` – Impressum
- `downloads/` – Ablage für PDF-Dateien (Download-Links verweisen i. d. R. hierhin)