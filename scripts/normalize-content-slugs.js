#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const frontMatter = require('front-matter')
const { slugify } = require('../utils/slugify')

const ROOT = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT, 'content')
const REFERENCE_DIRS = [
  path.join(ROOT, 'content'),
  path.join(ROOT, 'pages'),
  path.join(ROOT, 'components'),
  path.join(ROOT, 'utils'),
]

const REFERENCE_EXTENSIONS = new Set(['.md', '.json', '.vue', '.js', '.yml', '.yaml'])

const WRITE = process.argv.includes('--write')
const CHECK = process.argv.includes('--check')
const DRY_RUN = !WRITE && !CHECK

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isSlugCandidate(value) {
  if (!value || value.length > 100) return false
  if (/\s/.test(value)) return false
  return /[äöüÄÖÜß€–—]/.test(value)
}

function walkMarkdownFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkMarkdownFiles(fullPath, files)
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function collectReferenceFiles() {
  const files = []

  for (const dir of REFERENCE_DIRS) {
    if (!fs.existsSync(dir)) continue
    const stack = [dir]

    while (stack.length) {
      const current = stack.pop()
      for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
        const fullPath = path.join(current, entry.name)
        if (entry.isDirectory()) {
          stack.push(fullPath)
        } else if (REFERENCE_EXTENSIONS.has(path.extname(entry.name))) {
          files.push(fullPath)
        }
      }
    }
  }

  return [...new Set(files)]
}

function replaceSlugReferences(text, slugMap) {
  let result = text
  const replacements = [...slugMap.entries()].sort(
    (a, b) => b[0].length - a[0].length
  )

  for (const [oldSlug, newSlug] of replacements) {
    if (!oldSlug || oldSlug === newSlug) continue

    const escaped = escapeRegex(oldSlug)

    result = result.replace(
      new RegExp(
        `(/(?:news-medien/[^/\\s]+|produktbeispiele|kompetenzen|branchen)/)${escaped}(?=[/"'\\s\\)\\]]|$)`,
        'g'
      ),
      `$1${newSlug}`
    )

    result = result.replace(
      new RegExp(
        `((?:kompetenzen|produktbeispiele|branchen)/)${escaped}(?=[/"'\\s\\)\\]]|$)`,
        'g'
      ),
      `$1${newSlug}`
    )

    result = result.replace(
      new RegExp(`(^slug:\\s*)${escaped}\\s*$`, 'gm'),
      `$1${newSlug}`
    )

    result = result.replace(
      new RegExp(`(^category:\\s*)${escaped}\\s*$`, 'gm'),
      `$1${newSlug}`
    )

    result = result.replace(
      new RegExp(`(^\\s*-\\s+)${escaped}\\s*$`, 'gm'),
      `$1${newSlug}`
    )

    if (isSlugCandidate(oldSlug)) {
      result = result.replace(
        new RegExp(`"${escaped}"`, 'g'),
        `"${newSlug}"`
      )
    }
  }

  return result
}

function updateFrontmatterFields(raw, newSlug, category) {
  const parsed = frontMatter(raw)
  const newCategory = category ? slugify(category) : null
  const lines = raw.split('\n')
  let inFrontmatter = false
  let slugUpdated = false
  let categoryUpdated = false

  const updatedLines = lines.map((line, index) => {
    if (index === 0 && line.trim() === '---') {
      inFrontmatter = true
      return line
    }
    if (inFrontmatter && line.trim() === '---') {
      inFrontmatter = false
      return line
    }
    if (inFrontmatter) {
      if (/^slug:\s*/.test(line)) {
        slugUpdated = true
        return `slug: ${newSlug}`
      }
      if (newCategory && /^category:\s*/.test(line)) {
        categoryUpdated = true
        return `category: ${newCategory}`
      }
    }
    return line
  })

  if (!slugUpdated && parsed.attributes.slug !== undefined) {
    const endIndex = updatedLines.findIndex(
      (line, index) => index > 0 && line.trim() === '---'
    )
    if (endIndex > 0) updatedLines.splice(endIndex, 0, `slug: ${newSlug}`)
  }

  if (newCategory && !categoryUpdated && parsed.attributes.category !== undefined) {
    const endIndex = updatedLines.findIndex(
      (line, index) => index > 0 && line.trim() === '---'
    )
    if (endIndex > 0) updatedLines.splice(endIndex, 0, `category: ${newCategory}`)
  }

  return updatedLines.join('\n')
}

function augmentSlugMapFromReferences(slugMap, referenceFiles) {
  for (const filePath of referenceFiles) {
    const content = fs.readFileSync(filePath, 'utf8')

    for (const match of content.matchAll(/"([^"]+)"/g)) {
      const value = match[1]
      if (!isSlugCandidate(value)) continue
      const normalized = slugify(value)
      if (normalized && normalized !== value) {
        slugMap.set(value, normalized)
      }
    }

    for (const match of content.matchAll(
      /(?:kompetenzen|produktbeispiele|branchen)\/([^\s"'`,]+)/g
    )) {
      const value = match[1]
      if (!isSlugCandidate(value) && !/[äöüÄÖÜß]/.test(value)) continue
      const normalized = slugify(value)
      if (normalized && normalized !== value) {
        slugMap.set(value, normalized)
      }
    }
  }
}

function buildPlans() {
  const markdownFiles = walkMarkdownFiles(CONTENT_DIR)
  const filePlans = []
  const slugMap = new Map()
  const targetPaths = new Map()

  for (const filePath of markdownFiles) {
    const dir = path.dirname(filePath)
    const basename = path.basename(filePath, '.md')
    const raw = fs.readFileSync(filePath, 'utf8')
    const { attributes } = frontMatter(raw)

    const currentSlug = attributes.slug || basename
    const finalSlug = slugify(currentSlug)
    const newBasename = slugify(basename)
    const targetPath = path.join(dir, `${newBasename}.md`)

    if (!finalSlug || !newBasename) {
      console.warn(`Übersprungen (leerer Slug): ${path.relative(ROOT, filePath)}`)
      continue
    }

    if (targetPaths.has(targetPath) && targetPaths.get(targetPath) !== filePath) {
      console.error(`Slug-Kollision: ${path.relative(ROOT, targetPath)}`)
      process.exit(1)
    }
    targetPaths.set(targetPath, filePath)

    filePlans.push({
      filePath,
      targetPath,
      basename,
      newBasename,
      currentSlug,
      finalSlug,
      category: attributes.category,
    })

    for (const oldValue of new Set([basename, currentSlug])) {
      if (oldValue && oldValue !== finalSlug) {
        slugMap.set(oldValue, finalSlug)
      }
    }

    if (attributes.category) {
      const newCategory = slugify(attributes.category)
      if (newCategory && newCategory !== attributes.category) {
        slugMap.set(attributes.category, newCategory)
      }
    }
  }

  return { filePlans, slugMap }
}

function run() {
  const { filePlans, slugMap } = buildPlans()
  const referenceFiles = collectReferenceFiles()
  augmentSlugMapFromReferences(slugMap, referenceFiles)

  const renames = filePlans.filter((plan) => plan.filePath !== plan.targetPath)
  const frontmatterUpdates = filePlans.filter(
    (plan) =>
      plan.currentSlug !== plan.finalSlug ||
      (plan.category && slugify(plan.category) !== plan.category)
  )

  const referenceUpdates = referenceFiles
    .map((filePath) => {
      const original = fs.readFileSync(filePath, 'utf8')
      const updated = replaceSlugReferences(original, slugMap)
      return updated !== original ? { filePath, updated } : null
    })
    .filter(Boolean)

  const changes = renames.length + frontmatterUpdates.length + referenceUpdates.length

  console.log(`Slug-Mapping: ${slugMap.size}`)
  console.log(`Datei-Umbenennungen: ${renames.length}`)
  console.log(`Frontmatter-Updates: ${frontmatterUpdates.length}`)
  console.log(`Referenz-Updates: ${referenceUpdates.length}`)

  if (renames.length) {
    console.log('\nUmbenennungen:')
    renames.forEach((plan) => {
      console.log(
        `  ${path.relative(ROOT, plan.filePath)} → ${path.relative(ROOT, plan.targetPath)}`
      )
    })
  }

  if (DRY_RUN) {
    console.log(
      changes === 0
        ? '\nAlle Slugs sind bereits normalisiert.'
        : '\nDry-run – keine Änderungen. Nutze --write zum Anwenden.'
    )
    return
  }

  if (CHECK) {
    if (changes > 0) {
      console.error('\nNicht normalisierte Slugs gefunden. Bitte npm run normalize-slugs:write ausführen.')
      process.exit(1)
    }
    console.log('\nAlle Slugs sind normalisiert.')
    return
  }

  for (const { filePath, updated } of referenceUpdates) {
    fs.writeFileSync(filePath, updated, 'utf8')
  }

  for (const plan of filePlans) {
    if (plan.currentSlug === plan.finalSlug && plan.filePath === plan.targetPath) {
      if (!plan.category || slugify(plan.category) === plan.category) continue
    }

    let content = fs.readFileSync(plan.filePath, 'utf8')
    content = replaceSlugReferences(content, slugMap)
    content = updateFrontmatterFields(content, plan.finalSlug, plan.category)
    fs.writeFileSync(plan.filePath, content, 'utf8')
  }

  for (const plan of renames) {
    if (fs.existsSync(plan.targetPath) && plan.targetPath !== plan.filePath) {
      console.error(`Zieldatei existiert bereits: ${plan.targetPath}`)
      process.exit(1)
    }
    fs.renameSync(plan.filePath, plan.targetPath)
  }

  console.log('\nSlug-Normalisierung abgeschlossen.')
}

run()
