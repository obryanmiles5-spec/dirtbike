const fs = require('fs');

let code = fs.readFileSync('src/components/TrustPilotSlider.tsx', 'utf-8');

const imports = `import Image from 'next/image';
import reviewsBg from '../../public/reviews-bg.jpg';
`;

// Insert imports after other imports
code = code.replace(/import { Star } from 'lucide-react';/, "import { Star } from 'lucide-react';\n" + imports);

// Replace img tags
code = code.replace(
  /<img src="\/reviews-bg\.jpg" alt="Reviews Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" \/>/g,
  '<Image src={reviewsBg} alt="Reviews Background" className="w-full h-full object-cover" referrerPolicy="no-referrer" />'
);

fs.writeFileSync('src/components/TrustPilotSlider.tsx', code);
