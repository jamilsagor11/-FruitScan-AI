export interface ScanResult {
  id: string;
  timestamp: number;
  imageUrl: string;
  fruitType: string;
  label?: 'treated' | 'natural';
  chemicalType?: string;
  status: 'Good' | 'Bad' | 'Spoiled' | 'Suspicious';
  ripeness: 'Raw' | 'Ripe' | 'Overripe' | 'Unknown';
  calories: number;
  confidence: number;
  preservativeDetected: boolean;
  preservativeType?: string | null;
  ripeningAgentDetected: boolean;
  ripeningAgentType?: string | null;
  chemicalConcentration?: string | null;
  reasoning: string;
  isCorrection?: boolean;
}

export interface UserCorrection {
  originalId: string;
  correctFruit: string;
  correctStatus: 'Good' | 'Bad';
  correctCalories: number;
  correctChemicals: {
    preservation?: string;
    ripening?: string;
  };
}
