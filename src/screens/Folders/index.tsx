import React from "react";
import { ScrollView, View, Alert, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "styled-components/native";
import auth from "@react-native-firebase/auth";
import IconButton from "components/IconButton";
import FolderItem from "components/FolderItem";
import useThemeColors from "~/hooks/useThemeColors";
import { showAlert } from "~/utils";
import { useDeleteFolderMutation, useFoldersListQuery } from "~/hooks";
import { MainStackParamList } from "../@types";

type FoldersProps = NativeStackScreenProps<MainStackParamList, "Folders">;

const Folders = ({ navigation }: FoldersProps) => {
  const mode = useThemeColors();
  const currentUser = auth().currentUser;

  const { isLoading, foldersState, error } = useFoldersListQuery(currentUser);
  const { mutation: onDeleteFolder } = useDeleteFolderMutation();

  const deleteFolder = async (id: string | undefined, folderName: string) => {
    const shouldDelete = await showDeleteConfirmation();

    if (!shouldDelete) return;

    onDeleteFolder.mutate({ id, folderName });
  };

  const showDeleteConfirmation = async () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Are you sure to delete this folder?",
        "If confirmed, all notes within this folder will also be removed.",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => resolve(true),
          },
        ]
      );
    });
  };

  const moveToFolder = (folderName: string) => {
    navigation.navigate("Home", { folder: folderName });
  };

  if (error)
    return showAlert("Error", "An error occurred while deleting the folder.");

  return (
    <Container>
      <ScrollView>
        <Wrapper>
          <TitleWrapper>
            <Title>Folders</Title>
            <IconButton
              iconName="addfolder"
              onPress={() => navigation.navigate("Modal")}
              color={mode.color.textColor}
            />
          </TitleWrapper>

          <ContentWrapper>
            {foldersState ? (
              foldersState.length > 0 ? (
                foldersState.map((folder, idx) => {
                  const { id, name } = folder;
                  return (
                    <View key={id}>
                      <FolderItem
                        id={id}
                        name={name}
                        moveToFolder={moveToFolder}
                        deleteFolder={deleteFolder}
                      />
                      {foldersState.length > idx + 1 && <Separator />}
                    </View>
                  );
                })
              ) : (
                <GuideText>No folders here yet!</GuideText>
              )
            ) : (
              <ActivityIndicator />
            )}
          </ContentWrapper>
        </Wrapper>
      </ScrollView>
    </Container>
  );
};

export default Folders;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bg};
`;

const Wrapper = styled.View`
  margin: 0 20px;
`;

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
`;

const ContentWrapper = styled.View`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.container};
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.separator};
`;

const GuideText = styled.Text`
  margin: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.textColor};
`;
