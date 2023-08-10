import React from "react";
import { Animated } from "react-native";
import { Keyframe } from "react-native-reanimated";
import { styled } from "styled-components/native";

const Spinner = () => {
  return (
    <Animated.View style={{ backgroundColor: "gray", width: 120, height: 20 }}>
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </Animated.View>
  );
};

export default Spinner;

const Wrapper = styled.View`
  background-color: gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 120px;
  height: 20px;
`;

const Item = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: aquamarine;
`;

const loadingAnim = new Keyframe({
  0: {
    opacity: 1,
    top: "50%",
  },
  50: {
    opacity: 0.3,
    top: 0,
  },
  100: {
    opacity: 1,
    top: "50%",
  },
});
