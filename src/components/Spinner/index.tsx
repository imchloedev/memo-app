import React from "react";
import { ActivityIndicator } from "react-native";
import { styled } from "styled-components/native";

const Spinner = () => {
  return (
    <Container>
      <ActivityIndicator />
    </Container>
  );
};

export default Spinner;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;
