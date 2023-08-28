import { useMutation, useQueryClient } from "react-query";
import { deleteNote } from "~/apis";

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  return { mutation };
};
