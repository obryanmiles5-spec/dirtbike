const fs = require('fs');
const data = require('./scraped-bikes.json');

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/\n+/g, ' ').trim();
}

const bikes = data.products.map(p => {
  const price = p.variants[0] ? parseFloat(p.variants[0].price) : 0;
  const originalPrice = p.variants[0] && p.variants[0].compare_at_price ? parseFloat(p.variants[0].compare_at_price) : undefined;
  const image = p.images[0] ? p.images[0].src : '';
  const galleryImages = p.images.slice(0, 5).map(img => img.src);
  
  // Try to parse some specs from body_html
  const body = stripHtml(p.body_html) || '';
  
  let motorPowerKW = 4.5;
  if (body.includes('4500W')) motorPowerKW = 4.5;
  if (body.includes('8000W')) motorPowerKW = 8.0;
  if (body.includes('12000W')) motorPowerKW = 12.0;

  let topSpeed = 50;
  const speedMatch = body.match(/(\d+)MPH/);
  if (speedMatch) topSpeed = parseInt(speedMatch[1]);

  return {
    id: p.handle,
    name: p.title,
    tagline: "Unleash the Power",
    category: "electric-dirt-bikes",
    categoryLabel: "Electric Dirt Bike",
    price: price,
    originalPrice: originalPrice,
    rating: 5,
    reviewCount: Math.floor(Math.random() * 50) + 10,
    image: image,
    galleryImages: galleryImages,
    specs: {
      motorPowerKW: motorPowerKW,
      peakPowerKW: motorPowerKW * 1.5,
      peakTorqueNm: 280,
      batteryCapacity: "72V",
      batteryVoltage: 72,
      batteryAh: 40,
      batteryKWh: 2.8,
      rangeMilesMin: 30,
      rangeMilesMax: 60,
      topSpeedMph: topSpeed,
      weightLbs: 140,
      chargeTimeHours: 4,
      groundClearanceInches: 11,
      frameType: "Aluminum",
      brakes: "Hydraulic Disc",
      suspension: "Adjustable",
      wheelSize: "19\" Front / 18\" Rear"
    },
    features: [
      "High-Torque Motor",
      "Long-Range Battery",
      "Adjustable Suspension",
      "Quick Charge"
    ],
    description: body || p.title,
    stockCount: 10,
    isBestSeller: Math.random() > 0.5,
    featuredOrder: Math.floor(Math.random() * 10)
  };
});

fs.writeFileSync('parsed-bikes.json', JSON.stringify(bikes, null, 2));
console.log('Parsed bikes to parsed-bikes.json');
