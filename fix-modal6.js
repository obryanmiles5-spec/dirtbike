const fs = require('fs');
let code = fs.readFileSync('src/components/BikeDetailModal.tsx', 'utf-8');

code = code.replace(
  '              </div>\n              )}\n              {/* Urgency Crate Dispatch Banner */}',
  '              </div>\n\n              {/* Urgency Crate Dispatch Banner */}'
);

code = code.replace(
  '{/* Quick Spec Highlights Strip */}\n              {bike.specs.peakPowerKW > 0 && (\n              <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono">',
  '{/* Quick Spec Highlights Strip */}\n              <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950 rounded-xl border border-zinc-800 font-mono">'
);


fs.writeFileSync('src/components/BikeDetailModal.tsx', code);
