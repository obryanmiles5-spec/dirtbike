const fs = require('fs');
let code = fs.readFileSync('src/views/Home.tsx', 'utf-8');
code = code.replace(/router\.push\('\/shop\?category=\/shop'\)/g, "router.push('/shop')");
fs.writeFileSync('src/views/Home.tsx', code);
