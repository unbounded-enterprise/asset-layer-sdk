const AssetLayerSessionTokenKey = 'AssetLayerSessionToken';
const AssetLayerSessionTokenLastRefreshKey = 'AssetLayerSessionTokenLastRefresh';

export class AssetLayerSessionTokenManager {
  static initialized = false;
  static available = false;

  static initialize() {
    if (!this.initialized) {
      try {
        const testKey = '__test__';

        window.sessionStorage.setItem(testKey, testKey);
        window.sessionStorage.removeItem(testKey);

        this.available = true;
      } catch (e) {
        this.available = false;
      } finally {
        this.initialized = true;
      }
    }
  }

  static set(token: string, timestamp: number = Date.now()) {
    if (this.available) {
      window.sessionStorage.setItem(AssetLayerSessionTokenKey, token);
      window.sessionStorage.setItem(AssetLayerSessionTokenLastRefreshKey, '' + timestamp);
      return true;
    } else {
      console.warn('Session storage is not available. Token was not stored.');
      return false;
    }
  }

  static get() {
    if (this.available) {
      const timestamp = window.sessionStorage.getItem(AssetLayerSessionTokenLastRefreshKey);
      if (!timestamp) {
        console.warn('Session storage is empty. Timestamp cannot be retrieved.');
        return null;
      }
      else if ((Date.now() - Number(timestamp)) > 1000 * 60 * 50) {
        console.warn('Session storage is expired. Token was not retrieved.');
        return null;
      }
      
      const token = window.sessionStorage.getItem(AssetLayerSessionTokenKey);
      if (!token) {
        console.warn('Session storage is empty. Token cannot be retrieved.');
        return null;
      }
      return token;
    } else {
      console.warn('Session storage is not available. Token cannot be retrieved.');
      return null;
    }
  }

  static del() {
    if (this.available) {
      window.sessionStorage.removeItem(AssetLayerSessionTokenKey);
      window.sessionStorage.removeItem(AssetLayerSessionTokenLastRefreshKey);
      return true;
    } else {
      console.warn('Session storage is not available. Token was not removed.');
      return false;
    }
  }
}

AssetLayerSessionTokenManager.initialize();

export default AssetLayerSessionTokenManager;