const fs = require('fs');
let code = fs.readFileSync('src/data/bikes.ts', 'utf-8');
code = code.replace(/"category": "power"/g, '"category": "battery"');
fs.writeFileSync('src/data/bikes.ts', code);
