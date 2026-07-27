const fs = require('fs');
let code = fs.readFileSync('src/components/BikeDetailModal.tsx', 'utf-8');

// 1. Fix header badge
code = code.replace(
  '<span className="px-2.5 py-1 rounded bg-lime-400 text-zinc-950 text-xs font-black uppercase tracking-wider">\n              {bike.specs.peakPowerKW}kW PEAK OUTPUT\n            </span>',
  '{bike.specs.peakPowerKW > 0 && (\n            <span className="px-2.5 py-1 rounded bg-lime-400 text-zinc-950 text-xs font-black uppercase tracking-wider">\n              {bike.specs.peakPowerKW}kW PEAK OUTPUT\n            </span>\n            )}'
);

// 2. Fix quick specs stats section
const quickStatsStr = `{/* Quick Stats Row */}
              <div className="grid grid-cols-3 divide-x divide-zinc-800 border border-zinc-800 rounded-xl bg-zinc-950/50 mb-6">`;

code = code.replace(
  quickStatsStr,
  `{/* Quick Stats Row */}
              {(bike.specs.peakPowerKW > 0 || bike.specs.rangeMilesMax > 0 || bike.specs.topSpeedMph > 0) && (
              <div className="grid grid-cols-3 divide-x divide-zinc-800 border border-zinc-800 rounded-xl bg-zinc-950/50 mb-6">`
);

const endQuickStats = `                </div>
              </div>`;

// Actually doing string matching for the close of Quick Stats Row is tricky. I'll use a regex or string replacement carefully.
