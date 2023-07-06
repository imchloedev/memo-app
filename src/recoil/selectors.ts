import { selector } from "recoil";
import { notesFilterState, notesState } from "./atoms";

export interface INoteInfo {
  folder: string;
  text: string;
}

export const filteredNotesList = selector({
  key: "filteredNotesList",
  get: ({ get }) => {
    const filter = get(notesFilterState);
    const list = get(notesState);

    switch (filter) {
      case "Notes":
        return Object.entries(list).filter(([_, value]) => {
          const info = value as INoteInfo;
          return info.folder === "Notes";
        });
      case "Work":
        return Object.entries(list).filter(([_, value]) => {
          const info = value as INoteInfo;
          return info.folder === "Work";
        });
      case "Wish List":
        return Object.entries(list).filter(([_, value]) => {
          const info = value as INoteInfo;
          return info.folder === "Wish List";
        });
      default:
        list;
    }
  },
});
