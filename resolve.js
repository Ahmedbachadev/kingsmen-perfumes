import fs from 'fs';
import path from 'path';

function resolveConflictsInFile(filePath) {
  const originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;
  
  while (content.includes('<<<<<<< HEAD')) {
    const startIdx = content.indexOf('<<<<<<< HEAD');
    const midIdx = content.indexOf('=======', startIdx);
    const endIdx = content.indexOf('>>>>>>>', midIdx);
    
    if (midIdx === -1 || endIdx === -1) {
      console.log('Malformed conflict marker in ' + filePath);
      break;
    }
    
    // Find the end of the >>>>>>> line
    let nextNewLine = content.indexOf('\n', endIdx);
    if (nextNewLine === -1) nextNewLine = content.length;
    else nextNewLine += 1;
    
    // THEIRS is between =======\n and >>>>>>>
    const theirsContent = content.substring(content.indexOf('\n', midIdx) + 1, endIdx);
    
    content = content.substring(0, startIdx) + theirsContent + content.substring(nextNewLine);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Resolved: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      resolveConflictsInFile(fullPath);
    }
  }
}

walkDir(path.join(process.cwd(), 'src'));
console.log('Done resolving conflicts using THEIRS.');
