const fs = require('fs');
let code = fs.readFileSync('src/components/BikeDetailModal.tsx', 'utf-8');

code = code.replace(
  '              </div>\n              )}\n\n              {/* Urgency Crate Dispatch Banner */}',
  '              </div>\n\n              {/* Urgency Crate Dispatch Banner */}'
);

fs.writeFileSync('src/components/BikeDetailModal.tsx', code);
