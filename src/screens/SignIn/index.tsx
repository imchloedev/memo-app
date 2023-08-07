import React, { useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { useRecoilState } from "recoil";
import { styled } from "styled-components/native";
import useLogin from "~/hooks/useLogin";
import { userState } from "~/recoil/atoms";
import { LoginStackParamList } from "../@types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import IconButton from "~/components/IconButton";
import Input from "~/components/Auth/Input";
import SubmitBtn from "~/components/Auth/SubmitBtn";
import { dark, light } from "~/styles/theme";
import useThemeColors from "~/hooks/useThemeColors";

type SignInProps = NativeStackScreenProps<LoginStackParamList, "SignIn">;

const SignIn = ({ navigation }: SignInProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { username, password } = userInfo;
  const { login } = useLogin(userInfo);
  const [isShow, setIsShow] = useState(true);
  const mode = useThemeColors();

  console.log(userInfo);

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
  const isEmailValid = username.length > 1 && !emailRegEx.test(username);
  const isPasswordValid = password.length > 1 && !passwordRegEx.test(password);
  const isOkayLogin = emailRegEx.test(username) && passwordRegEx.test(password);

  const handleChange = (text: string, name: string) => {
    setUserInfo({ ...userInfo, [name]: text });
  };

  // 로그인 성공하면 navigation 이동하는 로직 짜기

  const LOGIN_INPUT_PROPS = [
    {
      id: 1,
      label: "Email",
      name: "username",
      value: username,
      placeholder: "email",
      textContentType: "emailAddress",
      autoCapitalize: "none",
      keyboardType: "email-address",
      placeholderTextColor: "#ddd",
      handleChange: handleChange,
      child: null,
      isValid: isEmailValid,
      secureTextEntry: false,
      errMsg: "Please enter a valid email address",
    },
    {
      id: 2,
      label: "Password",
      name: "password",
      value: password,
      placeholder: "password",
      textContentType: "password",
      autoCapitalize: "none",
      keyboardType: "default",
      placeholderTextColor: "#ddd",
      handleChange: handleChange,
      child: isShow ? (
        <IconButton
          iconName="eyeo"
          color={mode.color.textColor}
          onPress={() => setIsShow((prev) => !prev)}
        />
      ) : (
        <IconButton
          iconName="eye"
          color={mode.color.textColor}
          onPress={() => setIsShow((prev) => !prev)}
        />
      ),
      secureTextEntry: isShow,
      isValid: isPasswordValid,
      errMsg: "Must be 8-20 characters in length",
    },
  ];

  return (
    <Container>
      <TitleWrapper>
        <Title>Sign in</Title>
        <SubTitle>Welcome Back!</SubTitle>
      </TitleWrapper>
      <View>
        {LOGIN_INPUT_PROPS.map(
          ({
            id,
            value,
            name,
            label,
            textContentType,
            autoCapitalize,
            secureTextEntry,
            placeholder,
            placeholderTextColor,
            handleChange,
            errMsg,
            child,
            isValid,
          }) => (
            <Input
              key={id}
              name={name}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              label={label}
              textContentType={textContentType}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              handleChange={handleChange}
              errMsg={errMsg}
              child={child}
              isValid={isValid}
            />
          )
        )}
        <SubmitBtn title="Sign In" onPress={isOkayLogin ? login : undefined} />
        <LinkWrapper onPress={() => navigation.navigate("SignUp")}>
          <LinkText>
            Don't have an account? <Link>Sign Up</Link>
          </LinkText>
        </LinkWrapper>
      </View>
    </Container>
  );
};

export default SignIn;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.bg};
  padding: 0 20px;
`;

const TitleWrapper = styled.View`
  padding-bottom: 60px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.color.textColor};
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
`;

const LinkWrapper = styled.TouchableOpacity`
  padding: 20px;
`;

const LinkText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.color.textColor};
`;

const Link = styled.Text`
  color: #2a62e6;
  font-weight: bold;
  border: 1px solid red;
`;
