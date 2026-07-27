const fs = require('fs');

let homeCode = fs.readFileSync('src/views/Home.tsx', 'utf-8');
homeCode = homeCode.replace("import { BikeCard } from '../components/BikeCard';", "import { BikeCard } from '../components/BikeCard';\nimport { useAppContext } from '../context/AppContext';\nimport { useRouter } from 'next/navigation';");
homeCode = homeCode.replace("export const Home: React.FC<HomeProps> = ({ onSelectBike, onNavigateToShop }) => {", "export const Home: React.FC<HomeProps> = ({ onNavigateToShop }) => {\n  const { setSelectedBike } = useAppContext();\n  const router = useRouter();");
homeCode = homeCode.replace(/onSelectBike=\{onSelectBike\}/g, "onSelectBike={setSelectedBike}");
homeCode = homeCode.replace(/onNavigateToShop\?\./g, "router.push");
homeCode = homeCode.replace(/router\.push\(\)/g, "router.push('/shop')");
homeCode = homeCode.replace(/router\.push\('([^']+)'\)/g, "router.push('/shop?category=$1')");
fs.writeFileSync('src/views/Home.tsx', homeCode);

let shopCode = fs.readFileSync('src/views/Shop.tsx', 'utf-8');
shopCode = shopCode.replace("import { BikeCard } from '../components/BikeCard';", "import { BikeCard } from '../components/BikeCard';\nimport { useAppContext } from '../context/AppContext';");
shopCode = shopCode.replace("export const Shop: React.FC<ShopProps> = ({ onSelectBike, initialSearchQuery = '' }) => {", "export const Shop: React.FC<ShopProps> = ({ initialSearchQuery = '' }) => {\n  const { setSelectedBike } = useAppContext();");
shopCode = shopCode.replace(/onSelectBike=\{onSelectBike\}/g, "onSelectBike={setSelectedBike}");
fs.writeFileSync('src/views/Shop.tsx', shopCode);

