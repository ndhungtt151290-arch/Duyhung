const fs = require('fs');
const path = require('path');

function findDir(dir, targetName) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        if (file === targetName) {
          console.log("Found:", fullPath);
        }
        findDir(fullPath, targetName);
      }
    } catch(e) {}
  }
}

findDir('.', 'upload');
findDir('.', 'image');
