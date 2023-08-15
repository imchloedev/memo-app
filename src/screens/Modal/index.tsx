import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { foldersCollection } from "~/lib";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../@types/index";
import { SaveButton } from "../NewNote";
import { styled } from "styled-components/native";
import { showAlert } from "~/utils";

type ModalProps = NativeStackScreenProps<MainStackParamList, "Modal">;

const Modal = ({ navigation }: ModalProps) => {
  const [text, setText] = useState("");
  const currentUser = auth().currentUser;

  const addFolder = async () => {
    if (!text && text.length < 2) return;

    const newFolder = {
      createdAt: Date.now(),
      creatorId: currentUser?.uid,
      name: text,
    };

    try {
      await foldersCollection.add(newFolder);
      setText("");
      navigation.navigate("Folders");
    } catch (err) {
      showAlert("Error", "An error occurred while making a new folder.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <SaveButton onPress={addFolder}>Add</SaveButton>,
    });
  }, [text]);

  return (
    <Container>
      <Label>New Folder Name</Label>
      <InputWrapper>
        <FolderNameInput value={text} onChangeText={setText} />
      </InputWrapper>
    </Container>
  );
};

export default Modal;

const Container = styled.View`
  flex: 1;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.color.bg};
`;

const Label = styled.Text`
  color: #a3a3a3;
  font-size: 12px;
`;

const InputWrapper = styled.View`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.color.container};
  border-radius: 20px;
`;

const FolderNameInput = styled.TextInput`
  color: ${({ theme }) => theme.color.textColor};
  padding: 18px 20px;
`;
