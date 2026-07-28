const fs = require('fs');

let code = fs.readFileSync('src/views/Home.tsx', 'utf-8');

const imports = `import Image from 'next/image';
import heroCover from '../../public/hero-cover.jpg';
import electricDirtBikes from '../../public/Electric-Dirt-Bikes.webp';
import eBikes from '../../public/E-Bikes.jpg';
import accessories from '../../public/Accessories.png';
import promoBanner from '../../public/promo-banner.jpg';
import featuredCover from '../../public/featured-cover.jpg';
`;

// Insert imports after other imports
code = code.replace(/import { useRouter } from 'next\/navigation';/, "import { useRouter } from 'next/navigation';\n" + imports);

// Replace img tags
code = code.replace(
  /<img\s+src="\/hero-cover\.jpg"\s+alt="Untamed Power"\s+className="absolute inset-0 w-full h-full object-cover opacity-70"\s+referrerPolicy="no-referrer" \/>/g,
  '<Image src={heroCover} alt="Untamed Power" className="absolute inset-0 w-full h-full object-cover opacity-70" referrerPolicy="no-referrer" />'
);

code = code.replace(
  /<img src="\/Electric-Dirt-Bikes\.webp" alt="Electric Dirt Bikes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" \/>/g,
  '<Image src={electricDirtBikes} alt="Electric Dirt Bikes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />'
);

code = code.replace(
  /<img src="\/E-Bikes\.jpg" alt="E-Bikes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" \/>/g,
  '<Image src={eBikes} alt="E-Bikes" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />'
);

code = code.replace(
  /<img src="\/Accessories\.png" alt="Accessories" className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" \/>/g,
  '<Image src={accessories} alt="Accessories" className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />'
);

code = code.replace(
  /<img\s+src="\/promo-banner\.jpg"\s+alt="Promo Banner"\s+className="w-full h-full object-cover"\s+referrerPolicy="no-referrer" \/>/g,
  '<Image src={promoBanner} alt="Promo Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />'
);

code = code.replace(
  /<img\s+src="\/featured-cover\.jpg"\s+alt="Featured Products Cover"\s+className="w-full max-w-md h-auto max-h-\[70vh\] object-contain mx-auto rounded-xl relative z-10"\s+referrerPolicy="no-referrer" \/>/g,
  '<Image src={featuredCover} alt="Featured Products Cover" className="w-full max-w-md h-auto max-h-[70vh] object-contain mx-auto rounded-xl relative z-10" referrerPolicy="no-referrer" />'
);

fs.writeFileSync('src/views/Home.tsx', code);
