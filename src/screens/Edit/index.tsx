import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { MainStackParamList } from "screens/@types";
import { notesState, notesFilterState, INote } from "~/store";
import { memosCollection } from "~/lib";
import { Container, SaveButton, Textarea } from "../NewNote";
import { showAlert } from "~/utils";

type ViewProps = NativeStackScreenProps<MainStackParamList, "Edit">;

const Edit = ({ route, navigation }: ViewProps) => {
  const { noteId } = route.params;
  const [editedText, setEditedText] = useState("");

  const notes = useRecoilValue(notesState);
  const filter = useRecoilValue(notesFilterState);
  const note: INote | undefined = notes.find((note) => note.id === noteId);

  const updateNote = async () => {
    if (!note) {
      return;
    }

    if (note.text == editedText || editedText === "") return;

    const updated = {
      createdAt: Date.now(),
      text: editedText,
    };

    try {
      await memosCollection.doc(note.id).update(updated);
      navigation.navigate("Home", { folder: filter });
    } catch (error) {
      showAlert("Error", "An error occurred while updating the note.");
    }
  };

  useEffect(() => {
    if (note) {
      setEditedText(note.text);
    }
  }, [note]);

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
