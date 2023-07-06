import { atom } from "recoil";

export interface INote {
  [key: number | string]: {
    text: string;
    folder: string;
  };
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
