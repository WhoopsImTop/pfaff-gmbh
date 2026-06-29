/**
 * Normalisiert Text zu URL-tauglichen ASCII-Slugs.
 * ä→ae, ö→oe, ü→ue, ß→ss, Sonderzeichen → Bindestrich
 */
function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00ad/g, '')
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[–—]/g, '-')
    .replace(/[„“‚’'"`´]/g, '')
    .replace(/€/g, 'eur')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

module.exports = { slugify }
