import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { styled } from "styled-components/native";

interface IIconButtonProps {
  iconName: string;
  color: string;
  onPress: () => void;
}

const IconButton = ({ iconName, color, onPress }: IIconButtonProps) => {
  return (
    <IconContainer>
      <Icon name={iconName} color={color} onPress={onPress} size={20} />
    </IconContainer>
  );
};

export default IconButton;

export const IconContainer = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;
