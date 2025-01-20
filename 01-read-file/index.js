const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath);

readStream.on('data', (data) => {
  console.log(data.toString());
});

readStream.on('error', (err) => {
  console.error('An error occurred while reading from file:', err);
});