import React from "react";
import { styled } from "styled-components/native";

interface IInputProps {
  value: string;
  name: string;
  label: string;
  textContentType: any;
  autoCapitalize: any;
  secureTextEntry: boolean;
  placeholder: string;
  placeholderTextColor: string;
  handleChange: (txt: string, type: string) => void;
  errMsg: string;
  child: React.ReactNode | null;
  isValid: boolean;
}

const Input = ({
  value,
  name,
  textContentType,
  autoCapitalize,
  secureTextEntry,
  placeholder,
  placeholderTextColor,
  handleChange,
  errMsg,
  child,
  isValid,
  label,
}: IInputProps) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputWrapper>
        <InputBox
          value={value}
          textContentType={textContentType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={(text: string) => handleChange(text, name)}
        />
        {child}
      </InputWrapper>
      {isValid && <ErrorMsg>{errMsg}</ErrorMsg>}
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const InputLabel = styled.Text`
  color: #a3a3a3;
  font-size: 12px;
`;

const InputWrapper = styled.View`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.color.container};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const InputBox = styled.TextInput`
  flex-basis: 90%;
  height: 24px;
  color: ${({ theme }) => theme.color.textColor};
`;

const ErrorMsg = styled.Text`
  font-size: 12px;
  color: red;
  margin-top: 5px;
  margin-left: 5px;
`;
