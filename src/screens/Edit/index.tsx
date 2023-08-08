import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilState, useRecoilValue } from "recoil";
import { MainStackParamList } from "../@types";
import { INote, notesFilterState, notesState } from "@recoil/atoms";
import { Container, SaveButton, Textarea } from "../NewNote";
import { getNotes, storeNotes } from "~/lib/storage";

type ViewProps = NativeStackScreenProps<MainStackParamList, "Edit">;

const Edit = ({ route, navigation }: ViewProps) => {
  const { noteId } = route.params;
  const [notes, setNotes] = useRecoilState(notesState);
  const [editedText, setEditedText] = useState("");
  const filter = useRecoilValue(notesFilterState);

  const updateNote = async () => {
    const res = await getNotes();

    if (res[noteId].text == editedText || editedText === "") {
      return;
    }

    const updated: INote = {
      [Date.now()]: { text: editedText, folder: filter },
      ...notes,
    };

    delete updated[noteId];
    setNotes(updated);
    await storeNotes(updated);
    navigation.navigate("Home", { folder: filter });
  };

  useEffect(() => {
    setEditedText(notes[noteId].text);
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
