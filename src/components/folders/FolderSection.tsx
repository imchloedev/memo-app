import React from "react";
import { Alert, View } from "react-native";
import { styled } from "styled-components/native";
import FolderItem from "components/folders/FolderItem";
import { useDeleteFolderMutation, useFoldersListQuery } from "hooks/folders";
import { TUser } from "apis";

interface IFolderSectionProps {
  user: TUser;
  moveToFolder: (foldername: string) => void;
}

const FolderSection = ({ user, moveToFolder }: IFolderSectionProps) => {
  const { foldersState } = useFoldersListQuery(user);
  const { mutation: onDeleteFolder } = useDeleteFolderMutation();

  const deleteFolder = async (
    id: string | undefined,
    folderName: string,
    user: TUser
  ) => {
    const shouldDelete = await showDeleteConfirmation();

    if (!shouldDelete) return;

    onDeleteFolder.mutate({ id, folderName, user });
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

  return (
    <>
      {foldersState &&
        (foldersState.length > 0 ? (
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
        ))}
    </>
  );
};

export default FolderSection;

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
