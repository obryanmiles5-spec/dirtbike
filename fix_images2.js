const fs = require('fs');

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');
  // First, undo the broken replacement
  code = code.replace(/\/ referrerPolicy="no-referrer" \/>/g, '/>');
  
  // Now do it properly. Remove trailing slash if present, then add our string.
  code = code.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.includes('referrerPolicy')) {
      return match;
    }
    
    // Remove trailing slash and whitespace
    let inner = p1.replace(/\s*\/?\s*$/, '');
    return `<img${inner} referrerPolicy="no-referrer" />`;
  });
  
  fs.writeFileSync(filePath, code);
}

// We need to restore original files first before fixing to avoid double referrerPolicies
