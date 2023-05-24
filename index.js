// fetch wordpress posts, convert the body to markdown, and save it to content/blog/de
// for use with gatsby-source-filesystem
//

const axios = require('axios')
const fs = require('fs')
const {
  NodeHtmlMarkdown,
  NodeHtmlMarkdownOptions,
} = require('node-html-markdown')
const { StringDecoder } = require('node:string_decoder');

const categoryUrl =
  'https://pfaffgmbh.com/wp-json/wp/v2/categories?per_page=100'
const postUrl = 'https://pfaffgmbh.com/wp-json/wp/v2/posts?per_page=100'

const Categories = []
axios
  .get(categoryUrl)
  .then(function (response) {
    const categories = response.data
    categories.forEach((category) => {
      Categories.push({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })
    })
  })
  .catch(function (error) {
    console.log(error)
  })

axios
  .get(postUrl)
  .then(function (response) {
    const posts = response.data
    posts.forEach((post) => {
      //download the images from the content and save them to static/images
      const regex = /<img.*?src="(.*?)"/g
      let match
      while ((match = regex.exec(post.content.rendered))) {
        const url = match[1]
        const filename = url.split('/').pop()
        axios({
          method: 'get',
          url: url,
          responseType: 'stream',
        }).then(function (response) {
          response.data.pipe(fs.createWriteStream('static/' + filename))
        })
      }

      //replace image urls in content with relative urls
      post.content.rendered = post.content.rendered.replace(
        /https:\/\/pfaffgmbh.com\/wp-content\/uploads\//g,
        '/'
      )

      //remove all html tags from excerpt
      post.excerpt.rendered = post.excerpt.rendered.replace(/<[^>]*>/g, '')
      //shorten the excerpt to 200 characters
      post.excerpt.rendered = post.excerpt.rendered.substring(0, 200)

      const decoder = new StringDecoder('utf8');

      const filename = post.slug + '.md'
      let content = '---\n'
      content += 'title: "' + decoder.write(post.title.rendered) + '"\n'
      content += 'date: ' + post.date + '\n'
      content += 'category:\n'
      post.categories.forEach((category) => {
        const cat = Categories.find((cat) => cat.id === category)
        content += '  - ' + cat.slug + '\n'
      })
      content +=
        'content: ' +
        post.content.rendered
          .replace(/(&nbsp;|<([^>]+)>)/ig, '')
          .replace(/(?:\r\n|\r|\n)/g, ' ')
          .replace(/(?:\\r\\n|\\r|\\n)/g, ' ') +
        '\n'
      content += '---\n'
      content += decoder.write(post.content.rendered)
      fs.writeFileSync('content/blog/de/' + filename, content)
      console.log('wrote ' + filename)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
