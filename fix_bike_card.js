const fs = require('fs');
let code = fs.readFileSync('src/components/BikeCard.tsx', 'utf-8');
code = code.replace('bg-[#0B0B0B]', 'bg-white');
fs.writeFileSync('src/components/BikeCard.tsx', code);
