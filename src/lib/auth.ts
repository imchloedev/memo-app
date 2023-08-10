import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const signIn = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const subscribeAuth = (
  callback: (user: FirebaseAuthTypes.User | null) => void
) => {
  return auth().onAuthStateChanged(callback);
};

export const onSignOut = () => {
  return auth().signOut();
};
