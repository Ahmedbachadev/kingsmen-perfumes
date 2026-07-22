const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src/admin');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // match space followed by colon followed by valid class characters
  content = content.replace(/ :[a-zA-Z0-9\-\/\[\]\.\#]+/g, '');
  // match quote followed by colon
  content = content.replace(/" :[a-zA-Z0-9\-\/\[\]\.\#]+/g, '"');
  content = content.replace(/ \":[a-zA-Z0-9\-\/\[\]\.\#]+/g, '"');
  // cleanup double spaces
  content = content.replace(/ +/g, ' ');
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
});
