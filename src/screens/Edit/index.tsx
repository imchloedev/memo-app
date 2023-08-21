import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "styled-components/native";
import { MainStackParamList } from "screens/@types";
import Layout from "components/Layout";
import { generateKeyword, showAlert } from "~/utils";
import { useNoteQuery, useUpdateNoteMutation } from "~/hooks/notes";
import { SaveButton, Textarea } from "../NewNote";

type ViewProps = NativeStackScreenProps<MainStackParamList, "Edit">;

const Edit = ({ route, navigation }: ViewProps) => {
  const { noteId } = route.params;
  const [editedText, setEditedText] = useState("");
  const { note } = useNoteQuery(noteId);

  console.log(navigation.canGoBack());

  const onSuccessUN = () => {
    // navigation.navigate("Home", { folder: filter });
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
    keywords: generateKeyword(editedText),
  };

  const updateNote = () => {
    if (!note) {
      return;
    } else if (note.text == editedText || editedText === "") {
      return;
    }

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
    <Layout>
      <Wrapper>
        <Textarea
          value={editedText}
          multiline={true}
          onChangeText={(text: string) => setEditedText(text)}
          placeholder="Insert here"
        />
      </Wrapper>
    </Layout>
  );
};

export default Edit;

const Wrapper = styled.ScrollView`
  padding: 20px;
`;
