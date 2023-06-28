import React from "react";
import { useColorScheme } from "react-native";
import { styled } from "styled-components/native";

const NoteContainer = ({ title }: any) => {
  const isDarkMode = useColorScheme() === "dark";
  // note mock data required here

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <NoteTitle isDarkMode={isDarkMode}>{title}</NoteTitle>
    </Wrapper>
  );
};

export default NoteContainer;

const Wrapper = styled.View<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#444" : "#eee")};
  height: 100px;
  margin: 10px 20px;
  padding: 14px;
  border-radius: 20px;
  color: ${({ isDarkMode }) => (isDarkMode ? "white" : "#444")};
`;

const NoteTitle = styled.Text<{ isDarkMode: boolean }>`
  color: ${({ isDarkMode }) => (isDarkMode ? "white" : "#444")};
`;
