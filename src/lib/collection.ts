import firestore from "@react-native-firebase/firestore";

export const memosCollection = firestore().collection("Memos");

export const usersCollection = firestore().collection("Users");
