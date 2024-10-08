import * as SecureStore from 'expo-secure-store';

import { handleErrors } from '../constants/functions';

const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error: any) {
      handleErrors("Error getting token:", error);
      return null;
    }
  },

  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error: any) {
      handleErrors("Error saving token:", error);
    }
  },
};

export default tokenCache;