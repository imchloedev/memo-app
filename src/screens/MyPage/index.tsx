import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { styled } from "styled-components/native";
import SubmitBtn from "components/Auth/SubmitBtn";
import Layout from "components/Layout";
import { onSignOut } from "~/apis";
import { showAlert } from "~/utils";
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
  ImagePickerResponse,
} from "react-native-image-picker";
import { ActivityIndicator, Image, Platform, View } from "react-native";
import storage from "@react-native-firebase/storage";
import { useIsFocused } from "@react-navigation/native";

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined | null>();
  const currentUser = auth().currentUser;
  const isFocused = useIsFocused();

  const imageOptions: ImageLibraryOptions = {
    mediaType: "photo",
    maxWidth: 512,
    maxHeight: 512,
    includeBase64: Platform.OS === "android",
  };

  const handleImageSelection = async () => {
    const result = await launchImageLibrary(imageOptions);
    if (result.didCancel) return;
    await uploadImage(result);
  };

  const uploadImage = async (res: ImagePickerResponse | undefined) => {
    const asset: Asset | undefined = res?.assets?.[0];

    if (!asset || !asset.uri) {
      return;
    }
    setIsLoading(true);

    const reference = storage().ref(
      `/profile/${currentUser?.uid}/${asset.fileName}`
    );

    try {
      await reference.putFile(asset.uri);
      const fileUrl = await reference.getDownloadURL();
      setImageUrl(fileUrl);
      await updateProfileImg(fileUrl);
    } catch (error) {
      showAlert("Failed", "Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileImg = async (url: string) => {
    const updatedInfo = {
      photoURL: url,
    };

    try {
      await currentUser?.updateProfile(updatedInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const onLeave = async () => {
    setIsLoading(true);
    try {
      await onSignOut();
    } catch (error: unknown) {
      showAlert("Error", "Please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setImageUrl(currentUser?.photoURL);
  }, [isFocused]);

  return (
    <Layout>
      <Title>Account</Title>
      <Wrapper>
        <UserInfoBox>
          <UserPhotoContainer onPress={handleImageSelection}>
            {imageUrl ? (
              isLoading ? (
                <ActivityIndicator />
              ) : (
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{
                    uri: imageUrl,
                  }}
                />
              )
            ) : (
              <UserInitialName>
                {currentUser?.email?.slice(0, 1)}
              </UserInitialName>
            )}
          </UserPhotoContainer>

          <Username>{currentUser?.email}</Username>
        </UserInfoBox>

        <SubmitBtn title="Log out" isLoading={isLoading} onPress={onLeave} />
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

const UserProfilePhoto = styled.Image.attrs({
  source: { uri: `${(props: any) => props.path}` },
})<{ path: string | undefined }>`
  width: 80px;
  height: 80px;
`;

// source={{ uri: imgInfo[0].uri }}

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
