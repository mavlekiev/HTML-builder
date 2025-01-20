const fs = require('fs/promises');
const path = require('path');

const dirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');

function copyDir() {
  fs.mkdir(newDirPath, { recursive: true }).then((result) => {
    if (!result) {
      fs.readdir(newDirPath, { withFileTypes: true }).then((result) => {
        for (const file of result) {
          fs.unlink(path.join(newDirPath, file.name));
        }
      });
    }
    fs.readdir(dirPath, { withFileTypes: true }).then((result) => {
      for (const file of result) {
        if (file.isFile()) {
          fs.copyFile(path.join(dirPath, file.name), path.join(newDirPath, file.name));
        }
      }
    });
  });
}

copyDir();