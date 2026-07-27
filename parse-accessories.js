const fs = require('fs');
const d = require('./accessories.json');

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/\n+/g, ' ').trim();
}

const parsedAccessories = d.map(p => {
  const price = p.prices.price ? (parseInt(p.prices.price) / Math.pow(10, p.prices.currency_minor_unit)) : 0;
  const image = p.images && p.images[0] ? p.images[0].src : '';
  const desc = stripHtml(p.description || p.short_description) || '';

  return {
    id: p.slug,
    name: p.name,
    category: "power",
    price: price,
    image: image,
    description: desc || p.name
  };
});

fs.writeFileSync('parsed-accessories.json', JSON.stringify(parsedAccessories, null, 2));
console.log('Parsed ' + parsedAccessories.length + ' accessories to parsed-accessories.json');
