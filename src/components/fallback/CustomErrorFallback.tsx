import React from "react";
import { Text } from "react-native";
import { styled } from "styled-components/native";

export type Props = { error: Error; resetError: () => void };

const CustomErrorFallback = ({ error, resetError }: Props) => {
  return (
    <Container>
      <ErrorMsg>Something happened!</ErrorMsg>
      <RetryCopy>Please try again.</RetryCopy>
    </Container>
  );
};

export default CustomErrorFallback;

const Container = styled.SafeAreaView`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.color.bg};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorMsg = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.textColor};
`;

const RetryCopy = styled.Text`
  margin-top: 10px;
  color: ${({ theme }) => theme.color.textColor};
`;
