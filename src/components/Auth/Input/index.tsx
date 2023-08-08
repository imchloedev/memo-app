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
  errMsg: string | "";
  child: React.ReactNode | null;
  isValid: boolean;
}

const Input = (props: IInputProps) => {
  const { name, handleChange, errMsg, child, isValid, label, ...others } =
    props;

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputWrapper>
        <InputBox
          {...others}
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
  border-radius: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const InputBox = styled.TextInput`
  flex-basis: 90%;
  height: 34px;
  color: ${({ theme }) => theme.color.textColor};
`;

const ErrorMsg = styled.Text`
  font-size: 12px;
  color: red;
  margin-top: 5px;
  margin-left: 5px;
`;
