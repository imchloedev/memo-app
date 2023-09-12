import { useQuery } from "react-query";
import { TUser } from "~/apis";

export const useUserImageUrlQuery = (user: TUser) => {
  const {
    isFetching,
    isLoading,
    data: userImageUrl,
  } = useQuery(["userImageUrl"], () => user?.photoURL);
  return { isFetching, isLoading, userImageUrl };
};
