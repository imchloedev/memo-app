import { Animated, View } from "react-native";
import { styled } from "styled-components/native";
import React, { useEffect, useRef } from "react";

interface ItemProps {
  children: React.ReactNode;
}

const SkeletonItem = ({ children }: ItemProps) => {
  const animValue = useRef(new Animated.Value(0)).current;

  const interpolatedOpacity: Animated.AnimatedInterpolation<number> =
    animValue.interpolate({
      inputRange: [0, 0.75, 1],
      outputRange: [0, 0.75, 1],
    });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View style={{ opacity: interpolatedOpacity }}>
      {children}
    </Animated.View>
  );
};

export default SkeletonItem;

export const SItem = styled.View`
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.color.skeletonColor};
  overflow: hidden;
  border-radius: 8px;
`;
