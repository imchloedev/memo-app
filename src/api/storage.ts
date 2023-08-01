import AsyncStorage from "@react-native-async-storage/async-storage";
import { INote } from "@recoil/atoms";

export const getNotes = async () => {
  const data = (await AsyncStorage.getItem("@notes")) || "{}";
  const res = await JSON.parse(data);

  return res;
};

export const storeNotes = async (newData: INote) => {
  await AsyncStorage.setItem("@notes", JSON.stringify(newData));
};

export const getUserInfo = async () => {
  try {
    const data = (await AsyncStorage.getItem("token")) || "{}";
    const res = await JSON.parse(data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const storeUserInfo = async () => {
  const token = Math.random().toString(16).slice(2);
  await AsyncStorage.setItem("token", JSON.stringify(token));
};
