import React from "react";
import { View } from "react-native";

interface ISkeletonFrameProps {
  children: React.ReactNode;
  quantity: number;
}

const SkeletonFrame = ({ children, quantity }: ISkeletonFrameProps) => {
  return (
    <View>
      {new Array(quantity).fill("").map((_, idx) => (
        <View key={idx}>{children}</View>
      ))}
    </View>
  );
};

export default SkeletonFrame;
