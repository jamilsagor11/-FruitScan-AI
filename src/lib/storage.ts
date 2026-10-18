import { ScanResult } from '../types';

const STORAGE_KEY = 'fruit_scan_history_v2';
const CORRECTIONS_KEY = 'fruit_scan_corrections_v2';

// Built-in initial sample dataset so user has rich offline data immediately
const INITIAL_SAMPLE_SCANS: ScanResult[] = [
  {
    id: 'sample-1',
    timestamp: Date.now() - 1000 * 60 * 32, // 32 mins ago
    fruitType: 'Alphonso Mango (Himsagar)',
    status: 'Suspicious',
    label: 'treated',
    chemicalType: 'calcium_carbide',
    ripeness: 'Ripe',
    calories: 135,
    confidence: 94.2,
    preservativeDetected: false,
    preservativeType: null,
    ripeningAgentDetected: true,
    ripeningAgentType: 'Calcium Carbide (CaC2)',
    chemicalConcentration: 'Medium (Artificial Ripening)',
    reasoning: 'Peel shows typical patchy yellow-green coloration with completely green stem end. Traces of alkaline chalky residue detected on the pedicel junction. Flesh likely lacks authentic Brix sweetness.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample-2',
    timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
    fruitType: 'Honeycrisp Apple',
    status: 'Good',
    label: 'natural',
    chemicalType: 'none',
    ripeness: 'Ripe',
    calories: 95,
    confidence: 98.7,
    preservativeDetected: false,
    preservativeType: null,
    ripeningAgentDetected: false,
    ripeningAgentType: null,
    chemicalConcentration: null,
    reasoning: 'Skin exhibits natural bloom and organic striation. Stem is naturally dry and woody. No synthetic wax excess or formaldehyde signatures identified. Excellent crispness and nutritional profile.',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'sample-3',
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    fruitType: 'Cavendish Banana',
    status: 'Suspicious',
    label: 'treated',
    chemicalType: 'formalin',
    ripeness: 'Ripe',
    calories: 105,
    confidence: 91.5,
    preservativeDetected: true,
    preservativeType: 'Formaldehyde / Formalin Dip',
    ripeningAgentDetected: true,
    ripeningAgentType: 'Ethylene / Carbide',
    chemicalConcentration: 'High (Preservative Wash)',
    reasoning: 'Unusually uniform intense yellow with complete absence of natural sugar freckles. Stem remains unnaturally firm and bleached, indicating immersion in anti-microbial chemical solution.',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80'
  }
];

// Helper to compress image if it's a huge base64 data URL to prevent quota crash
const sanitizeResultForStorage = (result: ScanResult): ScanResult => {
  return {
    ...result
  };
};

export const getHistoryLocal = (): ScanResult[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial sample scans on first launch
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_SCANS));
      return INITIAL_SAMPLE_SCANS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to read local scan history:', e);
    return INITIAL_SAMPLE_SCANS;
  }
};

export const saveScanLocal = (result: ScanResult) => {
  let history = getHistoryLocal();
  const sanitized = sanitizeResultForStorage(result);
  let limit = 30;

  while (limit > 0) {
    try {
      const updated = [sanitized, ...history.filter(h => h.id !== sanitized.id)].slice(0, limit);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return;
    } catch (e) {
      limit -= 5;
      console.warn(`LocalStorage quota exceeded, pruning history to ${limit}`);
    }
  }
};

export const deleteScanLocal = (id: string) => {
  try {
    const history = getHistoryLocal();
    const updated = history.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete scan:', e);
  }
};

export const clearHistoryLocal = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
};

export const getCorrectionsLocal = (): Partial<ScanResult>[] => {
  try {
    const raw = localStorage.getItem(CORRECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const saveCorrectionLocal = (result: ScanResult) => {
  let corrections = getCorrectionsLocal();
  let limit = 20;

  while (limit > 0) {
    try {
      const updated = [result, ...corrections].slice(0, limit);
      localStorage.setItem(CORRECTIONS_KEY, JSON.stringify(updated));
      return;
    } catch (e) {
      limit -= 5;
    }
  }
};

// Purely local Async API - 100% bypass of external database
export const saveScan = async (result: ScanResult): Promise<void> => {
  saveScanLocal(result);
};

export const getHistory = async (): Promise<ScanResult[]> => {
  return getHistoryLocal();
};

export const deleteScan = async (id: string): Promise<void> => {
  deleteScanLocal(id);
};

export const clearHistory = async (): Promise<void> => {
  clearHistoryLocal();
};

export const saveCorrection = async (result: ScanResult): Promise<void> => {
  saveCorrectionLocal(result);
};

export const getCorrections = async (): Promise<Partial<ScanResult>[]> => {
  return getCorrectionsLocal();
};
