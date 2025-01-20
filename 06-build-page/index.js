const fs = require('fs/promises');
const path = require('path');

const dir = path.join(__dirname, 'styles');
const fileCss = path.join(__dirname, 'project-dist', 'style.css');
const assetsPath = path.join(__dirname, 'assets');
const assetsFilesPath = path.join(__dirname, 'project-dist', 'assets');

async function mergeCssFiles() {
  try {
    const files = await fs.readdir(dir);
    const filesCss = files.filter((file) => path.extname(file) === '.css');
    const bundle = [];
    
    for (const file of filesCss) {
      const filePath = path.join(dir, file);
      const dataOfFile = await fs.readFile(filePath, 'utf8');
      bundle.push(dataOfFile);
    }
    
    await fs.writeFile(fileCss, bundle.join(','));
  } catch (err) {
    console.error('Error ', err)
  }
}

async function copyDir(fromDir, toDir) {
  try {
    await fs.rm(toDir, {
      recursive: true,
      force: true,
    });
    await fs.mkdir(toDir, { recursive: true });
    const copyFiles = await fs.readdir(fromDir, {
      withFileTypes: true,
    });
    for (const file of copyFiles) {
      if (file.isFile()) {
        await fs.copyFile(
          path.join(fromDir, file.name),
          path.join(toDir, file.name),
        );
      } else {
        await copyDir(
          path.join(fromDir, file.name),
          path.join(toDir, file.name),
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function create() {
  try {
    const distDir = path.join(__dirname, 'project-dist');
    
    await fs.mkdir(distDir, { recursive: true });

    const templatePath = path.join(__dirname, 'template.html');
    let templateContent = await fs.readFile(templatePath, 'utf-8');

    const componentsDir = path.join(__dirname, 'components');
    const componentFiles = await fs.readdir(componentsDir);

    for (const file of componentFiles) {
      if (path.extname(file) === '.html') {
        const name = path.basename(file, '.html');
        const componentContent = await fs.readFile(
          path.join(componentsDir, file),
          'utf-8',
        );
        const reg = new RegExp(`{{${name}}}`, 'g');
        templateContent = templateContent.replace(reg, componentContent);
      }
    }

    const indexPath = path.join(distDir, 'index.html');
    await fs.writeFile(indexPath, templateContent);

    await mergeCssFiles();

    await copyDir(assetsPath, assetsFilesPath);
  } catch (err) {
    console.error(err);
  }
}

create();