export type SpecField = {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select';
  unit?: string;
  options?: string[];
  showOnCard?: boolean;
};

const EXCAVATOR: SpecField[] = [
  { key: 'operating_weight_kg', label: 'Operating Weight', type: 'number', unit: 'kg', showOnCard: true },
  { key: 'bucket_capacity_m3', label: 'Bucket Capacity', type: 'number', unit: 'm³' },
  { key: 'hours', label: 'Hours', type: 'number', unit: 'hrs', showOnCard: true },
  { key: 'year', label: 'Year', type: 'number', showOnCard: true },
  { key: 'make', label: 'Make', type: 'text', showOnCard: true },
  { key: 'model', label: 'Model', type: 'text', showOnCard: true },
];

const WHEEL_LOADER: SpecField[] = [
  { key: 'operating_weight_kg', label: 'Operating Weight', type: 'number', unit: 'kg', showOnCard: true },
  { key: 'bucket_capacity_m3', label: 'Bucket Capacity', type: 'number', unit: 'm³' },
  { key: 'hours', label: 'Hours', type: 'number', unit: 'hrs', showOnCard: true },
  { key: 'year', label: 'Year', type: 'number', showOnCard: true },
  { key: 'make', label: 'Make', type: 'text', showOnCard: true },
  { key: 'model', label: 'Model', type: 'text', showOnCard: true },
];

const CRANE: SpecField[] = [
  { key: 'max_lift_capacity_tons', label: 'Max Lift Capacity', type: 'number', unit: 'tons', showOnCard: true },
  { key: 'boom_length_m', label: 'Boom Length', type: 'number', unit: 'm' },
  { key: 'hours', label: 'Hours', type: 'number', unit: 'hrs', showOnCard: true },
  { key: 'year', label: 'Year', type: 'number', showOnCard: true },
  { key: 'make', label: 'Make', type: 'text', showOnCard: true },
  { key: 'model', label: 'Model', type: 'text', showOnCard: true },
];

const DEFAULT_FIELDS: SpecField[] = [
  { key: 'hours', label: 'Hours', type: 'number', unit: 'hrs', showOnCard: true },
  { key: 'year', label: 'Year', type: 'number', showOnCard: true },
  { key: 'make', label: 'Make', type: 'text', showOnCard: true },
  { key: 'model', label: 'Model', type: 'text', showOnCard: true },
];

const CATEGORY_SPECS: Record<string, SpecField[]> = {
  excavator: EXCAVATOR,
  wheel_loader: WHEEL_LOADER,
  crane: CRANE,
};

export function getSpecFields(category: string): SpecField[] {
  return CATEGORY_SPECS[category] ?? DEFAULT_FIELDS;
}

export function getCardSpecFields(category: string): SpecField[] {
  return getSpecFields(category).filter((f) => f.showOnCard);
}

export function formatSpecValue(field: SpecField, value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (field.type === 'number') {
    const num = Number(value);
    const formatted = Number.isFinite(num) ? num.toLocaleString() : String(value);
    return field.unit ? `${formatted} ${field.unit}` : formatted;
  }
  return String(value);
}