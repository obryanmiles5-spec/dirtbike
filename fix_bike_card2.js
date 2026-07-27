const fs = require('fs');
let code = fs.readFileSync('src/components/BikeCard.tsx', 'utf-8');

code = code.replace(
  'className="group bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden flex flex-col transition-all duration-200 hover:border-lime-400/60 hover:shadow-lg hover:shadow-lime-400/10 cursor-pointer"',
  'className="group flex flex-col transition-all duration-200 cursor-pointer h-full"'
);

// We need to keep image wrapper rounded
code = code.replace(
  'className="relative aspect-square bg-white overflow-hidden"',
  'className="relative aspect-square bg-white overflow-hidden rounded-xl mb-4"'
);

// Remove the p-4 from the Content Container, just use standard spacing
code = code.replace(
  'className="p-4 flex-1 flex flex-col"',
  'className="flex-1 flex flex-col px-1"'
);

fs.writeFileSync('src/components/BikeCard.tsx', code);
