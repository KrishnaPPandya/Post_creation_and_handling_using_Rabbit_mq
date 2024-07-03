import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

/**
 * Sets a value in the cache.
 * 
 * @param key - The key to identify the cached value.
 * @param value - The value to be cached.
 */
export const setCache = (key: string, value: any): void => {
  cache.set(key, value);
};

/**
 * Retrieves a value from the cache.
 * 
 * @param key - The key to identify the cached value.
 * @returns The cached value or `undefined` if the key does not exist in the cache.
 */
export const getCache = (key: string): any => {
  return cache.get(key);
};

/**
 * Clears all cached data.
 */
export const clearCache = (): void => {
  cache.flushAll();
};
