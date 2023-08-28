import { useQueryClient, useMutation } from "react-query";
import { addNewFolder } from "~/apis";

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
