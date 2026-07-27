const fs = require('fs');
const accessories = require('./parsed-accessories.json');
const allBikes = require('./parsed-all-bikes.json');

const content = `import { Bike, Accessory } from '../types';

export const BIKES_DATA: Bike[] = ${JSON.stringify(allBikes, null, 2)};

export const ACCESSORIES_DATA: Accessory[] = ${JSON.stringify(accessories, null, 2)};
`;

fs.writeFileSync('src/data/bikes.ts', content);
console.log('Updated src/data/bikes.ts with ' + accessories.length + ' accessories');
