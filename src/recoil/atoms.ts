import { atom } from "recoil";

export interface INote {
  [key: number | string]: {
    text: string;
    folder: string;
  };
}

export interface IUser {
  username: string;
  password: string;
}

export interface IPersonalInfo extends IUser {
  name: string;
  birthDate: string;
}

export const textState = atom<string>({
  key: "textState",
  default: "",
});

export const notesState = atom<INote>({
  key: "notesState",
  default: {},
});

export const notesFilterState = atom<string>({
  key: "notesFilterState",
  default: "Notes",
});

export const userState = atom<IUser>({
  key: "userState",
  default: {
    username: "",
    password: "",
  },
});

export const tokenState = atom<string>({
  key: "tokenState",
  default: "",
});

export const personalInfoState = atom<IPersonalInfo>({
  key: "personalInfoState",
  default: {
    name: "",
    username: "",
    password: "",
    birthDate: "",
  },
});
