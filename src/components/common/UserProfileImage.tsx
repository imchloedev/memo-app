import React from "react";
import { ActivityIndicator, Image, Platform } from "react-native";
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from "react-native-image-picker";
import { styled } from "styled-components/native";
import { showAlert } from "utils";
import { useUploadImageMutation, useUserImageUrlQuery } from "hooks/profile";
import { TUser } from "~/apis";

interface IUserProfileImageProps {
  currentUser: TUser;
}

const mutationOptions = {
  onSuccess: () => {},
  onError: () => showAlert("Failed", "Please try again later."),
};

const imageOptions: ImageLibraryOptions = {
  mediaType: "photo",
  maxWidth: 512,
  maxHeight: 512,
  includeBase64: Platform.OS === "android",
};

const UserProfileImage = ({ currentUser }: IUserProfileImageProps) => {
  const { userImageUrl } = useUserImageUrlQuery(currentUser);
  const { mutation: uploadUserImage } = useUploadImageMutation(mutationOptions);

  const handleImageSelection = async () => {
    const result = await launchImageLibrary(imageOptions);
    if (!result.didCancel) {
      try {
        await uploadUserImage.mutateAsync({ result, currentUser });
      } catch {
        showAlert("Failed", "Please try again later.");
      }
    }
  };

  return (
    <UserInfoBox>
      <UserPhotoContainer onPress={handleImageSelection}>
        {userImageUrl ? (
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: userImageUrl,
            }}
          />
        ) : (
          <UserInitialName>{currentUser?.email?.slice(0, 1)}</UserInitialName>
        )}
      </UserPhotoContainer>

      {uploadUserImage.isLoading && <ActivityIndicator />}

      <Username>{currentUser?.email}</Username>
    </UserInfoBox>
  );
};

export default UserProfileImage;

const UserInfoBox = styled.View`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const UserPhotoContainer = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.container};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const UserInitialName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
`;

const HelloText = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
`;

const Username = styled(HelloText)`
  font-size: 20px;
  font-weight: bold;
`;
