const fs = require('fs');
let code = fs.readFileSync('src/views/Home.tsx', 'utf-8');
code = code.replace(
  '<img src="/Accessories.png" alt="Accessories" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-white" />',
  '<img src="/Accessories.png" alt="Accessories" className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" />'
);
fs.writeFileSync('src/views/Home.tsx', code);
