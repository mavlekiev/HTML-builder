const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

const writeStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

console.log('Enter text or the word "exit" to exit');

rl.on('line', (input) => {
  if (input.toString().toLowerCase().trim() === 'exit') {
    rl.close();
  } else {
    writeStream.write(input + '\n');
  }
});

rl.on('SIGCONT', () => {
  rl.close();
})

rl.on('close', () => {
  console.log('Recording complete. Exit');
  writeStream.close(); 
});




