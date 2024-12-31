export function normalizeValue(value: number, max: number): number {
  return Math.min(1, Math.max(0, value / max));
}

export function normalizeWeightedFactors(
  factors: Record<string, number>,
  weights: Record<string, number>
): number {
  return Object.entries(factors)
    .reduce((total, [key, value]) => total + value * weights[key], 0);
}

export function calculateVariance(values: number[]): number {
  if (!values.length) return 1;
  
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  
  return Math.min(1, variance / (mean * mean));
}