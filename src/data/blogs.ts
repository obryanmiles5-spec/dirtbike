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
    excerpt: 'Unpacking controller amp limits, thermal dissipation, C-ratings, and 72V vs 80V powertrain performance in modern electric dirt bikes.',
    date: 'July 24, 2026',
    readTime: '6 min read',
    author: 'Jake "Volt" Harrison, Chief Engineer',
    category: 'Battery & Tech',
    image: '/Electric-Dirt-Bikes.webp',
    content: `When evaluating high-output electric dirt bikes, the debate between 72V and 80V nominal battery architecture comes down to heat efficiency, peak current delivery, and instant wheel torque.

Higher voltage architectures allow motor controllers (such as liquid-cooled FOC sine-wave units) to draw fewer peak amperes for an equivalent kilowatt output (P = V x I). This dramatically reduces copper resistive losses (I²R heating) inside motor windings and battery BMS terminals, preserving pack longevity during sustained 60kW full-throttle motocross sessions.

Key Performance Drivers:
1. Controller Amperage Limits: A 72V battery pushing 200A DC delivers approximately 14.4kW of electrical power. Moving to 80V nominal at 200A increases output to 16.0kW without increasing wire gauge or terminal thickness.
2. Cell Discharge C-Ratings: High-discharge 21700 lithium NMC cells maintain a flat discharge curve under heavy throttle loads, preventing voltage sag when ascending steep mountain inclines.
3. Thermal Dissipation: Lower operating temperatures inside the motor casing prevent magnet demagnetization and maintain peak efficiency over 60+ minute rides.

For trail riders tackling technical rock gardens and singletrack, 72V packs with high-discharge 21700 lithium cells remain the sweet spot for low overall weight and balanced chassis geometry.`
  },
  {
    id: 'blog-trail-prep-guide',
    title: 'Top 5 Backcountry Trail Prep Steps Before Your First 80-Mile E-Dirt Bike Ride',
    excerpt: 'From tire PSI pressure tuning to field BMS diagnostics, regen braking setup, and spare brake pad prep for long mountain rides.',
    date: 'July 20, 2026',
    readTime: '5 min read',
    author: 'Elena Vance, Enduro Racer',
    category: 'Trail Guides',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Preparing for a full day of backcountry singletrack on an electric dirt bike requires a different mindset than traditional 4-stroke gas bikes. Without gasoline noise or vibration, range optimization and trail readiness are paramount.

5 Essential Pre-Ride Checkpoints:
1. Adjust Electronic Regen Braking: Set your electronic regen braking levels via the handlebar display before climbing. High regen recharges battery power on downhill descents while reducing brake rotor heat and pad fade.
2. Tire Pressure Precision: Lowering tire pressure to 10-12 PSI rear allows soft-compound dirt tires to conform over wet roots, loose granite, and mud.
3. Carry a Portable Fast-Charger: Modern 15A fast chargers plug into standard 120V campsite outlets, EV J1772 adapters, or portable solar power stations, topping off your battery up to 80% during a 45-minute lunch break.
4. Field Tool & Spare Pad Kit: Always carry spare sintered metallic brake pads, a compact chain breaker, tire levers, and an Allen wrench set.
5. Inspect BMS Bluetooth Telemetry: Check individual cell voltages on your phone app before heading out to ensure no cell bank is out of balance.`
  },
  {
    id: 'blog-maintenance-checklist',
    title: 'Why Electric Dirt Bikes Cost 90% Less to Maintain Than 450cc Gas Engines',
    excerpt: 'Eliminating oil filters, valve shims, clutch plates, spark plugs, and exhaust repack routines forever.',
    date: 'July 15, 2026',
    readTime: '6 min read',
    author: 'Marcus Vance, Service Lead',
    category: 'Maintenance',
    image: '/Electric-Dirt-Bikes.webp',
    content: `A traditional 450cc 4-stroke gas motocross bike requires engine oil and filter changes every 5 to 10 hours of ride time, valve lash inspections every 20 hours, and costly top-end piston rebuilds every season.

In contrast, a brushless Interior Permanent Magnet (IPM) electric motor has only one moving assembly—the rotor spinning on dual sealed ceramic bearings. There are zero reciprocating pistons, valves, or clutch friction plates to wear down.

Your Maintenance Checklist Simplified:
- Lube and adjust primary chain drive or carbon belt tension every 15-20 ride hours.
- Check hydraulic DOT 4 brake fluid level and inspect sintered brake pad wear.
- Keep battery charged between 50-80% for long-term winter storage to preserve battery chemistry.
- Check spoke tension and tire air pressure before every ride.

Over 3 years of riding, an electric dirt bike rider saves an average of $2,800 in oil, filters, race gas, clutch packs, and top-end engine rebuilds.`
  },
  {
    id: 'blog-street-legal-conversion',
    title: 'How to Get Your Electric Dirt Bike DOT Street-Legal in All 50 States',
    excerpt: 'Everything you need to know about mirrors, turn signals, horn kits, DOT tires, and MSO title registration for supermotos.',
    date: 'July 10, 2026',
    readTime: '7 min read',
    author: 'David K., Commuter & Rider',
    category: 'Street Legal',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Converting an off-road electric dirt bike into a street-legal commuter allows you to carve city streets during the week and shred mountain trails on weekends.

Key Department of Transportation (DOT) Requirements:
- Dual DOT-Approved Mirrors: Bar-end or folding dual-sport mirrors.
- High/Low Beam LED Headlight: Bright LED optics with low beam cutoff and high beam toggle.
- Front & Rear Turn Indicators: Flashing amber LED turn signals and illuminated rear license plate bracket with brake light switch.
- Electric Horn: 105dB+ audible horn.
- DOT Dual-Sport or Supermoto Tires: Street-approved compound rubber.

MSO & Title Registration:
VOLT-X ships all bikes with an official Manufacturer's Statement of Origin (MSO) containing VIN details for effortless state DMV registration as a street motorcycle or moped, depending on state speed rating.`
  },
  {
    id: 'blog-surron-vs-voltx',
    title: 'Surron Light Bee X vs VOLT-X Beast: 2026 Head-to-Head Comparison & Performance Test',
    excerpt: 'Comparing top speed, wheel torque, controller peak power (KW), suspension travel, and range between Surron and VOLT-X.',
    date: 'July 05, 2026',
    readTime: '8 min read',
    author: 'Alex Rivers, Test Rider',
    category: 'Comparisons',
    image: '/Electric-Dirt-Bikes.webp',
    content: `The light e-moto market has evolved dramatically since the release of the original Surron Light Bee X. Today's riders demand higher peak kW output, fully adjustable air/oil suspension, and 72V architecture out of the box.

Head-to-Head Spec Breakdown:
- Peak Power: Surron Light Bee X outputs 6.0kW stock, whereas the VOLT-X Beast delivers 12.5kW peak out of the box with liquid-cooled FOC controller tuning.
- Top Speed: Surron maxes out at ~46 MPH, while the VOLT-X Beast reaches 65+ MPH GPS confirmed on flat pavement.
- Battery Capacity: Surron features a 60V 38Ah pack (2.28kWh), compared to the VOLT-X 72V 45Ah LG/Samsung cell pack (3.24kWh), yielding 35% greater range under hard trail riding.
- Suspension & Brakes: VOLT-X features 240mm inverted air-fork suspension and 4-piston hydraulic disc brakes with oversized 220mm rotors.

Verdict: While Surron remains a classic lightweight platform, VOLT-X offers superior factory power and suspension components without requiring thousands of dollars in aftermarket upgrades.`
  },
  {
    id: 'blog-best-electric-dirt-bikes-2026',
    title: 'Best Electric Dirt Bikes for Adults in 2026: Top 5 High-Speed Off-Road E-Motos',
    excerpt: 'The definitive buyer\'s guide for adult electric dirt bikes ranging from 50 MPH trail shredders to 75 MPH full-size motocross monsters.',
    date: 'June 28, 2026',
    readTime: '9 min read',
    author: 'Tyler Vance, Off-Road Journalist',
    category: 'Buyer Guides',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Electric dirt bikes for adults have matured into serious contenders against traditional 250cc and 450cc gas motorcycles. Whether you want a silent neighborhood cruiser, a technical singletrack weapon, or a full-size motocross track bike, 2026 offers unprecedented variety.

Top 5 Adult Electric Dirt Bikes Tested:
1. VOLT-X Apex 72V 15kW: Best overall value with 70 MPH top speed, 1000Nm wheel torque, 70-mile range, and removable 72V 45Ah battery.
2. Stark Varg EX: Ultimate full-size motocross bike with 80HP output and custom riding modes, best suited for track racing.
3. VOLT-X Urban Commuter 2-Seater: Best passenger-friendly e-moto with dual footpegs and 55 MPH capabilities.
4. Surron Ultra Bee: Great mid-size option sitting between pit bike and full-size dirt bike dimensions.
5. Rawrr Mantis X: Budget entry-level light e-moto for beginners learning off-road riding.

When choosing your bike, prioritize frame dimensions, rider weight capacity, seat height, and battery voltage.`
  },
  {
    id: 'blog-stark-varg-vs-e-motos',
    title: 'Stark Varg vs High-Performance 72V E-Motos: Complete Motocross & Trail Buyer Guide',
    excerpt: 'Breakdown of 80HP Stark Varg vs 72V lightweight e-motos in terms of weight, battery swapping, price, maintenance, and trail agility.',
    date: 'June 22, 2026',
    readTime: '7 min read',
    author: 'Jake "Volt" Harrison, Chief Engineer',
    category: 'Comparisons',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Comparing a full-size 242-lb 80HP Stark Varg motocross bike to lightweight 120-140 lb 72V e-motos highlights two distinct philosophies in electric off-road riding.

Full-Size Motocross vs Lightweight Trail E-Moto:
- Weight & Handling: Stark Varg weighs ~242 lbs, matching a 450cc gas bike. Lightweight 72V e-motos like the VOLT-X Apex weigh only 130 lbs, offering bicycle-like flickability through tight trees and technical mountain switchbacks.
- Battery Swapping: Stark Varg features a non-removable structural battery pack requiring generator charging at the track. High-output 72V e-motos feature quick-swap battery latches, allowing riders to swap fresh packs in 30 seconds.
- Price Point: Stark Varg starts around $12,900+, whereas high-output 72V e-motos deliver 60-70 MPH performance starting between $3,200 and $4,800.

Conclusion: Choose Stark Varg for pure track racing; choose 72V e-motos for versatile trail riding, easy transport in an SUV, and rapid battery swapping.`
  },
  {
    id: 'blog-electric-mini-pit-bikes',
    title: 'Top Electric Mini Dirt Bikes & Pit Bikes for Kids, Teens, and Backyard Shredding',
    excerpt: 'Safe speed limiters, seat height options, quiet electric motors, and durable frames for young riders and pit bike enthusiasts.',
    date: 'June 18, 2026',
    readTime: '5 min read',
    author: 'Sarah Jenkins, Youth Moto Coach',
    category: 'Pit Bikes',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Electric mini dirt bikes and pit bikes have revolutionized youth riding and backyard practice sessions. Quiet operation means riding in suburban backyards without disturbing neighbors or triggering noise complaints.

Key Features for Young & Beginner Riders:
- Parental Speed Limiters: Adjustable speed caps from 10 MPH for beginners up to 35+ MPH for experienced teens.
- Zero Hot Exhaust Pipes: Eliminates leg burn hazards common with gas pit bike mufflers.
- Instant Throttle Response: No kick-starting or stalled carburetors; simply turn the key and twist the throttle.
- Low Maintenance: No oil changes or gas mixing required.

Model Recommendations:
The VOLT-X Mini Shredder 48V features 14-inch front and 12-inch rear spoked wheels, adjustable hydraulic suspension, and 2,500W peak motor output, making it the ideal learning platform.`
  },
  {
    id: 'blog-lithium-battery-care',
    title: 'How to Maximize Electric Dirt Bike Lithium Battery Lifespan: Range, Storage & Charging Tips',
    excerpt: 'Essential battery management system (BMS) care, optimal storage percentage (50-80%), temperature management, and cell balancing rules.',
    date: 'June 12, 2026',
    readTime: '6 min read',
    author: 'Dr. Aris Thorne, Battery Scientist',
    category: 'Battery & Tech',
    image: '/Electric-Dirt-Bikes.webp',
    content: `The lithium-ion battery pack is the single most valuable component on your electric dirt bike. Proper care guarantees 800+ full charge cycles (equivalent to 25,000+ miles of riding) before noticeable capacity loss occurs.

Golden Rules of Lithium Battery Maintenance:
1. Avoid Storing at 100% or 0% Charge: Store your battery between 50% and 80% charge level if not riding for more than 2 weeks. Full charge storage accelerates chemical degradation inside NMC cells.
2. Cell Balancing: Leave the smart charger plugged in for 30 minutes after reaching 100% once every month to allow the BMS to equalize individual parallel cell bank voltages.
3. Temperature Safeguards: Never charge a battery in freezing sub-zero temperatures (below 32°F / 0°C). Allow the pack to reach room temperature before plugging into the charger.
4. Cool Down After Hard Riding: Allow the battery pack to cool down for 20 minutes post-ride before connecting the fast charger.`
  },
  {
    id: 'blog-rawrr-mantis-vs-surron',
    title: 'Rawrr Mantis vs Surron vs VOLT-X: Which Budget Electric Dirt Bike Offers Best Value?',
    excerpt: 'Triple matchup analyzing frame strength, controller tunability, stock power output, battery capacity, and upgrade potential under $4,500.',
    date: 'June 05, 2026',
    readTime: '8 min read',
    author: 'Alex Rivers, Test Rider',
    category: 'Comparisons',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Riders looking for an entry-level high-performance electric dirt bike under $4,500 often compare the Rawrr Mantis, Surron Light Bee X, and the VOLT-X 72V lineup.

Detailed Triple Comparison:
- Frame Construction: Rawrr Mantis utilizes a cast aluminum frame; Surron uses forged aluminum alloy; VOLT-X uses a reinforced double-cradle hydroformed alloy frame engineered for heavy jumps and 250lb rider payloads.
- Stock Controller Power: Rawrr Mantis outputs ~7.5kW peak; Surron outputs 6.0kW; VOLT-X delivers 12.5kW peak with pre-loaded ECO/SPORT/RACE modes.
- Battery Capacity: VOLT-X leads with a 72V 45Ah LG cell pack (3.24kWh), compared to Rawrr's 72V 35Ah (2.52kWh) and Surron's 60V 38Ah (2.28kWh).
- Braking System: VOLT-X includes 4-piston hydraulic disc brakes with metallic pads and sintered rotors as standard equipment.

Verdict: VOLT-X offers the highest horsepower, battery capacity, and payload durability per dollar invested.`
  },
  {
    id: 'blog-e-dirt-bike-laws-usa',
    title: 'Are Electric Dirt Bikes Legal on City Streets? State-by-State USA E-Moto Laws Explained',
    excerpt: 'Deciphering speed caps, class ratings, DMV motorcycle licensing, MSO title requirements, and local trail access regulations in California, Texas, Florida, and Nevada.',
    date: 'May 28, 2026',
    readTime: '7 min read',
    author: 'David K., Legal & Policy Writer',
    category: 'Laws & Regulations',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Navigating where you can legally ride your electric dirt bike in the United States requires understanding the distinction between Class 1/2/3 e-bikes, mopeds, off-highway vehicles (OHV), and street-legal motorcycles.

State Law Overview:
- California: High-power e-motos exceeding 28 MPH or 750W are classified as motor-driven cycles requiring M1/M2 driver licenses and registration if ridden on public roads. Mountain bike trails restrict non-pedal bikes.
- Texas & Florida: Bikes registered with an MSO title, DOT light kit (headlight, taillight, turn signals, mirrors), and horn can be registered as street-legal motorcycles or mopeds.
- Nevada & Arizona: Flexible OHV sticker registration allows street access in rural towns and designated trail connectors.

Best Practice: Request an MSO title from your seller and install a DOT light kit to register your bike legally with your local DMV.`
  },
  {
    id: 'blog-50mph-fastest-ebikes',
    title: 'Fastest 50+ MPH Electric Bikes & 72V Dirt Bikes You Can Buy Online in 2026',
    excerpt: 'Comprehensive guide to high-speed dual-sport e-bikes and e-dirt bikes capable of 50-70+ MPH with instant acceleration and long-range lithium packs.',
    date: 'May 20, 2026',
    readTime: '8 min read',
    author: 'Tyler Vance, Off-Road Journalist',
    category: 'Speed & Specs',
    image: '/Electric-Dirt-Bikes.webp',
    content: `Speed enthusiasts seeking 50+ MPH performance without gasoline smells or engine noise now have multiple top-tier electric dirt bikes and high-output e-motos available for direct home delivery.

Speed Champions Reviewed:
1. VOLT-X Beast 72V 15kW: Reaches 65-70 MPH with instant 1000Nm wheel torque and 72V 45Ah battery pack.
2. Stark Varg EX: Top speed exceeding 75+ MPH with 80HP motor tuning.
3. VOLT-X Fighter 72V 10kW: Top speed of 55-60 MPH with lightweight chassis and 240mm inverted suspension.
4. Surron Ultra Bee: Reaches ~56 MPH with 12.5kW mid-drive motor.
5. Talaria Sting R MX4: Reaches ~53 MPH with upgraded gearbox drive.

Safety Note: When riding at speeds above 50 MPH, always wear DOT or ECE-certified full-face motocross helmets, armored riding jackets, knee braces, and heavy-duty riding boots.`
  }
];
