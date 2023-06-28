import React from "react";
import { Animated, useColorScheme } from "react-native";
import { styled } from "styled-components/native";

interface IHomeHeaderTitle {
  title?: string;
  styles?: any;
}

const HomeHeaderTitle = ({ title, styles }: IHomeHeaderTitle) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Animated.View style={{ opacity: styles }}>
      <HeaderTitle isDarkMode={isDarkMode}>{title}</HeaderTitle>
    </Animated.View>
  );
};

export default HomeHeaderTitle;

const HeaderTitle = styled.Text<{ isDarkMode: boolean }>`
  color: ${({ isDarkMode }) => (isDarkMode ? "white" : "black")};
`;
