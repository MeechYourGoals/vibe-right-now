
export function validateRequired(value: any, fieldName: string): void {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    throw new Error(`${fieldName} is required`);
  }
}

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
}

export function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL format');
  }
}
