async function fetchGenerateRoutes() {
  const { $content } = require('@nuxt/content')
  const categories = ['blog', 'kompetenzen', 'produkte', 'branchen']
  const routes = []
  const blogCategories = new Set()

  for (const category of categories) {
    const items = await $content(`${category}/de`).fetch()

    if (category === 'blog') {
      items.forEach((route) => {
        routes.push(`/news-medien/${route.category}/${route.slug}`)
        blogCategories.add(route.category)
      })
    } else if (category === 'produkte') {
      items.forEach((route) => routes.push(`/produktbeispiele/${route.slug}`))
    } else if (category === 'kompetenzen') {
      items.forEach((route) => routes.push(`/kompetenzen/${route.slug}`))
    } else if (category === 'branchen') {
      items.forEach((route) => routes.push(`/branchen/${route.slug}`))
    }
  }

  blogCategories.forEach((cat) => routes.push(`/news-medien/${cat}`))

  routes.push(
    '/karriere',
    '/en',
    '/en/unternehmen',
    '/en/kontakt',
    '/en/qualitaet'
  )

  return routes
}

module.exports = { fetchGenerateRoutes }
