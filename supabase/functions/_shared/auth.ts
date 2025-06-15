
export function getApiKey(envVar: string): string {
  const apiKey = Deno.env.get(envVar);
  if (!apiKey) {
    throw new Error(`${envVar} environment variable not configured`);
  }
  return apiKey.trim();
}

export function createAuthHeaders(apiKey: string, type: 'Bearer' | 'Basic' | 'Api-Key' = 'Bearer'): Record<string, string> {
  switch (type) {
    case 'Bearer':
      return { 'Authorization': `Bearer ${apiKey}` };
    case 'Basic':
      return { 'Authorization': `Basic ${apiKey}` };
    case 'Api-Key':
      return { 'X-API-Key': apiKey };
    default:
      return { 'Authorization': `Bearer ${apiKey}` };
  }
}
