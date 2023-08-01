import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { styled } from "styled-components/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { MainStackParamList } from "../@types";
import { notesFilterState, notesState, textState } from "@recoil/atoms";
import { storeNotes } from "@api/storage";

type NewNoteProps = NativeStackScreenProps<MainStackParamList, "Note">;

const NewNote = ({ navigation }: NewNoteProps) => {
  const [text, setText] = useRecoilState(textState);
  const [notes, setNotes] = useRecoilState(notesState);
  const filter = useRecoilValue(notesFilterState);

  const addNote = async () => {
    if (text === "" || text === " ") {
      return;
    }

    const newNotes = {
      [Date.now()]: { text: text, folder: filter },
      ...notes,
    };

    setNotes(newNotes);
    await storeNotes(newNotes);
    navigation.navigate("Home");
    setText("");
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SaveButton onPress={addNote}>Done</SaveButton>,
    });
  }, [navigation, text]);

  return (
    <Container>
      <View>
        <Textarea
          multiline={true}
          autoFocus
          value={text}
          onChangeText={(text: string) => setText(text)}
          placeholder="Insert here"
        />
      </View>
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
