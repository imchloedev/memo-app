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
    const notes = get(notesState);

    return notes.filter((note) => note.folder === filter);
  },
});
