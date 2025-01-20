const readdir = require('node:fs/promises');
const path = require('node:path');

const dirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');

function copyDir() {
  readdir.mkdir(newDirPath, { recursive: true }).then((result) => {
    if (!result) {
      readdir.readdir(newDirPath, { withFileTypes: true }).then((result) => {
        for (const file of result) {
          readdir.unlink(path.join(newDirPath, file.name));
        }
      });
    }
    readdir
      .readdir(dirPath, { withFileTypes: true })
      .then((result) => {
        for (const file of result) {
          if (file.isFile()) {
            readdir.copyFile(
              path.join(dirPath, file.name),
              path.join(newDirPath, file.name),
            );
          }
        }
      });
  });
}

copyDir();