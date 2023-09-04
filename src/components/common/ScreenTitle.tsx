import React from "react";
import { styled } from "styled-components/native";

interface IScreenTitleProp {
  title: string;
}

const ScreenTitle = ({ title }: IScreenTitleProp) => {
  return <Title>{title}</Title>;
};

export default ScreenTitle;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
`;
