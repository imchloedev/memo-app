import { useMutation, useQueryClient } from "react-query";
import { updateNote } from "~/apis";

export const useUpdateNoteMutation = (
  onSuccessCb: () => void,
  onErrorCb: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateNote, {
    onSuccess: () => {
      onSuccessCb();
      queryClient.invalidateQueries(["notes"]);
    },
    onError: () => onErrorCb(),
  });
  return { mutation };
};
