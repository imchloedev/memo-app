import { useQuery } from "react-query";
import { searchNotes, TUser } from "~/apis";

export const useSearchNotesQuery = (keyword: any, user: TUser) => {
  const { isLoading, data: searchResult } = useQuery(
    ["notes", { userId: user?.uid }, { keyword: keyword }],
    () => searchNotes({ user, keyword }),
    {
      enabled: !!keyword,
    }
  );
  return { isLoading, searchResult };
};
