export type BikeCategory = "all" | "electric-dirt-bikes" | "e-bikes" | "accessories" | "battery";

export interface BikeSpec {
  motorPowerKW: number;        // e.g. 6.0 kW, 12.0 kW, 60.0 kW
  peakPowerKW: number;         // e.g. 10.0 kW, 22.0 kW, 80.0 kW
  peakTorqueNm: number;        // e.g. 260 Nm, 450 Nm, 950 Nm
  batteryCapacity: string;     // e.g. "72V 45Ah (3.24 kWh)"
  batteryVoltage: number;      // e.g. 72
  batteryAh: number;           // e.g. 45
  batteryKWh: number;          // e.g. 3.24
  rangeMilesMin: number;       // e.g. 35
  rangeMilesMax: number;       // e.g. 75
  topSpeedMph: number;         // e.g. 55
  weightLbs: number;           // e.g. 128
  chargeTimeHours: number;     // e.g. 2.5
  groundClearanceInches: number; // e.g. 11.8
  frameType: string;           // e.g. "Forged Aluminum Twin-Spar"
  brakes: string;              // e.g. "4-Piston Hydraulic Disc 203mm"
  suspension: string;          // e.g. "Adjustable Inverted 240mm Travel"
  wheelSize: string;           // e.g. "19\" Front / 18\" Rear"
  seatCapacity?: string;       // e.g. "2 Passengers (Dual Sit Carrier Bench)"
}

export interface Bike {
  id: string;
  name: string;
  tagline: string;
  category: BikeCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  specs: BikeSpec;
  features: string[];
  description: string;
  stockCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  featuredOrder?: number;
  isTwoSeater?: boolean;        // Indicates 2-passenger carrier seat setup
}

export interface Accessory {
  id: string;
  name: string;
  category: 'battery' | 'charger' | 'protection' | 'tires' | 'gear';
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  id: string; // unique cart item id
  bike: Bike;
  quantity: number;
  selectedAccessories: Accessory[];
  customColor?: string;
}

export interface FilterState {
  search: string;
  category: BikeCategory;
  minMotorKW: number;
  maxMotorKW: number;
  minRangeMiles: number;
  minBatteryVoltage: number;
  maxWeightLbs: number;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'power-desc' | 'range-desc' | 'rating-desc';
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  orderNotes?: string;
  shipToDifferentAddress?: boolean;
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    street: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
  };
  shippingAddress: {
    firstName?: string;
    lastName?: string;
    company?: string;
    street: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  customer?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  deliveryMethod: 'freight_crate' | 'dealer_pickup';
  deliveryMethodTitle?: string;
  paymentMethod: 'apple_pay' | 'bank_transfer' | 'bitcoin' | 'cashapp' | 'chime' | 'zelle' | 'crypto';
  paymentMethodTitle?: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  promoCodeApplied?: string;
  orderDate: string;
  estimatedDelivery: string;
  trackingNumber: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  emailStatus?: string;
}
