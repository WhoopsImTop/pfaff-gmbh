#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const BLOG_DIR = path.join(__dirname, '../content/blog/de')
const MAX_LENGTH = 155

function stripHtml(text = '') {
  return String(text)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text, maxLength = MAX_LENGTH) {
  const cleaned = stripHtml(text)
  if (cleaned.length <= maxLength) return cleaned
  const truncated = cleaned.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  return (
    (lastSpace > 100 ? truncated.slice(0, lastSpace) : truncated).trim() + '…'
  )
}

function isWeakExcerpt(excerpt) {
  if (!excerpt) return true
  const cleaned = stripHtml(excerpt)
  if (!cleaned) return true
  if (cleaned.startsWith('image:')) return true
  if (cleaned.length < 50) return true
  return false
}

function getBodyPreview(body) {
  if (!body) return ''
  const firstParagraph = body.split('\n').find((line) => line.trim().length > 20)
  return firstParagraph || body.slice(0, 300)
}

const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))
let updated = 0

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf8')
  let data
  let content
  try {
    const parsed = matter(raw)
    data = parsed.data
    content = parsed.content
  } catch (error) {
    console.warn(`Skipping ${file}: ${error.message}`)
    continue
  }

  const source = data.shortText || getBodyPreview(content) || data.title
  const nextExcerpt = truncate(source)

  if (isWeakExcerpt(data.excerpt) && nextExcerpt) {
    data.excerpt = nextExcerpt
    if (!data.shortText || stripHtml(data.shortText).length < 40) {
      data.shortText = nextExcerpt
    }
    const output = matter.stringify(content, data)
    fs.writeFileSync(filePath, output)
    updated++
  }
}

console.log(`Updated ${updated} of ${files.length} blog articles.`)
