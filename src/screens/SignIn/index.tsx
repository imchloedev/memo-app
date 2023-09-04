import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useRecoilState } from "recoil";
import { styled } from "styled-components/native";
import { LoginStackParamList } from "../@types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import IconButton from "~/components/common/IconButton";
import Input from "~/components/auth/CustomInput";
import SubmitBtn from "~/components/auth/SubmitBtn";
import Layout from "~/components/common/Layout";
import ScreenTitle from "~/components/common/ScreenTitle";
import { userState } from "~/store";
import useThemeColors from "hooks/common/useThemeColors";
import { isFirebaseAuthError, handleFirebaseAuthError, signIn } from "apis";
import { showAlert, validateEmail, validatePassword } from "utils";

type SignInProps = NativeStackScreenProps<LoginStackParamList, "SignIn">;

const SignIn = ({ navigation }: SignInProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const { username, password } = userInfo;
  const [isShow, setIsShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const mode = useThemeColors();

  const isOkayLogin = validateEmail(username) && validatePassword(password);

  const handleChange = (text: string, name: string) => {
    setUserInfo({ ...userInfo, [name]: text });
  };

  const onLogin = async () => {
    setIsLoading(true);
    try {
      await signIn(username, password);
      setUserInfo({ ...userInfo, username: "", password: "" });
    } catch (error: unknown) {
      if (isFirebaseAuthError(error)) {
        const errorMsg = handleFirebaseAuthError(error);
        showAlert("Failed", errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
      isValid: validateEmail(username),
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
          iconName="eye"
          color={mode.color.textColor}
          onPress={() => setIsShow((prev) => !prev)}
        />
      ) : (
        <IconButton
          iconName="eyeo"
          color={mode.color.textColor}
          onPress={() => setIsShow((prev) => !prev)}
        />
      ),
      secureTextEntry: isShow,
      isValid: validatePassword(password),
      errMsg: "Must be 8-20 characters in length",
    },
  ];

  return (
    <Layout>
      <Container>
        <TitleWrapper>
          <ScreenTitle title="Sign in" />
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
          <SubmitBtn
            title="Sign In"
            isLoading={isLoading}
            isOkay={isOkayLogin}
            onPress={isOkayLogin ? onLogin : undefined}
          />
          <LinkWrapper onPress={() => navigation.navigate("SignUp")}>
            <LinkText>
              Don't have an account? <Link>Sign Up</Link>
            </LinkText>
          </LinkWrapper>
        </View>
      </Container>
    </Layout>
  );
};

export default SignIn;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 20px;
`;

const TitleWrapper = styled.View`
  padding-bottom: 60px;
`;

const SubTitle = styled.Text`
  margin-top: 10px;
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
