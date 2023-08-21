import React from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components/native";

interface ILayoutProp {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProp) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.bg};
  flex: 1;
`;
