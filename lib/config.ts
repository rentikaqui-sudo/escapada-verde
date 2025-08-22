// Simple API configuration that works in all environments
export const config = {
  apiUrl: (endpoint: string) => `/api${endpoint}`,
};