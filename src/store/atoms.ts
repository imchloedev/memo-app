import { atom } from "recoil";

export interface INote {
  id?: string;
  createdAt: number;
  creatorId: string | undefined;
  text: string;
  folder: string;
  isPinned?: boolean;
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

export const notesFilterState = atom<string>({
  key: "notesFilterState",
  default: "",
});

export const userState = atom<IUser>({
  key: "userState",
  default: {
    username: "",
    password: "",
  },
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
