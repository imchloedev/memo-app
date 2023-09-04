import React from "react";
import { Animated } from "react-native";
import { styled } from "styled-components/native";

interface IHomeHeaderTitle {
  title?: string;
  styles?: any;
}

const AnimatedHeaderTitle = ({ title, styles }: IHomeHeaderTitle) => {
  return (
    <Animated.View style={{ opacity: styles }}>
      <HeaderTitle>{title}</HeaderTitle>
    </Animated.View>
  );
};

export default AnimatedHeaderTitle;

const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
`;
