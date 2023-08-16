import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { addNewFolder, deleteFolder, getFolders } from "~/apis";

export const useFoldersListQuery = (
  user: FirebaseAuthTypes.User | undefined | null
) => {
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
      onSuccessCb();
      queryClient.invalidateQueries(["folders"]);
    },
    onError: () => onErrorCb(),
  });

  return { mutation };
};
