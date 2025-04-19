
export function fuzzyMatch(input: string, target: string): number {
  const inputLower = input.toLowerCase().trim();
  const targetLower = target.toLowerCase().trim();
  
  // Perfect match
  if (inputLower === targetLower) return 1;
  
  // Contains exact substring
  if (targetLower.includes(inputLower)) return 0.9;
  
  // Calculate letter matching ratio
  let matches = 0;
  const inputLetters = [...new Set(inputLower)];
  for (const letter of inputLetters) {
    if (targetLower.includes(letter)) matches++;
  }
  
  return matches / Math.max(inputLetters.length, targetLower.length);
}

export function findBestMatches(input: string, options: string[], threshold = 0.3): string[] {
  if (!input.trim()) return [];
  
  return options
    .map(option => ({
      option,
      score: fuzzyMatch(input, option)
    }))
    .filter(result => result.score > threshold)
    .sort((a, b) => b.score - a.score)
    .map(result => result.option);
}
