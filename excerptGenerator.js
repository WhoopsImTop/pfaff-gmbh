const fs = require('fs')
const path = require('path')

const generateExcerpt = (language) => {
  const blogPath = path.join(__dirname, `/content/blog/${language}`)
  const files = fs.readdirSync(blogPath)

  //read content of frontmatter and create excerpt that has max 100 characters and create a new frontmatter entry with the excerpt
  files.forEach((file) => {
    const filePath = path.join(blogPath, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const frontmatter = fileContent.split('---')[1]
    const excerpt = fileContent.split('---')[2].slice(0, 100)
    //check if excerpt is already in frontmatter and if not add it to the frontmatter if so replace content of excerpt
    if (!frontmatter.includes('excerpt')) {
      const newFrontmatter = `---${frontmatter}excerpt: ${excerpt}---\n`
      fs.writeFileSync(filePath, newFrontmatter)
    } else {
      const newFrontmatter = `---${frontmatter.replace(
        /excerpt: .*/,
        `excerpt: ${excerpt}`
      )}---\n`
      fs.writeFileSync(filePath, newFrontmatter)
    }
  })
}

generateExcerpt('en')
generateExcerpt('de')
