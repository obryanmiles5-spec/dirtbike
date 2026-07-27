const fs = require('fs');

function fixFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf-8');
  // Add referrerPolicy="no-referrer" to all img tags that don't have it
  code = code.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.includes('referrerPolicy')) {
      return match;
    }
    return `<img${p1} referrerPolicy="no-referrer" />`;
  });
  fs.writeFileSync(filePath, code);
}

fixFile('src/views/Home.tsx');
fixFile('src/components/TrustPilotSlider.tsx');
