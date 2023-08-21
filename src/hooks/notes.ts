import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import {
  addNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
  pinNote,
  searchNotes,
  TUser,
} from "~/apis";
import { INote, notesFilterState } from "~/store";

export const useNotesListQuery = (user: TUser) => {
  const filter = useRecoilValue(notesFilterState);
  const {
    isLoading,
    error,
    refetch,
    data: notesState,
  } = useQuery(["notes"], () => getNotes(user), {
    select: (data) => data.filter((note) => note.folder === filter),
    useErrorBoundary: true,
  });

  return { isLoading, error, refetch, notesState };
};

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
      queryClient.setQueryData("notes", context.previousData);
    },
  });

  return { mutation };
};

export const useDeleteNoteMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteNote, {
    onSuccess: () => queryClient.invalidateQueries(["notes"]),
  });

  return { mutation };
};

export const useAddNoteMutation = (
  onSuccessCb: () => void,
  onErrorCb: () => void
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addNote, {
    onSuccess: () => {
      onSuccessCb();
      queryClient.invalidateQueries(["notes"]);
    },
    onError: () => onErrorCb(),
  });
  return { mutation };
};

export const useNoteQuery = (noteId: string | undefined) => {
  const {
    isLoading,
    error,
    refetch,
    data: note,
  } = useQuery(["notes", { id: noteId }], () => getNoteById(noteId));

  return { isLoading, error, refetch, note };
};

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

export const useSearchNotesQuery = (keyword: any, user: TUser) => {
  const { isLoading, data: searchResult } = useQuery(
    ["notes", keyword],
    () => searchNotes({ user, keyword }),
    {
      enabled: !!keyword,
    }
  );
  return { isLoading, searchResult };
};
