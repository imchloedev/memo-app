import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { MainStackParamList } from "screens/@types";
import { notesFilterState } from "~/store";
import { showAlert } from "~/utils";
import { useNoteQuery, useUpdateNoteMutation } from "~/hooks/notes";
import { Container, SaveButton, Textarea } from "../NewNote";

type ViewProps = NativeStackScreenProps<MainStackParamList, "Edit">;

const Edit = ({ route, navigation }: ViewProps) => {
  const { noteId } = route.params;
  const [editedText, setEditedText] = useState("");
  const { note } = useNoteQuery(noteId);
  const filter = useRecoilValue(notesFilterState);

  const onSuccessUN = () => {
    navigation.navigate("Home", { folder: filter });
  };

  const onErrorUN = () => {
    showAlert("Error", "An error occurred while updating the note.");
  };

  const { mutation: onUpdateNote } = useUpdateNoteMutation(
    onSuccessUN,
    onErrorUN
  );

  const updated = {
    createdAt: Date.now(),
    text: editedText,
  };

  const updateNote = () => {
    if (!note) {
      return;
    }

    if (note.text == editedText || editedText === "") return;

    onUpdateNote.mutate({ noteId, updated });
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
