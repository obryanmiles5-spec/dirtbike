const fs = require('fs');
const bikes = require('./parsed-bikes.json');

const content = `import { Bike, Accessory } from '../types';

export const BIKES_DATA: Bike[] = ${JSON.stringify(bikes, null, 2)};

export const ACCESSORIES_DATA: Accessory[] = [
  {
    id: "acc-helmet",
    name: "Carbon Fiber Off-Road Helmet",
    category: "protection",
    price: 299.99,
    image: "/accessories-image.png",
    description: "Ultra-lightweight DOT approved helmet."
  },
  {
    id: "acc-charger",
    name: "Fast Charger 15A",
    category: "charger",
    price: 149.99,
    image: "/accessories-image.png",
    description: "Charge your battery in half the time."
  }
];
`;

fs.writeFileSync('src/data/bikes.ts', content);
console.log('Updated src/data/bikes.ts');
