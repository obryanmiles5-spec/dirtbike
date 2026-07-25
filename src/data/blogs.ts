export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  image: string;
}

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'blog-72v-vs-80v',
    title: '72V vs 80V E-Moto Battery Architecture: Which Specs Deliver Maximum Torque?',
    excerpt: 'Unpacking controller amp limits, thermal dissipation, and cell discharge C-ratings in modern electric dirt bike powertrains.',
    date: 'July 18, 2026',
    readTime: '5 min read',
    author: 'Jake "Volt" Harrison, Chief Engineer',
    category: 'Battery & Tech',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
    content: `When evaluating high-output electric dirt bikes, the debate between 72V and 80V nominal battery architecture comes down to heat efficiency and instant wheel torque.

Higher voltage architectures allow motor controllers to draw fewer peak amperes for the equivalent kilowatt output (P = V x I). This reduces copper resistive losses (I²R heating) inside the motor windings and battery BMS terminals, preserving pack longevity during sustained 60kW full-throttle motocross moto sessions.

For trail riders tackling technical rock gardens, 72V packs with high-discharge 21700 lithium cells remain the sweet spot for low weight and balanced chassis geometry.`
  },
  {
    id: 'blog-trail-prep-guide',
    title: 'Top 5 Backcountry Trail Prep Steps Before Your First 80-Mile E-Dirt Bike Ride',
    excerpt: 'From tire PSI pressure tuning to field BMS diagnostics and spare brake pad prep for long mountain rides.',
    date: 'July 10, 2026',
    readTime: '4 min read',
    author: 'Elena Vance, Enduro Racer',
    category: 'Trail Guides',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
    content: `Preparing for a full day of backcountry singletrack on an electric dirt bike requires a different mindset than traditional 4-stroke gas bikes.

1. **Verify Regen Braking Settings:** Adjust your electronic regen levels via the handlebar display before climbing. High regen recharges battery power on downhill descents while reducing brake rotor fade.
2. **Tire Pressure Precision:** Lower tire PSI (10-12 PSI rear) allows soft compound dirt tires to conform over wet roots and loose granite.
3. **Carry Portable Fast-Charger:** Modern 15A fast chargers plug into standard 120V campsite outlets or portable solar generators, topping off your battery 80% during a 45-minute lunch break.`
  },
  {
    id: 'blog-maintenance-checklist',
    title: 'Why Electric Dirt Bikes Cost 90% Less to Maintain Than 450cc Gas Engines',
    excerpt: 'Eliminating oil filters, valve shims, clutch plates, and exhaust repack routines forever.',
    date: 'June 28, 2026',
    readTime: '6 min read',
    author: 'Marcus Vance, Service Lead',
    category: 'Maintenance',
    image: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&q=80&w=800',
    content: `A traditional 450cc 4-stroke gas motocross bike requires engine oil and filter changes every 5 to 10 hours of ride time, valve lash inspections every 20 hours, and costly top-end piston rebuilds every season.

In contrast, a brushless IPM electric motor has only one moving assembly—the rotor on dual sealed ceramic bearings. There are zero reciprocating pistons, valves, or clutch plates to wear down.

Your maintenance checklist is simplified to three tasks:
- Lube and adjust primary chain drive tension.
- Check hydraulic brake fluid and brake pad thickness.
- Keep battery charged to 50-80% for long-term storage.`
  },
  {
    id: 'blog-street-legal-conversion',
    title: 'How to Get Your Electric Dirt Bike DOT Street-Legal in All 50 States',
    excerpt: 'Everything you need to know about mirrors, turn signals, horn kits, and MSO title registration for supermotos.',
    date: 'June 15, 2026',
    readTime: '5 min read',
    author: 'David K., Commuter & Rider',
    category: 'Street Legal',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800',
    content: `Converting an off-road electric dirt bike into a street-legal commuter allows you to carve city streets during the week and shred mountain trails on weekends.

Key DOT requirements include:
- Dual DOT-approved rearview mirrors.
- High/low beam LED headlight and illuminated rear license plate bracket.
- Front and rear turn signal indicators.
- Electric horn and street-compound tires or 50/50 dual-sport rubber.

VOLT-X ships all models with an official Manufacturer's Statement of Origin (MSO) containing VIN details for effortless state DMV registration.`
  }
];
