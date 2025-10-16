import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
  public static async getItem(KEY: string): Promise<string | null> {
    try {
      const value = await AsyncStorage.getItem(KEY);

      return value;
    } catch (error) {
      return null;
    }
  }
  public static async setItem(
    KEY: string,
    value: string,
  ): Promise<string | null> {
    try {
      await AsyncStorage.setItem(KEY, value);
      return value;
    } catch (error) {
      return null;
    }
  }

  public static async clearall() {
    try {
      await AsyncStorage.clear();
      return 'success';
    } catch (error) {
      return null;
    }
  }
}
