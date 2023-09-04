import React from "react";
import { ActivityIndicator } from "react-native";
import { styled } from "styled-components/native";
import { light } from "~/styles/theme";

interface ISubmitBtnProps {
  title: string;
  isLoading: boolean;
  isOkay: boolean;
  onPress: (() => void) | undefined;
}

const SubmitBtn = ({ title, onPress, isLoading, isOkay }: ISubmitBtnProps) => {
  return (
    <BtnContainer onPress={onPress} isOkay={isOkay}>
      {isLoading ? <ActivityIndicator /> : <BtnText>{title}</BtnText>}
    </BtnContainer>
  );
};

export default SubmitBtn;

const BtnContainer = styled.TouchableOpacity<{ isOkay: boolean }>`
  background-color: ${({ isOkay, theme }) =>
    isOkay ? theme.color.buttonColor : theme.color.deactiveColor};
  border-radius: 100px;
  height: 44px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => {
    return theme === light ? theme.color.white : theme.color.black;
  }};
`;
