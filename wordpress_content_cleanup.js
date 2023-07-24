const fs = require('fs')

function wordpress_content_cleanup() {
  //read all md files in content/blog/de and cleanup the html
  //remove all style attributes and width/height attributes from images
  //remove all empty p tags
  //remove all empty a tags

  //if a tag has a link to an external pdf download it to /static and replace the link with the local file

  //read all md files in content/blog/de and cleanup the html
  const files = fs.readdirSync('./content/blog/de')
  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const fileContent = fs.readFileSync('./content/blog/de/' + file, 'utf8')
      const lines = fileContent.split('\n')
      let newFileContent = ''
      let inCodeBlock = false
      let inHtmlBlock = false
      let inHtmlBlockType = ''
      lines.forEach((line) => {
        if (line.startsWith('```')) {
          inCodeBlock = !inCodeBlock
        }
        if (line.startsWith('<')) {
          inHtmlBlock = !inHtmlBlock
          inHtmlBlockType = line.split(' ')[0].replace('<', '').replace('>', '')
        }
        if (inHtmlBlock) {
          if (inHtmlBlockType === 'img') {
            //remove style attribute
            line = line.replace(/style=".*?"/g, '')
            //remove width/height attributes
            line = line.replace(/width=".*?"/g, '')
            line = line.replace(/height=".*?"/g, '')
          }
          if (inHtmlBlockType === 'a') {
            //remove style attribute
            line = line.replace(/style=".*?"/g, '')
            //remove width/height attributes
            line = line.replace(/width=".*?"/g, '')
            line = line.replace(/height=".*?"/g, '')
          }
        }
        if (line === '<!--more-->') {
          line = '<!-- truncate -->'
        }
        if (!inCodeBlock && !inHtmlBlock) {
          if (line.startsWith('<p>')) {
            line = line.replace('<p>', '')
          }
          if (line.endsWith('</p>')) {
            line = line.replace('</p>', '')
          }
          if (line === '') {
            return
          }
        }
        newFileContent = newFileContent + line + '\n'
      })
      fs.writeFileSync('./content/blog/de/' + file, newFileContent)
    }
  })
}


wordpress_content_cleanup()