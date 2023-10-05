import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { notesFilterState } from "~/store";
import { getNotes, TUser } from "~/apis";

export const useNotesListQuery = (user: TUser) => {
  const filter = useRecoilValue(notesFilterState);
  const {
    isLoading,
    error,
    refetch,
    data: notesState,
  } = useQuery(["notes", { userId: user?.uid }], () => getNotes(user), {
    select: (data) => data.filter((note) => note.folder === filter),
    useErrorBoundary: true,
    suspense: true,
  });

  return { isLoading, error, refetch, notesState };
};
