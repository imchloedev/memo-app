import { atom } from "recoil";

export interface INote {
  id?: string;
  createdAt: number;
  creatorId: string | undefined;
  text: string;
  folder: string;
}

export interface IFolder {
  id?: string;
  createdAt: number;
  creatorId: string | undefined;
  name: string;
}

export interface IUser {
  username: string;
  password: string;
}

export interface IPersonalInfo extends IUser {
  fullname: string;
  birthDate: string;
}

export const textState = atom<string>({
  key: "textState",
  default: "",
});

export const notesState = atom<INote[]>({
  key: "notesState",
  default: [],
});

export const notesFilterState = atom<string>({
  key: "notesFilterState",
  default: "",
});

export const foldersState = atom<IFolder[]>({
  key: "foldersState",
  default: [],
});

export const userState = atom<IUser>({
  key: "userState",
  default: {
    username: "",
    password: "",
  },
});

export const currentUser = atom({
  key: "currentUser",
  default: {},
});

export const personalInfoState = atom<IPersonalInfo>({
  key: "personalInfoState",
  default: {
    fullname: "",
    username: "",
    password: "",
    birthDate: "",
  },
});
