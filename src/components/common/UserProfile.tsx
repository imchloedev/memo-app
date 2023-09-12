import React from "react";
import { ActivityIndicator, Image, Platform, View } from "react-native";
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from "react-native-image-picker";
import { styled } from "styled-components/native";
import IconButton from "components/common/IconButton";
import { showAlert } from "utils";
import { useUploadImageMutation, useUserImageUrlQuery } from "hooks/profile";
import { TUser } from "~/apis";
import { useDeleteImageMutation } from "~/hooks/profile/useDeleteImageMutation";
import useThemeColors from "~/hooks/common/useThemeColors";

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

const UserProfile = ({ currentUser }: IUserProfileImageProps) => {
  const { userImageUrl } = useUserImageUrlQuery(currentUser);
  const { mutation: uploadUserImage } = useUploadImageMutation(mutationOptions);
  const { mutation: onRemoveImage } = useDeleteImageMutation();
  const mode = useThemeColors();

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
        {uploadUserImage.isLoading ? (
          <ActivityIndicator />
        ) : userImageUrl ? (
          <Image
            style={{ width: 120, height: 120 }}
            source={{
              uri: userImageUrl,
            }}
          />
        ) : (
          <UserInitialName>{currentUser?.email?.slice(0, 1)}</UserInitialName>
        )}
      </UserPhotoContainer>

      <View>
        <Username>{currentUser?.email}</Username>
        <ButtonGroup>
          <IconButton
            iconName="picture"
            color={mode.color.iconColor}
            onPress={handleImageSelection}
          />
          <IconButton
            iconName="delete"
            color={mode.color.iconColor}
            onPress={() => onRemoveImage.mutate(currentUser)}
          />
        </ButtonGroup>
      </View>

      {uploadUserImage.isLoading && <ActivityIndicator />}
    </UserInfoBox>
  );
};

export default UserProfile;

const UserInfoBox = styled.View`
  display: flex;
  align-items: center;
`;

const UserPhotoContainer = styled.TouchableOpacity`
  width: 120px;
  height: 120px;
  border-radius: 120px;
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

const ButtonGroup = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

const Username = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0 20px 0;
  color: ${({ theme }) => theme.color.textColor};
`;
