import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { foldersCollection, memosCollection } from "~/lib";
import { IFolder } from "~/store";

interface IDeleteFolderAndNotes {
  id: undefined | string;
  folderName: string;
}

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

export const deleteFolder = async ({
  id,
  folderName,
}: IDeleteFolderAndNotes) => {
  await foldersCollection.doc(id).delete();
  await deleteNotesFromFolder(folderName);
};

export const deleteNotesFromFolder = async (name: string) => {
  const querySnapshot = await memosCollection.where("folder", "==", name).get();
  querySnapshot.forEach((documentSnapshot) => {
    documentSnapshot.ref.delete();
  });
};

export const addNewFolder = async (newFolder: IFolder) => {
  await foldersCollection.add(newFolder);
};
