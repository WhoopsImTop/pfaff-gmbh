const BLOG_CATEGORIES = [
  'allgemeine-news',
  'fachbeitraege',
  'meilensteine',
  'presseartikel',
  'stellenausschreibungen',
]

async function getAllRoutes() {
  const { $content } = require('@nuxt/content')
  const routes = []

  const blogPosts = await $content('blog/de').fetch()
  for (const post of blogPosts) {
    if (post.category && post.slug) {
      routes.push(`/news-medien/${post.category}/${post.slug}`)
    }
  }

  for (const category of BLOG_CATEGORIES) {
    routes.push(`/news-medien/${category}`)
  }

  const produkte = await $content('produkte/de').fetch()
  for (const produkt of produkte) {
    routes.push(`/produktbeispiele/${produkt.slug}`)
  }

  const kompetenzen = await $content('kompetenzen/de').fetch()
  for (const kompetenz of kompetenzen) {
    routes.push(`/kompetenzen/${kompetenz.slug}`)
  }

  const branchen = await $content('branchen/de').fetch()
  for (const branche of branchen) {
    routes.push(`/branchen/${branche.slug}`)
  }

  return routes
}

module.exports = {
  BLOG_CATEGORIES,
  getAllRoutes,
}
