import React, { useState } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { styled } from "styled-components/native";
import { personalInfoState } from "~/recoil/atoms";
import IconButton from "~/components/IconButton";
import useThemeColors from "~/hooks/useThemeColors";
import Input from "~/components/Auth/Input";
import SubmitBtn from "~/components/Auth/SubmitBtn";
import {
  validateBirthDate,
  validateEmail,
  validatePassword,
} from "~/utils/validation";
import { signUp } from "~/lib/auth";

const SignUp = () => {
  const [personalInfo, setPersonalInfo] = useRecoilState(personalInfoState);
  const { fullname, username, password, birthDate } = personalInfo;
  const [isShow, setIsShow] = useState(true);
  const mode = useThemeColors();

  const isOkaySignUp = !(
    validateEmail(username) &&
    validatePassword(password) &&
    validateBirthDate(birthDate)
  );

  const handleChange = (text: string, name: string) => {
    setPersonalInfo({ ...personalInfo, [name]: text });
  };

  const onSignUp = async () => {
    try {
      await signUp(username, password);
      setPersonalInfo({
        ...personalInfo,
        fullname: "",
        username: "",
        password: "",
        birthDate: "",
      });
    } catch (err) {
      console.log(err);
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
      isValid: false,
      secureTextEntry: false,
      errMsg: "",
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
      isValid: validatePassword(password),
      errMsg: "Must be 8-20 characters in length",
    },
    {
      id: 4,
      label: "Birth Date",
      name: "birthDate",
      value: birthDate,
      placeholder: "email",
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
    <Container>
      <TitleWrapper>
        <Title>Sign Up</Title>
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
          onPress={isOkaySignUp ? onSignUp : undefined}
        />
      </View>
    </Container>
  );
};

export default SignUp;

const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  background-color: ${({ theme }) => theme.color.bg};
  padding: 0 20px;
`;

const TitleWrapper = styled.View`
  padding: 40px 0;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;

  color: ${({ theme }) => theme.color.textColor};
`;
