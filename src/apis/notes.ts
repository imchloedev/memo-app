import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { IFolder, INote } from "~/store";
import { foldersCollection, memosCollection } from "~/lib";

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
    };
  });

  return data;
};

export const getFolders = async (
  user: FirebaseAuthTypes.User | undefined | null
): Promise<IFolder[]> => {
  const querySnapshot = await foldersCollection
    .where("creatorId", "==", user?.uid)
    .orderBy("createdAt", "asc")
    .get();

  const data: IFolder[] = querySnapshot.docs.map((documentSnapshot) => {
    const docData = documentSnapshot.data();
    return {
      id: documentSnapshot.id,
      createdAt: docData.createdAt,
      creatorId: docData.creatorId,
      name: docData.name,
    };
  });

  return data;
};

export const deleteNotesAndFolder = async (name: string) => {
  const querySnapshot = await memosCollection.where("folder", "==", name).get();
  querySnapshot.forEach((documentSnapshot) => {
    documentSnapshot.ref.delete();
  });
};
