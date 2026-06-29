function getContentLocale(locale) {
  return locale === 'en' ? 'en' : 'de'
}

async function fetchSeitenEntry($content, locale, slug) {
  if (locale !== 'de') {
    try {
      const entry = await $content(`seiten/${locale}/${slug}`).fetch()
      if (entry && entry.length > 0) {
        return entry
      }
    } catch (e) {
      // Fall back to German content
    }
  }
  return $content(`seiten/de/${slug}`).fetch()
}

async function fetchContentWithFallback($content, basePath, locale) {
  if (locale !== 'de') {
    try {
      const localized = await $content(`${basePath}/${locale}`).fetch()
      if (localized.length > 0) {
        return localized
      }
    } catch (e) {
      // Fall back to German content
    }
  }
  return $content(`${basePath}/de`).fetch()
}

async function fetchSeitenBySlug($content, locale, slug) {
  if (locale !== 'de') {
    try {
      const entry = await $content(`seiten/${locale}`)
        .where({ slug })
        .fetch()
      if (entry.length > 0) {
        return entry
      }
    } catch (e) {
      // Fall back to German content
    }
  }
  return $content('seiten/de').where({ slug }).fetch()
}

module.exports = {
  getContentLocale,
  fetchSeitenEntry,
  fetchSeitenBySlug,
  fetchContentWithFallback,
}
