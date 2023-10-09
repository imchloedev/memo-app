import React from "react";
import { Animated } from "react-native";
import { styled } from "styled-components/native";

interface IHeaderTitle {
  title?: string;
  styles?: Animated.AnimatedInterpolation<string | number>;
}

const AnimatedHeaderTitle = ({ title, styles }: IHeaderTitle) => {
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
