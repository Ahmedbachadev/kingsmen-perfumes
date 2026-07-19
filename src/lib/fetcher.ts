import { ApiError } from '../utils/errors';

// Global memory cache to enable instant transitions
export const fetchCache = new Map<string, any>();

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const cacheKey = url;
  if (!options?.method || options.method === 'GET') {
    if (fetchCache.has(cacheKey)) {
      return fetchCache.get(cacheKey) as T;
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new ApiError(`Error fetching ${url}: ${response.statusText}`, response.status);
  }

  const data = await response.json();
  
  if (!options?.method || options.method === 'GET') {
    fetchCache.set(cacheKey, data);
  }

  return data as T;
}
