const fs = require('fs');
const path = require('path');
const nodePandoc = require('node-pandoc');
const yaml = require('js-yaml');
var yamlFront = require('yaml-front-matter');

const getFilesToConvert = (dir, filesToConvert) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fPath = path.join(dir, file);
    const stat = fs.lstatSync(fPath);
    if (stat.isDirectory()) {
      getFilesToConvert(fPath, filesToConvert);
    } else {
      filesToConvert.push(fPath);
    }
  });
};

const convertToWord = async (filesToConvert, outputDir) => {
  for (const file of filesToConvert) {
    const fileName = path.basename(file, path.extname(file));
    const dir = path.dirname(file);
    const outputFile = path.join(outputDir, fileName + '.docx');

    //create a temporary file that adds keys of frontmatter to the markdown file to make it compatible with pandoc
    const tempFile = path.join(dir, fileName + '.tmp');
    const frontmatter = fs.readFileSync(file, 'utf8');

    let head = yamlFront.loadFront(frontmatter);

    //convert head to readable docx format
    let headDocx = '';
    for (const key in head) {
      if (key !== '__content') {
        headDocx += '<p>' + key + ': ' + head[key] + '</p>\n';
      }
    }

    const fileContent = headDocx + '\n' + head.__content;
   

    fs.writeFileSync(tempFile, fileContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', tempFile, err);
      }
    });
    try {
      await promisifyNodePandoc(tempFile, outputFile);
      console.log('File converted:', file);
    } catch (err) {
      console.error('Error converting file:', file, err);
    }
  }
};

const promisifyNodePandoc = (inputFile, outputFile) => {
  return new Promise((resolve, reject) => {
    nodePandoc(inputFile, '-f markdown -t docx -o ' + outputFile, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const convert = async (inputDir, outputDir) => {
  const filesToConvert = [];
  getFilesToConvert(inputDir, filesToConvert);
  await convertToWord(filesToConvert, outputDir);
};

convert('content/blog/de', 'word/blog/de')
  .then(() => {
    console.log('Conversion completed successfully.');
  })
  .catch((error) => {
    console.error('Conversion failed:', error);
  });