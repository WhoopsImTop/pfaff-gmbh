const fs = require('fs')
const axios = require('axios')

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
          if (
            inHtmlBlockType === 'img' ||
            inHtmlBlockType === 'iframe' ||
            inHtmlBlockType === 'figure'
          ) {
            //remove style attribute
            line = line.replace(/style=".*?"/g, '')
            //remove width/height attributes
            line = line.replace(/width=".*?"/g, '')
            line = line.replace(/height=".*?"/g, '')
            //remove srcset attribute
            line = line.replace(/srcset=".*?"/g, '')

            line = line.replace(/sizes=".*?"/g, '')
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

        //replace pdf links with local file
        if (line.includes('href="https://pfaffgmbh.com/downloads')) {
          //downoad pdf from link
          const pdfUrl = line.split('href="')[1].split('"')[0]
          const pdfName = pdfUrl.split('/').pop()

          //download pdf from wordpress site

          axios({
            method: 'get',
            url: pdfUrl,
            responseType: 'stream',
          })
            .then(function (response) {
                response.data.pipe(
                    fs.createWriteStream('./static/downloads/' + pdfName)
                )
                console.log('downloaded ' + pdfName)
            })
            .catch(function (error) {
              console.log(error)
            })

          //replace link with local file
          line = line.replace(pdfUrl, '/downloads/' + pdfName)
        }
        newFileContent = newFileContent + line + '\n'
      })
      fs.writeFileSync('./content/blog/de/' + file, newFileContent)
    }
  })
}

wordpress_content_cleanup()
