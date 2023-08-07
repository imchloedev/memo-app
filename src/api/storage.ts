import AsyncStorage from "@react-native-async-storage/async-storage";
import { INote, IPersonalInfo, IUser } from "@recoil/atoms";

export const getNotes = async () => {
  const data = (await AsyncStorage.getItem("@notes")) || "{}";
  const res = await JSON.parse(data);

  return res;
};

export const storeNotes = async (newData: INote) => {
  await AsyncStorage.setItem("@notes", JSON.stringify(newData));
};

// 로그인한 유저 정보 저장
export const storeUser = async (user: IUser) => {
  await AsyncStorage.setItem("@user", JSON.stringify(user));
};

// 회원가입한 유저 정보 저장
export const storeNewUsers = async (newUser: IPersonalInfo) => {
  await AsyncStorage.setItem("@users", JSON.stringify(newUser));
};

export const getToken = async () => {
  try {
    const data = (await AsyncStorage.getItem("token")) || "{}";
    const res = await JSON.parse(data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const storeToken = async () => {
  const token = Math.random().toString(16).slice(2);
  await AsyncStorage.setItem("token", JSON.stringify(token));
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};
