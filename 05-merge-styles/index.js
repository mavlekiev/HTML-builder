const fs = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, 'styles');
const fileCss = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeCssFiles() {
  try {
    const files = await fs.readdir(dir);
    const filesCss = files.filter((file) => path.extname(file) === '.css');
    let bundle = '';
    
    for (const file of filesCss) {
      const filePath = path.join(dir, file);
      const dataOfFile = await fs.readFile(filePath, 'utf8');
      bundle += dataOfFile + '\n';
    }
    
    await fs.writeFile(fileCss, bundle);
  } catch (err) {
    console.error('Error ', err)
  }
}
mergeCssFiles();