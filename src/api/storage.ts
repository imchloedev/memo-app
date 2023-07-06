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
