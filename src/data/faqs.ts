export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-range',
    category: 'Battery & Range',
    question: 'How far can I ride on a single battery charge?',
    answer: 'Range varies depending on bike model, battery capacity, terrain, and riding mode. For example, our VOLT Stealth Pro 72V delivers 45 to 75 miles per charge. Moderate trail riding in Eco mode yields maximum distance, while full-throttle motocross track laps consume battery faster. You can also carry a swappable battery pack to instantly double your range in under 10 seconds!'
  },
  {
    id: 'faq-charge',
    category: 'Battery & Range',
    question: 'How long does it take to charge an electric dirt bike?',
    answer: 'Using our standard fast charger plugged into any standard household 110V AC outlet, charging from 0% to 100% takes approximately 2 to 3 hours. With our 15A Ultra-Fast Smart Charger, you can reach 80% capacity in under 50 minutes during lunch or trail breaks.'
  },
  {
    id: 'faq-water',
    category: 'Durability & IP Ratings',
    question: 'Can I ride in heavy mud, rain, or cross deep streams?',
    answer: 'Yes! All VOLT-X electric dirt bikes feature IP67 water-and-mud resistant seals across the motor casing, battery enclosure, and FOC controller. You can blast through rain, mud, and water crossings up to axle height with complete confidence.'
  },
  {
    id: 'faq-maintenance',
    category: 'Maintenance',
    question: 'What maintenance is required compared to a gas dirt bike?',
    answer: 'Electric dirt bikes require up to 90% less maintenance! There are no oil changes, no spark plugs, no air filters to oil, no clutch plates to burn out, and no carburetor tuning. You only need to maintain basic bicycle/motorcycle wear items: brake pads, tire pressure, chain lubrication, and suspension tuning.'
  },
  {
    id: 'faq-street-legal',
    category: 'Legality & Shipping',
    question: 'Are VOLT electric dirt bikes street legal?',
    answer: 'Selected models, such as the VOLT Hyper-R 80V Supermoto, come equipped with a full DOT street-legal lighting kit (LED headlight, tail light, turn signals, horn, mirrors, and side reflectors) and a 17-digit VIN number for registration at your local DMV as a dual-sport motorcycle or moped depending on state laws.'
  },
  {
    id: 'faq-shipping',
    category: 'Legality & Shipping',
    question: 'How are the bikes shipped to my home?',
    answer: 'We offer nationwide white-glove freight delivery directly to your doorstep in a heavy-duty steel protection frame and crate. Every bike arrives 95% pre-assembled; you simply attach the handlebars and front wheel (tools included). You can also opt for local certified dealer pickup and setup.'
  },
  {
    id: 'faq-two-seater',
    category: '2-Seater & Passenger Capacity',
    question: 'Do you offer 2-seater electric dirt bikes and bicycles with passenger sit carriers?',
    answer: 'Yes! We offer specialized 2-seater electronic dirt bikes and dual-passenger e-dirt bicycles equipped with extended sit carrier benches, foldable CNC aluminum rear passenger footpegs, passenger grab rails, and reinforced steel subframes rated up to 450 lbs. Check out our VOLT Tandem Duo 72V and Scrambler Duo-2X models!'
  }
];
