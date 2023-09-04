import { useMutation, useQueryClient } from "react-query";
import { addNote } from "~/apis";
import { IMutationOptions } from "../@types";

export const useAddNoteMutation = (options: IMutationOptions) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addNote, {
    onSuccess: () => {
      options.onSuccess();
      queryClient.invalidateQueries(["notes"]);
    },
    onError: () => options.onError(),
  });

  return { mutation };
};
