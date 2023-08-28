import { useQuery } from "react-query";
import { getNoteById } from "~/apis";

export const useNoteQuery = (noteId: string | undefined) => {
  const {
    isLoading,
    error,
    refetch,
    data: note,
  } = useQuery(["notes", { id: noteId }], () => getNoteById(noteId));

  return { isLoading, error, refetch, note };
};
