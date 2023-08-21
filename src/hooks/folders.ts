import { useQuery, useQueryClient, useMutation } from "react-query";
import { TUser, addNewFolder, deleteFolder, getFolders } from "~/apis";

export const useFoldersListQuery = (user: TUser) => {
  const {
    isLoading,
    data: foldersState,
    error,
  } = useQuery(["folders"], () => getFolders(user));

  return { isLoading, foldersState, error };
};

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteFolder, {
    onSuccess: () => queryClient.invalidateQueries(["folders"]),
  });

  return { mutation };
};

export const useAddFolderMutation = (
  onSuccessCb: () => void,
  onErrorCb: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addNewFolder, {
    onSuccess: () => {
      queryClient.invalidateQueries(["folders"]);
      onSuccessCb();
    },
    onError: () => onErrorCb(),
  });

  return { mutation };
};
