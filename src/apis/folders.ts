import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { foldersCollection, memosCollection } from "~/lib";
import { IFolder } from "~/store";

export type TUser = FirebaseAuthTypes.User | null | undefined;

interface IDeleteFolderAndNotes {
  id: undefined | string;
  folderName: string;
  user?: TUser;
}

export const getFolders = async (user: TUser): Promise<IFolder[]> => {
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
  user,
}: IDeleteFolderAndNotes) => {
  await foldersCollection.doc(id).delete();
  await deleteNotesFromFolder(user, folderName);
};

export const deleteNotesFromFolder = async (user: TUser, name: string) => {
  const querySnapshot = await memosCollection
    .where("creatorId", "==", user?.uid)
    .where("folder", "==", name)
    .get();
  querySnapshot.forEach((documentSnapshot) => {
    documentSnapshot.ref.delete();
  });
};

export const addNewFolder = async (newFolder: IFolder) => {
  await foldersCollection.add(newFolder);
};
