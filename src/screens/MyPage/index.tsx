import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components/native";
import { getCurrentUser } from "~/api/storage";
import useLogin from "~/hooks/useLogin";
import { tokenState, userState } from "~/recoil/atoms";
import { MainStackParamList } from "../@types";
import SubmitBtn from "~/components/Auth/SubmitBtn";

type MyPageProp = NativeStackScreenProps<MainStackParamList, "MyPage">;

const MyPage = ({ navigation }: MyPageProp) => {
  const [user, setUser] = useRecoilState(userState);
  const { logout } = useLogin(user);
  const setToken = useSetRecoilState(tokenState);

  const getUser = async () => {
    const res = await getCurrentUser();
    setUser(res);
  };

  useEffect(() => {
    getUser();
  }, [navigation]);

  const leave = async () => {
    await logout;
    setToken(null);
  };

  return (
    <Container>
      <Title>My Page</Title>
      <Wrapper>
        <HelloText>Hello!</HelloText>
        <Username>{user.username}</Username>
        <SubmitBtn title="Log out" onPress={leave} />
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
