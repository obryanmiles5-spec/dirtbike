const fs = require('fs');
const d = require('./all-products.json');

const ebikes = d.products.filter(p => 
  (JSON.stringify(p.tags).toLowerCase().includes('electric bike') || p.title.toLowerCase().includes('ebike') || p.title.toLowerCase().includes('electric tricycle')) &&
  !p.title.toLowerCase().includes('dirt bike') &&
  !p.title.toLowerCase().includes('spark') // Spark models were already added to dirt bikes
);

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/\n+/g, ' ').trim();
}

const parsedEbikes = ebikes.map(p => {
  const price = p.variants[0] ? parseFloat(p.variants[0].price) : 0;
  const originalPrice = p.variants[0] && p.variants[0].compare_at_price ? parseFloat(p.variants[0].compare_at_price) : undefined;
  const image = p.images[0] ? p.images[0].src : '';
  const galleryImages = p.images.slice(0, 5).map(img => img.src);
  
  const body = stripHtml(p.body_html) || '';
  
  let motorPowerKW = 1.0;
  if (body.includes('750W')) motorPowerKW = 0.75;
  if (body.includes('1000W')) motorPowerKW = 1.0;
  if (body.includes('500W')) motorPowerKW = 0.5;
  if (body.includes('1500W')) motorPowerKW = 1.5;

  let topSpeed = 28;
  const speedMatch = body.match(/(\d+)MPH/);
  if (speedMatch) topSpeed = parseInt(speedMatch[1]);

  return {
    id: p.handle,
    name: p.title,
    tagline: "Everyday Commuting Reimagined",
    category: "e-bikes",
    categoryLabel: "E-Bike",
    price: price,
    originalPrice: originalPrice,
    rating: 5,
    reviewCount: Math.floor(Math.random() * 50) + 10,
    image: image,
    galleryImages: galleryImages,
    specs: {
      motorPowerKW: motorPowerKW,
      peakPowerKW: motorPowerKW * 1.5,
      peakTorqueNm: 85,
      batteryCapacity: "48V",
      batteryVoltage: 48,
      batteryAh: 15,
      batteryKWh: 0.72,
      rangeMilesMin: 20,
      rangeMilesMax: 45,
      topSpeedMph: topSpeed,
      weightLbs: 65,
      chargeTimeHours: 6,
      groundClearanceInches: 8,
      frameType: "Aluminum Alloy",
      brakes: "Mechanical Disc",
      suspension: "Front Fork",
      wheelSize: "26\" / 20\""
    },
    features: [
      "Commuter Friendly",
      "Pedal Assist",
      "Integrated Lights",
      "Comfort Saddle"
    ],
    description: body || p.title,
    stockCount: 15,
    isBestSeller: Math.random() > 0.7,
    featuredOrder: 0
  };
});

// Load existing dirt bikes
let existingBikes = [];
if (fs.existsSync('./parsed-bikes.json')) {
  existingBikes = require('./parsed-bikes.json');
}

const allBikes = [...existingBikes, ...parsedEbikes];

fs.writeFileSync('parsed-all-bikes.json', JSON.stringify(allBikes, null, 2));
console.log('Added ' + parsedEbikes.length + ' ebikes. Total bikes: ' + allBikes.length);
