import { useQueryClient, useMutation } from "react-query";
import { deleteFolder } from "~/apis";

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteFolder, {
    onSuccess: () => queryClient.invalidateQueries(["folders"]),
  });

  return { mutation };
};
