const fs = require('fs');
let code = fs.readFileSync('src/components/BikeDetailModal.tsx', 'utf-8');

// The quick stats div starts with:
// <div className="grid grid-cols-3 gap-2 p-3 bg-[#0B0B0B] rounded-xl border border-zinc-800 mb-6 font-mono">
const quickStatsStr = '<div className="grid grid-cols-3 gap-2 p-3 bg-[#0B0B0B] rounded-xl border border-zinc-800 mb-6 font-mono">';
if (code.includes(quickStatsStr)) {
  code = code.replace(quickStatsStr, '{bike.specs.peakPowerKW > 0 && (\n' + quickStatsStr);
} else {
  console.log('Not found');
}

// And closes before:
// {/* Description */}
const descStr = '{/* Description */}';
if (code.includes(descStr)) {
  code = code.replace('              </div>\n              {/* Description */}', '              </div>\n              )}\n              {/* Description */}');
}

fs.writeFileSync('src/components/BikeDetailModal.tsx', code);
console.log('Done');
