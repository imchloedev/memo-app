import { INote } from "~/store";
import { memosCollection } from "~/lib";
import { TUser } from "./folders";

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

interface ISearchNote {
  user: TUser;
  keyword: string;
}

export const getNotes = async (user: TUser): Promise<INote[]> => {
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

export const searchNotes = async ({ user, keyword }: ISearchNote) => {
  const querySnapshot = await memosCollection
    .where("creatorId", "==", user?.uid)
    .where("keywords", "array-contains", keyword)
    .orderBy("createdAt", "desc")
    .get();
  const data = querySnapshot.docs.map((documentSnapshot) => {
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
