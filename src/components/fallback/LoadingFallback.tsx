import React from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { styled } from "styled-components/native";

const LoadingFallback = () => {
  return (
    <Container>
      <ActivityIndicator />
      <LoadingCopy>Loading....</LoadingCopy>
    </Container>
  );
};

export default LoadingFallback;

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.bg};
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const LoadingCopy = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
  margin-top: 20px;
`;
