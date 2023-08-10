import React from "react";
import auth from "@react-native-firebase/auth";
import { styled } from "styled-components/native";
import SubmitBtn from "components/Auth/SubmitBtn";
import { onSignOut } from "~/lib";

const MyPage = () => {
  const currentUser = auth().currentUser;

  const onLeave = async () => {
    try {
      await onSignOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Title>Account</Title>
      <Wrapper>
        <Username>{currentUser?.email}</Username>
        <SubmitBtn title="Log out" onPress={onLeave} />
      </Wrapper>
    </Container>
  );
};

export default MyPage;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bg};
`;

const TitleWrapper = styled.View`
  padding: 0 20px;
`;

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

const HelloText = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
`;

const Username = styled(HelloText)`
  font-size: 20px;
  font-weight: bold;
`;
