import AsyncStorage from '@react-native-async-storage/async-storage';

const saveStore = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

const getStorage = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.log(err);
  }
};

const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};

export {saveStore, getStorage, removeStorage};
