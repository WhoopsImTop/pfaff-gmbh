const BASE_URL = 'https://pfaff-gmbh.netlify.app'
module.exports = {
  createRoutes: async () => {
    const routes = []
    let posts = []
    let Kompetenzen = []
    let Produkte = []

    const { $content } = require('@nuxt/content')

    /* Posts */
    if (posts === null || posts.length === 0) {
      posts = await $content('blog').without(['body']).fetch()
    }

    /* Posts */
    for (const post of posts) {
      routes.push(`/news-medien/${post.slug}`)
    }

    /* Kompetenzen */
    if (Kompetenzen === null || Kompetenzen.length === 0) {
        Kompetenzen = await $content('kompetenzen').without(['body']).fetch()
    }

    /* Kompetenzen */
    for (const kompetenz of Kompetenzen) {
        routes.push(`/kompetenzen/${kompetenz.slug}`)
    }

    /* Produkte */
    if (Produkte === null || Produkte.length === 0) {
        Produkte = await $content('produkte').without(['body']).fetch()
    }

    /* Produkte */
    for (const produkt of Produkte) {
        routes.push(`/produkte/${produkt.slug}`)
    }

    return routes.sort()
  },
  createFeeds: () => {
    const baseUrlArticles = `${BASE_URL}/news-medien`
    const baseLinkFeedArticles = ''

    const feedFormats = {
      rss: { type: 'rss2', file: 'feed.xml' },
      json: { type: 'json1', file: 'feed.json' },
    }

    const createFeedArticles = async function (feed) {
      feed.options = {
        title: 'https://pfaff-gmbh.netlify.app',
        description: 'Pfaff GmbH',
        link: baseUrlArticles,
        webMaster: 'Pfaff GmbH',
        managingEditor: 'Pfaff GmbH',
        copyright: '2021',
      }

      const { $content } = require('@nuxt/content')
      const blogs = await $content('blog').without(['body']).fetch()

      blogs.forEach((blog) => {
        const url = `${baseUrlArticles}/${blog.slug}`

        feed.addItem({
          title: blog.title,
          id: `${blog.slug}`,
          link: url,
          date: new Date(blog.createdAt),
        })
      })
    }

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `${baseLinkFeedArticles}/${file}`,
      type,
      create: createFeedArticles,
    }))
  },
}
