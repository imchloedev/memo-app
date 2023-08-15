import React, { useEffect } from "react";
import { ScrollView, View, Alert, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { styled } from "styled-components/native";
import auth from "@react-native-firebase/auth";
import { useRecoilState } from "recoil";
import IconButton from "components/IconButton";
import FolderItem from "components/FolderItem";
import Spinner from "components/Spinner";
import { foldersState } from "~/store";
import useThemeColors from "~/hooks/useThemeColors";
import { MainStackParamList } from "../@types";
import { deleteNotesAndFolder, getFolders } from "~/apis";
import { foldersCollection } from "~/lib";
import { GuideText } from "../Home";
import { showAlert } from "~/utils";

type FoldersProps = NativeStackScreenProps<MainStackParamList, "Folders">;

const Folders = ({ navigation }: FoldersProps) => {
  const [folders, setFolders] = useRecoilState(foldersState);
  const mode = useThemeColors();
  const isFocused = useIsFocused();
  const currentUser = auth().currentUser;

  const deleteFolder = async (id: string | undefined, folderName: string) => {
    const shouldDelete = await showDeleteConfirmation();

    if (!shouldDelete) return;

    try {
      await foldersCollection.doc(id).delete();
      await deleteNotesAndFolder(folderName);
      removeFolderFromList(id);
    } catch (error) {
      showAlert("Error", "An error occurred while deleting the folder.");
    }
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

  const removeFolderFromList = (folderId: string | undefined) => {
    setFolders(folders.filter((folder) => folder.id !== folderId));
  };

  const moveToFolder = (folderName: string) => {
    navigation.navigate("Home", { folder: folderName });
  };

  const fetchFolders = async () => {
    try {
      const result = await getFolders(currentUser);
      setFolders(result);
    } catch (error) {
      showAlert("Error", "Please try again later");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [isFocused]);

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
            {folders ? (
              folders.length > 0 ? (
                folders.map((folder, idx) => {
                  const { id, name } = folder;
                  return (
                    <View key={id}>
                      <FolderItem
                        id={id}
                        name={name}
                        moveToFolder={moveToFolder}
                        deleteFolder={deleteFolder}
                      />
                      {folders.length > idx + 1 && <Separator />}
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
