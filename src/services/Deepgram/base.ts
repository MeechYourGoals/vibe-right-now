export interface DeepgramOptions {
  model?: string;
  voice?: string;
  language?: string;
}

export class DeepgramBase {
  private static apiKey: string | null = null;

  public static setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('deepgramApiKey', apiKey);
    }
  }

  public static getApiKey(): string | null {
    if (!this.apiKey && typeof localStorage !== 'undefined') {
      this.apiKey = localStorage.getItem('deepgramApiKey');
    }
    return this.apiKey;
  }

  public static clearApiKey() {
    this.apiKey = null;
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('deepgramApiKey');
    }
  }

  public static hasApiKey(): boolean {
    return !!this.getApiKey();
  }
}
