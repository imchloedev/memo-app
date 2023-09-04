import React, { useState } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { styled } from "styled-components/native";
import IconButton from "~/components/common/IconButton";
import Input from "~/components/auth/CustomInput";
import SubmitBtn from "~/components/auth/SubmitBtn";
import Layout from "~/components/common/Layout";
import ScreenTitle from "~/components/common/ScreenTitle";
import { personalInfoState } from "~/store";
import useThemeColors from "hooks/common/useThemeColors";
import {
  showAlert,
  validateBirthDate,
  validateEmail,
  validatePassword,
} from "utils";
import { handleFirebaseAuthError, isFirebaseAuthError, signUp } from "apis";
import { usersCollection } from "~/lib";

const SignUp = () => {
  const [personalInfo, setPersonalInfo] = useRecoilState(personalInfoState);
  const { fullname, username, password, birthDate } = personalInfo;
  const [isShow, setIsShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const mode = useThemeColors();

  const isOkaySignUp =
    fullname.length > 0 &&
    validateEmail(username) &&
    validatePassword(password) &&
    validateBirthDate(birthDate);

  const handleChange = (text: string, name: string) => {
    setPersonalInfo({ ...personalInfo, [name]: text });
  };

  const onSignUp = async () => {
    setIsLoading(true);
    try {
      await signUp(username, password);
      await usersCollection.add({
        ...personalInfo,
      });
      setPersonalInfo({
        fullname: "",
        username: "",
        password: "",
        birthDate: "",
      });
    } catch (error: unknown) {
      if (isFirebaseAuthError(error)) {
        const errorMsg = handleFirebaseAuthError(error);
        showAlert("Failed", errorMsg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const SIGNUP_INPUT_PROPS = [
    {
      id: 1,
      label: "Name",
      name: "fullname",
      value: fullname,
      placeholder: "fullname",
      textContentType: "name",
      autoCapitalize: "words",
      keyboardType: "default",
      placeholderTextColor: "#ddd",
      handleChange: handleChange,
      child: null,
      isValid: true,
      secureTextEntry: false,
      errMsg: undefined,
    },
    {
      id: 2,
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
      id: 3,
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
    {
      id: 4,
      label: "Birth Date",
      name: "birthDate",
      value: birthDate,
      placeholder: "0000/00/00",
      textContentType: "none",
      autoCapitalize: "none",
      keyboardType: "numeric",
      placeholderTextColor: "#ddd",
      handleChange: handleChange,
      child: null,
      isValid: validateBirthDate(birthDate),
      secureTextEntry: false,
      errMsg: "Format ####/##/##",
    },
  ];

  return (
    <Layout>
      <Container>
        <TitleWrapper>
          <ScreenTitle title="Sign Up" />
        </TitleWrapper>
        <View>
          {SIGNUP_INPUT_PROPS.map(
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
            title="Sign Up"
            isLoading={isLoading}
            isOkay={isOkaySignUp}
            onPress={isOkaySignUp ? onSignUp : undefined}
          />
        </View>
      </Container>
    </Layout>
  );
};

export default SignUp;

const Container = styled.ScrollView`
  padding: 0 20px;
`;

const TitleWrapper = styled.View`
  padding: 40px 0;
`;
