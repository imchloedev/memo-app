import { useQuery } from "react-query";
import { TUser, getFolders } from "~/apis";

export const useFoldersListQuery = (user: TUser) => {
  const {
    isLoading,
    data: foldersState,
    error,
  } = useQuery(["folders", { userId: user?.uid }], () => getFolders(user), {
    suspense: true,
  });

  return { isLoading, foldersState, error };
};
