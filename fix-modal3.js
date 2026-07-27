const fs = require('fs');
let code = fs.readFileSync('src/components/BikeDetailModal.tsx', 'utf-8');

const quickStr = '{/* Quick Spec Highlights Strip */}\n              <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono">';
code = code.replace(
  quickStr, 
  '{/* Quick Spec Highlights Strip */}\n              {bike.specs.peakPowerKW > 0 && (\n              <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono">'
);

// We need to close it. The block ends right before {/* Add to Cart Action */} or something else? Let's check what comes after.
