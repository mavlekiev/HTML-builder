const path = require('path');
const fs = require('fs');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log('Error reading ', err);
  } 
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileExtension = path.extname(file.name).slice(1);
      const fileName = path.basename(file.name).split('.')[0].toString();
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error getting file statistics', err);
        }
        const fileSize = (stats.size / 1000);
        console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
        });
      }    
    });  
});