const fs = require('fs/promises');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const folderPathCopy = path.join(__dirname, 'files-copy');

async function copyDir(dir, copyDir) {
  try {
    await fs.rm(copyDir, {
      recursive: true,
      force: true,
    });
    await fs.mkdir(copyDir, { recursive: true });
    const copyFiles = await fs.readdir(dir, {
      withFileTypes: true,
    });
    for (const file of copyFiles) {
      if (file.isFile()) {
        await fs.copyFile(
          path.join(dir, file.name),
          path.join(copyDir, file.name),
        );
      } else {
        await copyDir(
          path.join(dir, file.name),
          path.join(copyDir, file.name),
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir(folderPath, folderPathCopy);