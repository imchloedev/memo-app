import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { INote } from "~/store";
import { memosCollection } from "~/lib";

export const getNotes = async (
  user: FirebaseAuthTypes.User | null
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
