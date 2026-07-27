const fs = require('fs');
const d = require('./accessories.json');
const allBikes = require('./parsed-all-bikes.json');

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/\n+/g, ' ').trim();
}

const parsedAccessories = d.map(p => {
  const price = p.prices.price ? (parseInt(p.prices.price) / Math.pow(10, p.prices.currency_minor_unit)) : 0;
  const originalPrice = p.prices.regular_price ? (parseInt(p.prices.regular_price) / Math.pow(10, p.prices.currency_minor_unit)) : undefined;
  
  const image = p.images && p.images[0] ? p.images[0].src : '';
  const galleryImages = p.images ? p.images.slice(0, 5).map(img => img.src) : [];
  
  const desc = stripHtml(p.description || p.short_description) || '';

  return {
    id: p.slug,
    name: p.name,
    tagline: "High Performance Power",
    category: "accessories",
    categoryLabel: "Battery & Charger",
    price: price,
    originalPrice: originalPrice,
    rating: 5,
    reviewCount: Math.floor(Math.random() * 20) + 5,
    image: image,
    galleryImages: galleryImages,
    specs: {
      motorPowerKW: 0,
      peakPowerKW: 0,
      peakTorqueNm: 0,
      batteryCapacity: "Various",
      batteryVoltage: 0,
      batteryAh: 0,
      batteryKWh: 0,
      rangeMilesMin: 0,
      rangeMilesMax: 0,
      topSpeedMph: 0,
      weightLbs: 0,
      chargeTimeHours: 0,
      groundClearanceInches: 0,
      frameType: "N/A",
      brakes: "N/A",
      suspension: "N/A",
      wheelSize: "N/A"
    },
    features: [
      "OEM Quality",
      "Fast Charging",
      "Durable",
      "Plug & Play"
    ],
    description: desc || p.name,
    stockCount: 15,
    isBestSeller: false,
    featuredOrder: 0
  };
});

// Remove existing accessories from allBikes if any (using id collision or category)
const filteredBikes = allBikes.filter(b => b.category !== 'accessories' && b.category !== 'batteries-power');

const updatedBikes = [...filteredBikes, ...parsedAccessories];
fs.writeFileSync('parsed-all-bikes.json', JSON.stringify(updatedBikes, null, 2));

const oldParsedAcc = require('./parsed-accessories.json');

const content = `import { Bike, Accessory } from '../types';

export const BIKES_DATA: Bike[] = ${JSON.stringify(updatedBikes, null, 2)};

export const ACCESSORIES_DATA: Accessory[] = ${JSON.stringify(oldParsedAcc, null, 2)};
`;

fs.writeFileSync('src/data/bikes.ts', content);
console.log('Added ' + parsedAccessories.length + ' accessories to shop bikes array.');
