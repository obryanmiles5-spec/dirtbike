const fs = require('fs');
let code = fs.readFileSync('src/views/Contact.tsx', 'utf-8');
code = code.replace(
  "import { FAQS_DATA } from '../data/faqs';",
  "import { FAQS_DATA } from '../data/faqs';\nimport { useAppContext } from '../context/AppContext';"
);
code = code.replace(
  "export const Contact: React.FC<ContactProps> = ({ onOpenTestRide }) => {",
  "export const Contact: React.FC<ContactProps> = ({ onOpenTestRide: _unused }) => {\n  const { setIsTestRideOpen } = useAppContext();\n  const onOpenTestRide = () => setIsTestRideOpen(true);"
);
fs.writeFileSync('src/views/Contact.tsx', code);
