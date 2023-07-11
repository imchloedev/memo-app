import React from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";
import { useRecoilState } from "recoil";
import { useColorScheme } from "react-native";
import IconButton from "@components/IconButton";
import { dark, light } from "@styles/theme";
import { INote, notesState } from "@recoil/atoms";
import { storeNotes } from "@api/storage";

interface INoteContainerProps {
  children: React.ReactNode;
  id: string | number;
  moveToNote: (id: string | number) => void;
}

const NoteContainer = ({ children, moveToNote, id }: INoteContainerProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const currentTheme = isDarkMode ? dark : light;
  const [notes, setNotes] = useRecoilState<INote>(notesState);

  const deleteNote = async (key: number | string) => {
    const newNotes = { ...notes };

    delete newNotes[key];
    setNotes(newNotes);
    await storeNotes(newNotes);
  };

  return (
    <Wrapper onPress={() => moveToNote(id)}>
      <View>{children}</View>

      <ButtonWrapper>
        <IconButton
          iconName="delete"
          color={currentTheme.color.commonMiddleGray}
          onPress={() => deleteNote(id)}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default NoteContainer;

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.memoContainer};
  height: 100px;
  margin: 10px 20px;
  padding: 14px;
  border-radius: 20px;
  overflow: hidden;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;
