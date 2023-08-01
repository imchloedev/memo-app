import React from "react";
import { Button, TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

interface ISubmitBtnProps {
  title: string;
  color: string;
  disabled: boolean;
  onPress: () => void;
}

const SubmitBtn = ({ title, color, disabled, onPress }: ISubmitBtnProps) => {
  return (
    <BtnContainer>
      <Button
        title={title}
        color={color}
        disabled={disabled}
        onPress={onPress}
      />
    </BtnContainer>
  );
};

export default SubmitBtn;

const BtnContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.black};
  border-radius: 100px;
  height: 44px;
  margin-top: 20px;
`;
