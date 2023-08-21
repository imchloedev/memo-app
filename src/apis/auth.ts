import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { TUser } from "./folders";

export const signIn = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signUp = (email: string, password: string) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export const subscribeAuth = (callback: (user: TUser) => void) => {
  return auth().onAuthStateChanged(callback);
};

export const onSignOut = () => {
  return auth().signOut();
};

// error type guard
export const isFirebaseAuthError = (
  error: unknown
): error is FirebaseAuthTypes.NativeFirebaseAuthError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as FirebaseAuthTypes.NativeFirebaseAuthError).code ===
      "string"
  );
};

// handling auth error
export const handleFirebaseAuthError = (
  error: FirebaseAuthTypes.NativeFirebaseAuthError
) => {
  switch (error.code) {
    case "auth/user-not-found" || "auth/wrong-password":
      return "Email or password is incorrect.";
    case "auth/email-already-in-use":
      return "Email is already in use.";
    case "auth/network-request-failed":
      return "Network request failed.";
    case "auth/internal-error":
      return "Invalid request.";
    default:
      return "Login failed.";
  }
};
