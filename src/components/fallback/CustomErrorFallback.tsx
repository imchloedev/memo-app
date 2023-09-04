import React from "react";
import { Text } from "react-native";
import { styled } from "styled-components/native";

export type Props = { error: Error; resetError: () => void };

const CustomErrorFallback = ({ error, resetError }: Props) => {
  return (
    <Container>
      <ErrorMsg>Something happened!</ErrorMsg>
      <Text>{error.toString()}</Text>
      <RetryCopy>Please try again.</RetryCopy>
    </Container>
  );
};

export default CustomErrorFallback;

const Container = styled.SafeAreaView`
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
  margin-top: 40px;
  color: ${({ theme }) => theme.color.textColor};
`;
