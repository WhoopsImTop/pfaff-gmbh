const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

const contentDir = path.join(__dirname, 'content', 'blog');

function addMoreTagIfMissing(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { attributes, body } = frontMatter(content);
  //convert attributes to frontmatter
  const frontmatterAttributes = Object.keys(attributes).map((key) => `${key}: ${attributes[key]}`).join('\n');
  
  if (!body.includes('<!--more-->')) {
    const blockContent = body;
    const excerpt = blockContent.slice(0, 100);
    const updatedBlockContent = excerpt + '\n\n<!--more-->\n\n' + blockContent.slice(excerpt.length);
    const updatedContent = `---\n${frontmatterAttributes}\n---\n\n${updatedBlockContent}`;
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Updated file: ${filePath}`);
  }
}

function processFilesInLanguage(language) {
  const languageDir = path.join(contentDir, language);
  const files = fs.readdirSync(languageDir);
  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(languageDir, file);
      addMoreTagIfMissing(filePath);
    }
  });
}

function processAllLanguages() {
  const languages = ['de', 'en'];
  languages.forEach((language) => {
    processFilesInLanguage(language);
  });
}

processAllLanguages();
