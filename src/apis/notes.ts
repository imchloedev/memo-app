import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { INote } from "~/store";
import { memosCollection } from "~/lib";

interface IPinNote {
  id: string | undefined;
  isPinned: boolean | undefined;
}

interface IUpdateNote {
  noteId: string | undefined;
  updated: {
    createdAt: number;
    text: string;
  };
}

export const getNotes = async (
  user: FirebaseAuthTypes.User | undefined | null
): Promise<INote[]> => {
  const querySnapshot = await memosCollection
    .where("creatorId", "==", user?.uid)
    .orderBy("createdAt", "desc")
    .get();

  const data: INote[] = querySnapshot.docs.map((documentSnapshot) => {
    const docData = documentSnapshot.data();
    return {
      id: documentSnapshot.id,
      createdAt: docData.createdAt,
      creatorId: docData.creatorId,
      text: docData.text,
      folder: docData.folder,
      isPinned: docData.isPinned,
    };
  });

  return data;
};

export const getNoteById = async (noteId: string | undefined) => {
  const documentSnapshot = await memosCollection.doc(noteId).get();
  const data = documentSnapshot.data();

  return data;
};

export const deleteNote = async (noteId: undefined | string) => {
  await memosCollection.doc(noteId).delete();
};

export const pinNote = async ({ id, isPinned }: IPinNote) => {
  await memosCollection.doc(id).update({
    isPinned: !isPinned,
  });
};

export const addNote = async (newNote: INote) => {
  await memosCollection.add(newNote);
};

export const updateNote = async ({ noteId, updated }: IUpdateNote) => {
  await memosCollection.doc(noteId).update(updated);
};
