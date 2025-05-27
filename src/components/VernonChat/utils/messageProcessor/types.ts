
export interface ProcessMessageOptions {
  includeLocation?: boolean;
  includeVibeData?: boolean;
  maxResults?: number;
  temperature?: number;
}

export interface MessageContext {
  messages: any[];
  options?: ProcessMessageOptions;
  paginationState?: any;
}

export interface ProcessorResult {
  text: string;
  data?: any;
  requiresFollowUp?: boolean;
}
