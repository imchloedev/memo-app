import { useMutation, useQueryClient } from "react-query";
import { pinNote } from "~/apis";
import { INote } from "~/store";

export const usePinNoteMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(pinNote, {
    onMutate: (list) => {
      queryClient.cancelQueries(["notes"]);
      const previousData = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], (oldData: INote[] | undefined) => {
        if (!oldData) {
          return [];
        }

        return oldData.map((note) => {
          if (note.id === list.id) {
            return { ...note, isPinned: !list.isPinned };
          }
          return note;
        });
      });

      return previousData;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
    onError: (context: { previousData: INote[] }) => {
      queryClient.setQueryData(["notes"], context.previousData);
    },
  });

  return { mutation };
};
