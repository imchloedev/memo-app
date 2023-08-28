import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { FirebaseStorageTypes } from "@react-native-firebase/storage";
import { ImagePickerResponse, Asset } from "react-native-image-picker";
import { useMutation, useQuery, useQueryClient } from "react-query";
import storage from "@react-native-firebase/storage";
import { TUser } from "~/apis";
import { IMutationOptions } from "./notes";

interface IUploadImageAndProfile {
  result: ImagePickerResponse | undefined;
  currentUser: TUser;
}

export const useUserImageUrlQuery = (user: TUser) => {
  const {
    isFetching,
    isLoading,
    data: userImageUrl,
  } = useQuery(["userImageUrl"], () => user?.photoURL || null);
  return { isFetching, isLoading, userImageUrl };
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

// useMutation
export const useProfileImageUploadMutation = (options: IMutationOptions) => {
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
