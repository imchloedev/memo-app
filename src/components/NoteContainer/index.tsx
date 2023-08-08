import React from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";
import { useRecoilState } from "recoil";
import IconButton from "@components/IconButton";
import { INote, notesState } from "@recoil/atoms";
import { storeNotes } from "@api/storage";
import useThemeColors from "~/hooks/useThemeColors";

interface INoteContainerProps {
  children: React.ReactNode;
  id: string | number;
  moveToNote: (id: string | number) => void;
}

const NoteContainer = ({ children, moveToNote, id }: INoteContainerProps) => {
  const mode = useThemeColors();
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
          color={mode.color.iconColor}
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
  background-color: ${({ theme }) => theme.color.container};
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
