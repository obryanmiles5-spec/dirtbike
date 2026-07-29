export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-what-is-surron',
    category: 'E-Moto & Brand Guides',
    question: 'What is a Surron e bike and how does it compare to VoltDirtBike models?',
    answer: 'A Surron (such as the Surron Light Bee X, Hyper Bee, or Storm Bee) is a high-performance electric dirt bike that bridges the gap between a mountain bicycle and a gas motocross motorcycle. At VoltDirtBike, our 72V and 80V e-motos offer higher peak power (up to 18kW), instant 1000Nm wheel torque, longer battery range (up to 75 miles), reinforced aircraft-grade aluminum alloy frames, and available dual-passenger 2-seater kits.'
  },
  {
    id: 'faq-speed',
    category: 'Performance & Speed',
    question: 'How fast does an electric dirt bike go and what is the fastest model?',
    answer: 'Electric dirt bike top speeds range from 35 mph on entry-level pit bikes to 55-70+ mph on high-voltage 72V and 80V adult electric motorcycles. Our VOLT Apex Pro and Hyper-R models reach top speeds of 65 to 70 mph with zero gear shifting required.'
  },
  {
    id: 'faq-street-legal',
    category: 'Legality & Licensing',
    question: 'Are electric dirt bikes street legal and do you need a license to ride on the road?',
    answer: 'Whether an electric dirt bike is street legal depends on state regulations and equipment. Models fitted with DOT-approved LED headlights, tail lights, turn signals, mirrors, horn, and a 17-digit VIN (like our VOLT Hyper-R 80V Supermoto) can be registered at your local DMV as dual-sport motorcycles or mopeds. Off-road-only models do not require a motorcycle license or title when ridden on private property, OHV parks, and designated dirt trails.'
  },
  {
    id: 'faq-cost',
    category: 'Pricing & Purchasing',
    question: 'How much does a Surron or adult electric dirt bike cost and where can I buy one?',
    answer: 'Adult electric dirt bike prices generally range from $2,499 for budget-friendly e-motos to $4,999+ for competition 72V models. At VoltDirtBike (voltdirtbike.com), you can buy directly online with free 50-state freight crate delivery, factory warranties, and flexible financing options.'
  },
  {
    id: 'faq-range-battery',
    category: 'Battery & Charging',
    question: 'How far can I ride on a single charge and how long does charging take?',
    answer: 'Our high-capacity 72V 45Ah and 50Ah Samsung/LG lithium battery packs provide 45 to 75 miles of range per charge depending on riding mode and terrain. Standard household 110V charging takes 2 to 3 hours, while our 15A Ultra-Fast Smart Charger reaches 80% capacity in under 50 minutes.'
  },
  {
    id: 'faq-waterproof',
    category: 'Durability & Weather',
    question: 'Are Surrons and electric dirt bikes waterproof for mud, rain, and water crossings?',
    answer: 'Yes! VoltDirtBike models feature full IP67 waterproof and mud-resistant seals across the brushless motor, battery enclosure, wiring harness, and FOC sine-wave controller. You can blast through rain, mud, and water crossings up to axle height safely.'
  },
  {
    id: 'faq-maintenance',
    category: 'Maintenance & Service',
    question: 'What maintenance is required compared to a gas dirt bike?',
    answer: 'Electric dirt bikes require 90% less maintenance than traditional gas dirt bikes. There are no oil changes, spark plugs, carburetors, air filters, or clutch plates to replace. You only maintain basic wear items like hydraulic brake pads, tire pressure, and drive chain tension.'
  },
  {
    id: 'faq-two-seater',
    category: 'Passenger Capacity',
    question: 'Do you offer 2-seater electric dirt bikes for adults with passenger footpegs?',
    answer: 'Yes! We offer specialized dual-passenger adult electric dirt bikes equipped with extended comfortable bench seats, foldable CNC aluminum rear passenger footpegs, passenger grab rails, and heavy-duty steel subframes rated up to 450 lbs total payload.'
  }
];
