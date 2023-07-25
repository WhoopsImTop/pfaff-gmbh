const fs = require('fs');
const path = require('path');
const glob = require('glob');

function findMarkdownFiles(dir) {
  return glob.sync(`${dir}/**/**/*.md`);
}

function renameFilesWithTitles(files) {
  files.forEach(file => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${file}: ${err}`);
        return;
      }

      const titleRegex = /^title:\s*(.*?)\s*$/im;
      const match = data.match(titleRegex);

      if (match) {
        const newFileName = `${path.dirname(file)}/${match[1].trim()}.md`;

        fs.rename(file, newFileName, err => {
          if (err) {
            console.error(`Error renaming file ${file}: ${err}`);
          } else {
            console.log(`Renamed ${file} to ${newFileName}`);
          }
        });
      } else {
        console.warn(`No title found in ${file}`);
      }
    });
  });
}

const contentDir = path.join(__dirname, 'content');
const markdownFiles = findMarkdownFiles(contentDir);
console.log(markdownFiles);
renameFilesWithTitles(markdownFiles);
