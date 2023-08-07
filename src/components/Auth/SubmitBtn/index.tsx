import React from "react";
import { styled } from "styled-components/native";

interface ISubmitBtnProps {
  title: string;
  onPress: (() => void) | undefined;
}

const SubmitBtn = ({ title, onPress }: ISubmitBtnProps) => {
  return (
    <BtnContainer onPress={onPress}>
      <BtnText>{title}</BtnText>
    </BtnContainer>
  );
};

export default SubmitBtn;

const BtnContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.black};
  border-radius: 100px;
  height: 44px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.color.white};
`;
