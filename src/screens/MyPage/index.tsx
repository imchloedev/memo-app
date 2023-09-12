import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { styled } from "styled-components/native";
import UserProfile from "~/components/common/UserProfile";
import SubmitBtn from "components/auth/SubmitBtn";
import Layout from "components/common/Layout";
import ScreenTitle from "components/common/ScreenTitle";
import { onSignOut } from "apis";
import { showAlert } from "utils";

const MyPage = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const currentUser = auth().currentUser;

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
      <TitleWrapper>
        <ScreenTitle title="Account" />
      </TitleWrapper>
      <Wrapper>
        <UserProfile currentUser={currentUser} />
        <SubmitBtn
          title="Log out"
          isLoading={isLoggedOut}
          isOkay={true}
          onPress={onLeave}
        />
      </Wrapper>
    </Layout>
  );
};

export default MyPage;

const TitleWrapper = styled.View`
  margin: 40px 0;
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
