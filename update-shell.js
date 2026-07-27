const fs = require('fs');
let code = fs.readFileSync('src/components/ClientAppShell.tsx', 'utf-8');

code = code.replace(
  "import { Bike, OrderDetails } from '@/types';",
  "import { Bike, OrderDetails } from '@/types';\nimport { useAppContext } from '@/context/AppContext';"
);

code = code.replace(
  "  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);\n  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);\n  const [isTestRideOpen, setIsTestRideOpen] = useState(false);\n  const [testRideBikeName, setTestRideBikeName] = useState<string | undefined>(undefined);\n  const [isQuizOpen, setIsQuizOpen] = useState(false);",
  "  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);\n  const { selectedBike, setSelectedBike, isQuizOpen, setIsQuizOpen, isTestRideOpen, setIsTestRideOpen, testRideBikeName, setTestRideBikeName } = useAppContext();"
);

const childrenCloneRegex = /\{React\.Children\.map\(children, \(child\) => \{[\s\S]*?\}\)\}/m;
code = code.replace(childrenCloneRegex, '{children}');

fs.writeFileSync('src/components/ClientAppShell.tsx', code);
