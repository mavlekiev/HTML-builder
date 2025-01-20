const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPathCopy = path.join(__dirname, 'files-copy');

async function copyDir(dir, copyDir) {
  try {
    await fs.mkdir(copyDir, { recursive: true });
    const files = await fs.readdir(dir, { withFileTypes: true });

    files.forEach(async (file) => {
      if (file.isFile()) {
        await fs.copyFile(path.join(dir, file.name), path.join(copyDir, file.name));
      } else {
        await copyDir(path.join(dir, file.name), path.join(copyDir, file.name));
      }
    });
  } catch (err) {
    console.error(err);
  }
}

copyDir(folderPath, folderPathCopy);