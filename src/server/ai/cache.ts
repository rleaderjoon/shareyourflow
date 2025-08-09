export type CacheValue<T> = { value: T; createdAt: number };

class SimpleCache<T> {
  private store = new Map<string, CacheValue<T>>();

  get(key: string): CacheValue<T> | undefined {
    return this.store.get(key);
  }

  set(key: string, value: T) {
    this.store.set(key, { value, createdAt: Date.now() });
  }
}

export const aiSceneCache = new SimpleCache<unknown>();


