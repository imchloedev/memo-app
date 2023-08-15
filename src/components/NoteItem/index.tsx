import React from "react";
import { useRecoilState } from "recoil";
import { View } from "react-native";
import { styled } from "styled-components/native";
import IconButton from "components/IconButton";
import useThemeColors from "~/hooks/useThemeColors";
import { INote, notesState } from "~/store";
import { memosCollection } from "~/lib";
import { getNoteDate } from "~/utils/dateToString";

interface INoteItemProps {
  note: INote;
  moveToNote: (id: string | undefined) => void;
}

const NoteItem = ({ note, moveToNote }: INoteItemProps) => {
  const { id, createdAt, text, folder } = note;
  const mode = useThemeColors();
  const [notes, setNotes] = useRecoilState(notesState);

  const deleteNote = async (noteId: undefined | string) => {
    try {
      await memosCollection.doc(noteId).delete();
      removeNoteFromList(noteId);
    } catch (err) {
      console.log(err);
    }
  };

  const removeNoteFromList = (noteId: string | undefined) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <Wrapper onPress={() => moveToNote(id)}>
      <View>
        <NoteTitleWrapper>
          <NoteTitle>{text}</NoteTitle>
        </NoteTitleWrapper>
        <NoteDate>{getNoteDate(Number(createdAt))}</NoteDate>
        <NoteFolder>{folder}</NoteFolder>
      </View>

      <ButtonWrapper>
        <IconButton
          iconName="delete"
          color={mode.color.iconColor}
          onPress={() => deleteNote(id)}
        />
        <IconButton
          iconName="pushpino"
          color={mode.color.iconColor}
          onPress={() => console.log("DD")}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default NoteItem;

const Wrapper = styled.TouchableOpacity`
  flex: 2;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.container};
  height: 100px;
  margin: 10px 20px;
  padding: 14px;
  border-radius: 20px;
  /* overflow: hidden; */
`;

const NoteTitleWrapper = styled.View`
  height: 20px;
  overflow: hidden;
`;

const NoteTitle = styled.Text.attrs({
  ellipsizeMode: "tail",
  numberOfLines: 2,
})`
  color: ${({ theme }) => theme.color.textColor};
`;

const NoteDate = styled.Text`
  color: #666;
`;

const NoteFolder = styled.Text`
  color: #787878;
`;

const ButtonWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;
