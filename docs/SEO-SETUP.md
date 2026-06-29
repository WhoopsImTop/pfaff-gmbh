# Google Search Console – Einrichtung

Diese Anleitung beschreibt die Einrichtung von Google Search Console für pfaffgmbh.com nach den SEO-Optimierungen.

## 1. Property anlegen

1. Öffnen Sie [Google Search Console](https://search.google.com/search-console)
2. Property hinzufügen → **Domain** `pfaffgmbh.com` (empfohlen) oder URL-Präfix `https://pfaffgmbh.com`
3. Verifizierung per DNS-TXT-Eintrag beim Domain-Provider

## 2. Sitemap einreichen

Nach dem Deployment die Sitemap einreichen:

```
https://pfaffgmbh.com/sitemap.xml
```

Navigation: Search Console → Sitemaps → neue Sitemap hinzufügen

## 3. robots.txt prüfen

Die Datei `static/robots.txt` verweist auf die Sitemap und blockiert `/admin/` sowie `/anmeldung/`.

Prüfen: https://pfaffgmbh.com/robots.txt

## 4. Indexierung nach technischen Fixes prüfen

Nach dem Deployment folgende URLs in der Search Console unter **URL-Prüfung** testen:

| URL | Erwartung |
|-----|-----------|
| `/qualitaet` | Canonical ohne Umlaut |
| `/news-medien/fachbeitraege/{slug}` | Canonical mit Kategorie-Segment |
| `/branchen/medizintechnik` | Neue Branchen-Landingpage indexierbar |
| `/karriere` | Karriere-Seite mit JobPosting Schema |

## 5. Monitoring (ab Woche 4)

- **Leistung**: Top-Suchanfragen und CTR beobachten
- **Indexierung**: Abdeckung und ausgeschlossene Seiten prüfen
- **Core Web Vitals**: Ladezeiten monitoren
- **Manuelle Maßnahmen**: Auf Warnungen prüfen

## 6. Quartalsweise SEO-Review

- Ranking-Entwicklung für Ziel-Keywords (Spritzguss Waldkirch, ISO 13485, PEEK Dental)
- Snippet-Qualität der Meta-Descriptions
- Interne Verlinkung zu Branchen-Hubs erweitern
- EN-Version schrittweise ausbauen
