import { Storage } from "redux-persist";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

const reduxStorageMMKV: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};


// export const StorageMMKV = {
//   setTheme: (key: string, value: Theme) => {
//     try {
//       storage.set(`${key}`, `${value}`);
//     } catch (error) {
//       console.error('Error setting user preferences:', error);
//     }
//   },
//   getTheme: (key: string) => {
//     try {
//       return storage.getString(key);
//     } catch (error) {
//       // console.error('Error getting user preferences:', error);      
//       return 'light';
//     }
//   },
//   setMapping: (key: string, value: Mapping) => {
//     try {
//       storage.set(`${key}`, `${value}`);
//     } catch (error) {
//       console.error('Error setting user preferences:', error);
//     }
//   },
//   getMapping: (key: string) => {
//     try {
//       return storage.getString(key);
//     } catch (error) {
//       // console.error('Error getting user preferences:', error);
//       return 'eva'; // Or handle the error according to your application's logic
//     }
//   },
// }

export default reduxStorageMMKV;