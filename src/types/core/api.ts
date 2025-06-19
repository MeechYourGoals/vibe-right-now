
// API related types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
