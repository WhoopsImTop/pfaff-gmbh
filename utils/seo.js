export const SITE_URL = 'https://pfaffgmbh.com'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/cfb07fe4-8b86-4ea4-a474-0b6de6065ee8.jpg`
export const DEFAULT_KEYWORDS =
  'Pfaff, Kunststoff, Kunststoffverarbeitung, Spritzguss, Spritzgussteile'

export function absoluteUrl(path = '/') {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function stripHtml(text = '') {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function truncateDescription(text = '', maxLength = 155) {
  const cleaned = stripHtml(text)
  if (cleaned.length <= maxLength) return cleaned
  const truncated = cleaned.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return (
    (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated).trim() +
    '…'
  )
}

export function resolveDescription(...candidates) {
  for (const candidate of candidates) {
    const value = stripHtml(candidate)
    if (value) return truncateDescription(value)
  }
  return ''
}

export function resolveOgImage(image) {
  if (!image) return DEFAULT_OG_IMAGE
  if (image.startsWith('http')) return image
  return absoluteUrl(image)
}

export function buildSeoHead({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
  locale = 'de_DE',
  alternateLocales,
}) {
  const url = absoluteUrl(path)
  const ogImage = resolveOgImage(image)
  const metaDescription = truncateDescription(description)

  const meta = [
    { hid: 'description', name: 'description', content: metaDescription },
    { hid: 'keywords', name: 'keywords', content: keywords },
    { property: 'og:title', content: title },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:url', content: url },
    { property: 'og:type', content: type },
    { property: 'og:locale', content: locale },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: metaDescription },
    { name: 'twitter:image', content: ogImage },
  ]

  if (noindex) {
    meta.push({ hid: 'robots', name: 'robots', content: 'noindex, nofollow' })
  }

  const link = [{ rel: 'canonical', href: url }]

  if (alternateLocales) {
    if (alternateLocales.de) {
      link.push({
        rel: 'alternate',
        hreflang: 'de',
        href: absoluteUrl(alternateLocales.de),
      })
    }
    if (alternateLocales.en) {
      link.push({
        rel: 'alternate',
        hreflang: 'en',
        href: absoluteUrl(alternateLocales.en),
      })
    }
    link.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: absoluteUrl(alternateLocales.de || path),
    })
  }

  return {
    title,
    meta,
    link,
  }
}

export const COMPANY_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Spinnereistraße 4-6',
  addressLocality: 'Waldkirch',
  addressRegion: 'Baden-Württemberg',
  postalCode: '79183',
  addressCountry: 'DE',
}

export function organizationSchema({ name = 'Pfaff GmbH', url = SITE_URL } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    email: 'info@pfaffgmbh.com',
    telephone: '+49-7681-49397-0',
    address: COMPANY_ADDRESS,
    logo: `${SITE_URL}/logo.svg`,
  }
}

export function localBusinessSchema({ name = 'Pfaff GmbH', url = SITE_URL } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name,
    url,
    image: DEFAULT_OG_IMAGE,
    email: 'info@pfaffgmbh.com',
    telephone: '+49-7681-49397-0',
    address: COMPANY_ADDRESS,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.0956,
      longitude: 7.9639,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    areaServed: ['DE', 'AT', 'CH'],
  }
}

export function articleSchema({ title, description, url, image, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: truncateDescription(description),
    url,
    image: resolveOgImage(image),
    datePublished,
    author: {
      '@type': 'Organization',
      name: 'Pfaff GmbH',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pfaff GmbH',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
  }
}

export function productSchema({ name, description, url, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: truncateDescription(description),
    url,
    image: resolveOgImage(image),
    brand: {
      '@type': 'Brand',
      name: 'Pfaff GmbH',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Pfaff GmbH',
    },
  }
}

export function jobPostingSchema({
  title,
  description,
  url,
  datePosted,
  employmentType = 'FULL_TIME',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description: truncateDescription(description, 5000),
    url,
    datePosted,
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Pfaff GmbH',
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    jobLocation: {
      '@type': 'Place',
      address: COMPANY_ADDRESS,
    },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const entry = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      }
      if (item.path) {
        entry.item = absoluteUrl(item.path)
      }
      return entry
    }),
  }
}
