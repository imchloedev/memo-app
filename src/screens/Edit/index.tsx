import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SaveButton, Textarea } from "../NewNote";
import { ActivityIndicator } from "react-native";
import { styled } from "styled-components/native";
import { MainStackParamList } from "screens/@types";
import Layout from "~/components/common/Layout";
import { generateKeyword, showAlert } from "utils";
import { useNoteQuery, useUpdateNoteMutation } from "hooks/notes";

type ViewProps = NativeStackScreenProps<MainStackParamList, "Edit">;

const Edit = ({ route, navigation }: ViewProps) => {
  const { noteId } = route.params;
  const { note } = useNoteQuery(noteId);
  const [editedText, setEditedText] = useState("");

  const onErrorUN = () => {
    showAlert("Error", "An error occurred while updating the note.");
  };

  const { mutation: onUpdateNote } = useUpdateNoteMutation(onErrorUN);

  const updated = {
    createdAt: Date.now(),
    text: editedText,
    keywords: generateKeyword(editedText),
    lowercaseKeywords: generateKeyword(editedText.toLocaleLowerCase()),
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
        {note ? (
          <Textarea
            value={editedText}
            multiline={true}
            onChangeText={(text: string) => setEditedText(text)}
            placeholder="Insert here"
          />
        ) : (
          <ActivityIndicator />
        )}
      </Wrapper>
    </Layout>
  );
};

export default Edit;

const Wrapper = styled.ScrollView`
  padding: 20px;
`;
