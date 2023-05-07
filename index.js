// fetch wordpress posts, convert the body to markdown, and save it to content/blog/de
// for use with gatsby-source-filesystem
//

const axios = require('axios')
const fs = require('fs')
const {
  NodeHtmlMarkdown,
  NodeHtmlMarkdownOptions,
} = require('node-html-markdown')

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
      const filename = post.slug + '.md'
      let content = '---\n'
      content += 'title: "' + post.title.rendered + '"\n'
      content += 'date: "' + post.date + '"\n'
      content +=
        'excerpt: "' + NodeHtmlMarkdown.translate(post.excerpt.rendered) + '"\n'
      content += 'categories:\n'
        post.categories.forEach((category) => {
            const cat = Categories.find((cat) => cat.id === category)
            content += '  - ' + cat.name + '\n'
        })
      content += '---\n'
      content += NodeHtmlMarkdown.translate(post.content.rendered)
      fs.writeFileSync('content/blog/de/' + filename, content)
      console.log('wrote ' + filename)
    })
  })
  .catch(function (error) {
    console.log(error)
  })
