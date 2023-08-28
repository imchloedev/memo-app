import { useQuery } from "react-query";
import { TUser, getFolders } from "~/apis";

export const useFoldersListQuery = (user: TUser) => {
  const {
    isLoading,
    data: foldersState,
    error,
  } = useQuery(["folders"], () => getFolders(user));

  return { isLoading, foldersState, error };
};
