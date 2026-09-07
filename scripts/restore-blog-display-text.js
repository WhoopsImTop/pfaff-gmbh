#!/usr/bin/env node
/**
 * Restores blog title/shortText/excerpt that were incorrectly slugified
 * by an earlier normalize-content-slugs run (commit d23ab4b and related).
 *
 * Strategy:
 * 1. Detect slugified display fields
 * 2. Recover good values from git history (before corruption)
 * 3. Fall back: rebuild excerpt/shortText from article body
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const frontMatter = require('front-matter')
const { slugify } = require('../utils/slugify')

const ROOT = path.join(__dirname, '..')
const BLOG_DIR = path.join(ROOT, 'content/blog/de')
const CORRUPTION_COMMIT = 'd23ab4b'
const PARENT = `${CORRUPTION_COMMIT}^`
const WRITE = process.argv.includes('--write')

function looksSlugified(value) {
  if (!value) return false
  const s = String(value).replace(/\s+/g, ' ').trim()
  if (s.length < 12) return false
  if (/\s/.test(s)) return false
  if (/[A-ZÄÖÜ]/.test(s)) return false
  const hyphens = (s.match(/-/g) || []).length
  return hyphens >= 2 && /^[a-z0-9]+(-[a-z0-9]+)+$/.test(s)
}

function stripHtml(text = '') {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text, maxLength = 155) {
  const cleaned = stripHtml(text)
  if (cleaned.length <= maxLength) return cleaned
  const truncated = cleaned.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return (
    (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated).trim() + '…'
  )
}

function getBodyPreview(body) {
  if (!body) return ''
  const firstParagraph = body
    .split('\n')
    .map((l) => l.trim())
    .find((line) => line.length > 20 && !line.startsWith('#'))
  return firstParagraph || body.slice(0, 300)
}

function gitShow(revPath) {
  try {
    return execFileSync(
      'git',
      ['-c', 'core.quotepath=false', 'show', revPath],
      {
        cwd: ROOT,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      }
    )
  } catch {
    return null
  }
}

function listFilesAt(rev, dir) {
  try {
    const out = execFileSync(
      'git',
      ['-c', 'core.quotepath=false', 'ls-tree', '-r', '--name-only', rev, dir],
      { cwd: ROOT, encoding: 'utf8' }
    )
    return out
      .split('\n')
      .map((l) => l.trim().replace(/^"|"$/g, ''))
      .filter((l) => l.endsWith('.md'))
  } catch {
    return []
  }
}

function basenameKey(filePath) {
  return slugify(path.basename(filePath, '.md'))
}

function yamlEscape(value) {
  let s = value
  if (value instanceof Date) {
    s = value.toISOString()
  } else {
    s = String(value)
  }
  if (/[:#{}[\],&*?|<>=!%@`]/.test(s) || s.includes('\n') || s.includes('"')) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ')}"`
  }
  if (s.includes("'") || /\s/.test(s)) {
    return `"${s.replace(/"/g, '\\"')}"`
  }
  return s
}

function setFrontmatterFields(raw, updates) {
  const parsed = frontMatter(raw)
  const attrs = { ...parsed.attributes, ...updates }

  // Keep original date string from raw YAML (front-matter turns it into Date)
  const dateMatch = raw.match(/^date:\s*(.+)$/m)
  if (dateMatch && updates.date === undefined) {
    attrs.date = dateMatch[1].trim().replace(/^["']|["']$/g, '')
  } else if (attrs.date instanceof Date) {
    attrs.date = attrs.date.toISOString()
  }

  const orderedKeys = [
    'title',
    'shortText',
    'date',
    'image',
    'category',
    'excerpt',
    'slug',
  ]
  const skip = new Set(['content'])
  const extraKeys = Object.keys(attrs).filter(
    (k) => !orderedKeys.includes(k) && !skip.has(k)
  )
  const keys = [
    ...orderedKeys.filter((k) => attrs[k] !== undefined && attrs[k] !== null),
    ...extraKeys,
  ]

  const fmLines = ['---']
  for (const key of keys) {
    const val = attrs[key]
    if (val === undefined || val === null) continue
    if (typeof val === 'object' && !(val instanceof Date)) continue
    fmLines.push(`${key}: ${yamlEscape(val)}`)
  }
  fmLines.push('---')

  return `${fmLines.join('\n')}\n${parsed.body.replace(/^\n/, '')}`
}

function buildParentIndex() {
  const files = listFilesAt(PARENT, 'content/blog/de')
  const index = new Map()
  for (const filePath of files) {
    const raw = gitShow(`${PARENT}:${filePath}`)
    if (!raw) continue
    let attrs
    try {
      attrs = frontMatter(raw).attributes
    } catch {
      continue
    }
    index.set(basenameKey(filePath), {
      filePath,
      title: attrs.title,
      shortText: attrs.shortText,
      excerpt: attrs.excerpt,
    })
  }
  return index
}

function run() {
  const parentIndex = buildParentIndex()
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))
  let fixed = 0

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    let parsed
    try {
      parsed = frontMatter(raw)
    } catch (e) {
      console.warn(`Skip ${file}: ${e.message}`)
      continue
    }

    const { attributes: attrs, body } = parsed
    const updates = {}
    const parent = parentIndex.get(basenameKey(file))

    if (looksSlugified(attrs.title) && parent?.title && !looksSlugified(parent.title)) {
      updates.title = parent.title
    }

    if (
      looksSlugified(attrs.shortText) &&
      parent?.shortText &&
      !looksSlugified(parent.shortText)
    ) {
      updates.shortText = String(parent.shortText).replace(/\s+/g, ' ').trim()
    }

    if (
      looksSlugified(attrs.excerpt) &&
      parent?.excerpt &&
      !looksSlugified(parent.excerpt)
    ) {
      updates.excerpt = String(parent.excerpt).replace(/\s+/g, ' ').trim()
    }

    // Fallbacks when git parent has no usable display text
    const nextTitle = updates.title || attrs.title
    const nextShort =
      updates.shortText ||
      (!looksSlugified(attrs.shortText) ? attrs.shortText : null)
    const bodyPreview = truncate(getBodyPreview(body))

    if (looksSlugified(attrs.shortText) && !updates.shortText) {
      updates.shortText = bodyPreview || nextTitle
    }

    if (looksSlugified(attrs.excerpt) && !updates.excerpt) {
      updates.excerpt = truncate(
        nextShort || bodyPreview || nextTitle || ''
      )
    }

    // Also fix weak excerpts that are slugified even if detection edge-cases
    if (!updates.excerpt && looksSlugified(attrs.excerpt)) {
      updates.excerpt = truncate(nextShort || bodyPreview || nextTitle || '')
    }

    if (!Object.keys(updates).length) continue

    fixed++
    console.log(`${file}: ${Object.keys(updates).join(', ')}`)
    if (WRITE) {
      const next = setFrontmatterFields(raw, updates)
      fs.writeFileSync(filePath, next, 'utf8')
    }
  }

  console.log(
    WRITE
      ? `\nRestored display fields in ${fixed} files.`
      : `\nDry-run: ${fixed} files would be updated. Use --write to apply.`
  )
}

run()
