import { Bike } from '../types';

/**
 * Helper to determine the battery voltage for any product (Bike or Standalone Battery / Accessory).
 * Reads specs.batteryVoltage first, then falls back to parsing title and description.
 */
export function getProductBatteryVoltage(bike: Bike): number {
  if (bike.specs?.batteryVoltage && bike.specs.batteryVoltage > 0) {
    return bike.specs.batteryVoltage;
  }

  const text = `${bike.name} ${bike.tagline || ''} ${bike.description || ''}`.toLowerCase();

  if (text.includes('81v') || text.includes('84v') || text.includes('22s') || text.includes('80v')) return 81;
  if (text.includes('74v')) return 74;
  if (text.includes('72v')) return 72;
  if (text.includes('60v') || text.includes('60 v')) return 60;
  if (text.includes('52v')) return 52;
  if (text.includes('48v') || text.includes('48 v')) return 48;
  if (text.includes('36v')) return 36;

  return 0;
}

/**
 * Checks if a bike or battery product matches a target battery voltage filter option.
 * Target voltage choices: 0 (All), 48 (48V nominal), 60 (60V nominal), 72 (72V nominal), 80 (80V+ nominal)
 */
export function matchesBatteryVoltageFilter(bike: Bike, selectedVoltage: number): boolean {
  if (!selectedVoltage || selectedVoltage === 0) return true;

  const volt = getProductBatteryVoltage(bike);
  if (volt === 0) return false;

  if (selectedVoltage === 48) {
    return volt >= 48 && volt < 60;
  }
  if (selectedVoltage === 60) {
    return volt >= 60 && volt < 72;
  }
  if (selectedVoltage === 72) {
    return volt >= 72 && volt < 80;
  }
  if (selectedVoltage === 80) {
    return volt >= 80;
  }

  return volt >= selectedVoltage;
}
