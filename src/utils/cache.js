/**
 * Lightweight In-Memory Cache with TTL and Key/Prefix Invalidation
 */
const cacheStore = new Map();

/**
 * Set cache entry with TTL (default 5 minutes)
 * @param {string} key
 * @param {any} data
 * @param {number} ttlMs
 */
const setCache = (key, data, ttlMs = 5 * 60 * 1000) => {
  cacheStore.set(key, {
    data,
    expiry: Date.now() + ttlMs,
  });
};

/**
 * Get cache entry if exists and not expired
 * @param {string} key
 * @returns {any | null}
 */
const getCache = (key) => {
  const item = cacheStore.get(key);
  if (!item) return null;

  if (Date.now() > item.expiry) {
    cacheStore.delete(key);
    return null;
  }

  return item.data;
};

/**
 * Invalidate cache by key or prefix
 * @param {string} [prefix]
 */
const clearCache = (prefix = "") => {
  if (!prefix) {
    cacheStore.clear();
    return;
  }

  for (const key of cacheStore.keys()) {
    if (key.startsWith(prefix)) {
      cacheStore.delete(key);
    }
  }
};

const invalidateInitCache = () => {
  clearCache("init_data");
};

module.exports = {
  setCache,
  getCache,
  clearCache,
  invalidateInitCache,
};
