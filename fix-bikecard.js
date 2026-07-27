const fs = require('fs');
let code = fs.readFileSync('src/components/BikeCard.tsx', 'utf-8');
code = code.replace(
  "{/* KEY SPECIFICATION PILLS (Peak Power, Battery, Max Range) */}",
  "{/* KEY SPECIFICATION PILLS (Peak Power, Battery, Max Range) */}\n        {(bike.specs.peakPowerKW > 0 || bike.specs.batteryVoltage > 0 || bike.specs.rangeMilesMax > 0) && ("
);
code = code.replace(
  "        </div>\n        {/* Price & Add to Cart Footer */}",
  "        </div>\n        )}\n        {/* Price & Add to Cart Footer */}"
);
fs.writeFileSync('src/components/BikeCard.tsx', code);
