const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

const contentDir = path.join(__dirname, 'content', 'blog');

function addMoreTagIfMissing(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { attributes, body } = frontMatter(content);
  
  if (!body.includes('<!--more-->')) {
    const excerpt = body.split('\n').slice(0, 3).join('\n');
    const updatedContent = `---\n${frontMatter.stringify(attributes)}\n---\n\n${excerpt}\n\n<!--more-->\n\n${body}`;
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
