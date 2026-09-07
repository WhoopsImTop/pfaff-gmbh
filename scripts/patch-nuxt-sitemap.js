/**
 * Patches @nuxtjs/sitemap so static generate works on Windows.
 * path.join() turns "https://example.com" + "/" into "https:\\example.com\\"
 * which makes `new URL(...)` throw Invalid URL.
 */
const fs = require('fs')
const path = require('path')

const builderPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@nuxtjs',
  'sitemap',
  'lib',
  'builder.js'
)

if (!fs.existsSync(builderPath)) {
  process.exit(0)
}

let source = fs.readFileSync(builderPath, 'utf8')

if (source.includes('path.join breaks URL hostnames on Windows')) {
  process.exit(0)
}

const oldGetHostname = `function getHostname(options, req, base) {
  /* istanbul ignore if */
  if (!options.hostname && !req) {
    logger.fatal('The \`hostname\` option is mandatory in your config on \`spa\` or \`generate\` build mode', options)
  }
  return join(
    options.hostname || (req && \`\${isHTTPS(req) ? 'https' : 'http'}://\${req.headers.host}\`) || \`http://\${hostname()}\`,
    base
  )
}`

const newGetHostname = `function getHostname(options, req, base) {
  /* istanbul ignore if */
  if (!options.hostname && !req) {
    logger.fatal('The \`hostname\` option is mandatory in your config on \`spa\` or \`generate\` build mode', options)
  }
  // path.join breaks URL hostnames on Windows (e.g. "https:\\\\example.com\\\\")
  const host =
    options.hostname ||
    (req && \`\${isHTTPS(req) ? 'https' : 'http'}://\${req.headers.host}\`) ||
    \`http://\${hostname()}\`
  const normalizedBase = base && base !== '/' ? String(base).replace(/\\\\/g, '/') : ''
  if (!normalizedBase) {
    return host.replace(/\\/$/, '')
  }
  return \`\${host.replace(/\\/$/, '')}/\${normalizedBase.replace(/^\\//, '')}\`.replace(/\\/$/, '')
}`

const oldUrlNormalize = `url: join('.', String(sitemapOptions.url)),`

const newUrlNormalize = `url: String(sitemapOptions.url || '').replace(/\\\\/g, '/').replace(/^\\./, '') || '/',`

if (!source.includes(oldGetHostname) || !source.includes(oldUrlNormalize)) {
  console.warn(
    '[patch-nuxt-sitemap] Unexpected @nuxtjs/sitemap builder.js contents; skip patch'
  )
  process.exit(0)
}

source = source.replace(oldGetHostname, newGetHostname).replace(oldUrlNormalize, newUrlNormalize)
fs.writeFileSync(builderPath, source)
console.log('[patch-nuxt-sitemap] Patched @nuxtjs/sitemap for Windows URL handling')
