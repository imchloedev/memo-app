import { useMutation, useQueryClient } from "react-query";
import { updateNote } from "~/apis";

export const useUpdateNoteMutation = (onErrorCb: () => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
    onError: () => onErrorCb(),
  });
  return { mutation };
};
