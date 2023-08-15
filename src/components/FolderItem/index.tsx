import React from "react";
import { styled } from "styled-components/native";
import Icon from "react-native-vector-icons/AntDesign";
import IconButton from "components/IconButton";
import useThemeColors from "~/hooks/useThemeColors";

interface IFolderItemProps {
  id: string | undefined;
  name: string;
  moveToFolder: (name: string) => void;
  deleteFolder: (id: string | undefined, name: string) => void;
}

const FolderItem = ({
  id,
  name,
  deleteFolder,
  moveToFolder,
}: IFolderItemProps) => {
  const mode = useThemeColors();

  return (
    <FolderBox onPress={() => moveToFolder(name)}>
      <FolderTitle>
        <Icon name="right" size={16} color={mode.color.iconColor} />
        <FolderName>{name}</FolderName>
      </FolderTitle>
      <IconButton
        iconName="delete"
        color={mode.color.iconColor}
        onPress={() => deleteFolder(id, name)}
      />
    </FolderBox>
  );
};

export default FolderItem;

const FolderBox = styled.TouchableOpacity`
  margin: 14px 0;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FolderTitle = styled.View`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;

const FolderName = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
`;
