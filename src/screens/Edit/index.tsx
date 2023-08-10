import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { MainStackParamList } from "screens/@types";
import { notesState, notesFilterState } from "~/store";
import { memosCollection } from "~/lib";
import { Container, SaveButton, Textarea } from "../NewNote";

type ViewProps = NativeStackScreenProps<MainStackParamList, "Edit">;

const Edit = ({ route, navigation }: ViewProps) => {
  const { noteId } = route.params;
  const [editedText, setEditedText] = useState("");

  const notes = useRecoilValue(notesState);
  const filter = useRecoilValue(notesFilterState);

  const note = notes.filter((note) => note.id == noteId);

  const updateNote = async () => {
    if (note[0].text == editedText || editedText === "") {
      return;
    }

    const updated = {
      createdAt: Date.now(),
      text: editedText,
    };

    await memosCollection.doc(note[0].id).update(updated);

    navigation.navigate("Home", { folder: filter });
  };

  useEffect(() => {
    setEditedText(note[0].text);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SaveButton onPress={updateNote}>Done</SaveButton>,
    });
  }, [editedText]);

  return (
    <Container>
      <Textarea
        value={editedText}
        multiline={true}
        onChangeText={(text: string) => setEditedText(text)}
        placeholder="Insert here"
      />
    </Container>
  );
};

export default Edit;
