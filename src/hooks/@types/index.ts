import { ImagePickerResponse } from "react-native-image-picker";
import { TUser } from "~/apis";

export interface IMutationOptions {
  onSuccess: () => void;
  onError: () => void;
}

export interface IUploadImageAndProfile {
  result: ImagePickerResponse | undefined;
  currentUser: TUser;
}
