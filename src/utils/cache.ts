// 对缓存进行二次封装，避免重复代码
// 区分是local还是session

enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage
  // 区分那种缓存
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  removeCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      this.storage.removeItem(key)
    }
  }

  clearCache() {
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export { localCache, sessionCache }
