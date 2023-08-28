import React from "react";
import { Text, View } from "react-native";
import { styled } from "styled-components/native";
import IconButton from "components/IconButton";
import useThemeColors from "~/hooks/common/useThemeColors";
import { INote } from "~/store";
import { getNoteDate } from "~/utils/dateToString";
import { useDeleteNoteMutation, usePinNoteMutation } from "~/hooks/notes";

interface INoteItemProps {
  note: INote;
  moveToNote: (id: string | undefined) => void;
}

const NoteItem = ({ note, moveToNote }: INoteItemProps) => {
  const { id, createdAt, text, folder, isPinned } = note;
  const { mutation: onPinNote } = usePinNoteMutation();
  const { mutation: onDeleteNote } = useDeleteNoteMutation();
  const mode = useThemeColors();

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
          onPress={() => onDeleteNote.mutate(id)}
        />
        <IconButton
          iconName={isPinned ? "pushpin" : "pushpino"}
          color={mode.color.iconColor}
          onPress={() => onPinNote.mutate({ id, isPinned })}
        />
      </ButtonWrapper>

      {onDeleteNote.isLoading && (
        <StatusBox>
          <StatusWrapper>
            <Text>Processing...</Text>
          </StatusWrapper>
        </StatusBox>
      )}
    </Wrapper>
  );
};

export default NoteItem;

const Wrapper = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.color.container};
  margin: 10px 20px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
1;

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
  margin-top: 10px;
`;

const ButtonWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const StatusBox = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: gray;
`;

const StatusWrapper = styled.View`
  /* position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0; */
`;
