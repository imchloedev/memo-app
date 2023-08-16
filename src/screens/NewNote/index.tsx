import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { styled } from "styled-components/native";
import { useRecoilState, useRecoilValue } from "recoil";
import auth from "@react-native-firebase/auth";
import { INote, notesFilterState, textState } from "~/store";
import { showAlert } from "~/utils";
import { useAddNoteMutation } from "~/hooks/notes";
import { MainStackParamList } from "../@types";

type NewNoteProps = NativeStackScreenProps<MainStackParamList, "Note">;

const NewNote = ({ navigation }: NewNoteProps) => {
  const [text, setText] = useRecoilState(textState);
  const filter = useRecoilValue(notesFilterState);

  const onSuccessNN = () => {
    setText("");
    navigation.navigate("Home", { folder: filter });
  };

  const onErrorNN = () => {
    showAlert("Error", "An error occurred while adding a new note.");
  };

  const currentUser = auth().currentUser;
  const { mutation: onAddNote } = useAddNoteMutation(onSuccessNN, onErrorNN);

  const newNote: INote = {
    createdAt: Date.now(),
    creatorId: currentUser?.uid,
    text,
    folder: filter,
    isPinned: false,
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton onPress={() => onAddNote.mutate(newNote)}>Done</SaveButton>
      ),
    });
  }, [navigation, text]);

  return (
    <Container>
      <ScrollView>
        <Textarea
          multiline={true}
          autoFocus
          value={text}
          onChangeText={(text: string) => setText(text)}
          placeholder="Insert here"
        />
      </ScrollView>
    </Container>
  );
};

export default NewNote;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.color.bg};
`;

export const Textarea = styled.TextInput.attrs({
  placeholderTextColor: "#555",
})`
  color: ${({ theme }) => theme.color.textColor};
`;

export const SaveButton = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
  font-size: 16px;
`;
