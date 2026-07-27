const fs = require('fs');
let code = fs.readFileSync('src/components/BikeCard.tsx', 'utf-8');
code = code.replace(
  "        </div>\n        {/* Price & Add to Cart Footer */}",
  "        </div>\n        )}\n        {/* Price & Add to Cart Footer */}"
);
fs.writeFileSync('src/components/BikeCard.tsx', code);
