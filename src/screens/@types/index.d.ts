export type MainStackParamList = {
  Home: { folder: string };
  Note: undefined;
  Edit: { noteId: number | string };
  Modal: undefined;
  Folders: undefined;
  MyPage: undefined;
};

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};
