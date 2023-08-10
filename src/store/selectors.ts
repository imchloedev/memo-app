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

    switch (filter) {
      case "Notes":
        return notes.filter((note) => note.folder === "Notes");
      case "Work":
        return notes.filter((note) => note.folder === "Work");
      case "Wish List":
        return notes.filter((note) => note.folder === "Wish List");
      default:
        notes;
    }
  },
});

export const noteStatesState = selector({
  key: "noteStatesState",
  get: ({ get }) => {
    const filter = get(notesFilterState);
    const notes = get(notesState);
    const totalNotes = notes.length;

    switch (filter) {
      case "Notes":
        return notes.filter((note) => note.folder === "Notes").length;
      case "Work":
        return notes.filter((note) => note.folder === "Work").length;
      case "Wish List":
        return notes.filter((note) => note.folder === "Wish List").length;
      default:
        notes.length;
    }

    return totalNotes;
  },
});
