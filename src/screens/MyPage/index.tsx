import React, { useState } from "react";
import { ActivityIndicator, Image, Platform } from "react-native";
import auth from "@react-native-firebase/auth";
import { styled } from "styled-components/native";
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from "react-native-image-picker";
import SubmitBtn from "components/Auth/SubmitBtn";
import Layout from "components/Layout";
import { onSignOut } from "~/apis";
import { showAlert } from "~/utils";

import { useUploadImageMutation, useUserImageUrlQuery } from "~/hooks/profile";

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

const MyPage = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const currentUser = auth().currentUser;

  const { isFetching, userImageUrl } = useUserImageUrlQuery(currentUser);
  const { mutation: uploadUserImage } = useUploadImageMutation(mutationOptions);

  console.log(isFetching);

  const handleImageSelection = async () => {
    const result = await launchImageLibrary(imageOptions);
    if (!result.didCancel) {
      try {
        await uploadUserImage.mutateAsync({ result, currentUser });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onLeave = async () => {
    setIsLoggedOut(true);
    try {
      await onSignOut();
    } catch (error: unknown) {
      showAlert("Error", "Please try again later");
    } finally {
      setIsLoggedOut(false);
    }
  };

  return (
    <Layout>
      <Title>Account</Title>
      <Wrapper>
        <UserInfoBox>
          <UserPhotoContainer onPress={handleImageSelection}>
            {isFetching ? (
              <ActivityIndicator />
            ) : userImageUrl ? (
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: userImageUrl,
                }}
              />
            ) : (
              <UserInitialName>
                {currentUser?.email?.slice(0, 1)}
              </UserInitialName>
            )}
          </UserPhotoContainer>

          {uploadUserImage.isLoading && <ActivityIndicator />}

          <Username>{currentUser?.email}</Username>
        </UserInfoBox>

        <SubmitBtn title="Log out" isLoading={isLoggedOut} onPress={onLeave} />
      </Wrapper>
    </Layout>
  );
};

export default MyPage;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 40px 0;
  color: ${({ theme }) => theme.color.textColor};
  padding: 0 20px;
`;

const Wrapper = styled.View`
  padding: 0 20px;
`;

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
