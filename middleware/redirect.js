import { slugify } from '~/utils/slugify'

function normalizePath(path) {
  return path
    .split('/')
    .map((segment) => {
      if (!segment) return segment

      if (/\.[a-z0-9]+$/i.test(segment)) {
        const dot = segment.lastIndexOf('.')
        const base = segment.slice(0, dot)
        const ext = segment.slice(dot)
        const normalized = slugify(base)
        return normalized ? `${normalized}${ext}` : segment
      }

      const normalized = slugify(segment)
      return normalized || segment
    })
    .join('/')
}

export default function ({ route, redirect }) {
  if (route.path.match(/^\/news-medien-presse\/page\/\d+\/?$/)) {
    return redirect('/news-medien')
  }

  if (route.path === '/agbs') {
    return redirect(301, '/agb')
  }

  const normalized = normalizePath(route.path)
  if (normalized !== route.path) {
    return redirect(301, normalized)
  }
}
