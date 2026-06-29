import { toUrlSlug } from '~/utils/slug'

export default function ({ route, redirect }) {
  if (route.path.match(/^\/news-medien-presse\/page\/\d+\/?$/)) {
    return redirect('/news-medien')
  }

  const articleMatch = route.path.match(
    /^\/news-medien\/([^/]+)\/([^/]+)\/?$/
  )
  if (articleMatch) {
    const [, category, slug] = articleMatch
    const normalizedSlug = toUrlSlug(decodeURIComponent(slug))
    if (slug !== normalizedSlug) {
      return redirect(301, `/news-medien/${category}/${normalizedSlug}`)
    }
  }
}
