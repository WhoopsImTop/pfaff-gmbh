const fs = require('fs')
const path = require('path')

const generateExcerpt = (language) => {
  const blogPath = path.join(__dirname, `../content/blog/${language}`)
  const files = fs.readdirSync(blogPath)

  files.forEach((file) => {
    const filePath = path.join(blogPath, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const excerpt = fileContent.split('<!--more-->')[0]

    fs.writeFileSync(filePath, excerpt)
  })
}

generateExcerpt('en')
generateExcerpt('de')
