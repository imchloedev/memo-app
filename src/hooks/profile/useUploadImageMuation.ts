import { Asset } from "react-native-image-picker";
import { useMutation, useQueryClient } from "react-query";
import storage from "@react-native-firebase/storage";
import { IMutationOptions, IUploadImageAndProfile } from "../@types";

// useMutation
export const useUploadImageMutation = (options: IMutationOptions) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(uploadImageAndProfile, {
    onSuccess: (data) => {
      queryClient.setQueryData(["userImageUrl"], data);
    },
    onError: () => {
      options.onError();
    },
  });

  return { mutation };
};

const uploadImageToStorage = async (
  asset: Asset | undefined,
  userId: string
) => {
  if (!asset || !asset.uri) {
    return;
  }

  const reference = storage().ref(`/profile/${userId}/${asset.fileName}`);
  await reference.putFile(asset?.uri);
  const fileUrl = await reference.getDownloadURL();

  return fileUrl;
};

// mutation Fn
const uploadImageAndProfile = async ({
  result,
  currentUser,
}: IUploadImageAndProfile) => {
  if (!currentUser || !currentUser) return;

  const asset: Asset | undefined = result?.assets?.[0];

  const fileUrl = await uploadImageToStorage(asset, currentUser?.uid);
  await currentUser.updateProfile({ photoURL: fileUrl });

  return fileUrl;
};
