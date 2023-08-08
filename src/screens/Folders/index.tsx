import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../@types";
import { styled } from "styled-components/native";
import { useRecoilValue } from "recoil";
import { foldersState } from "~/recoil/atoms";
import Icon from "react-native-vector-icons/AntDesign";
import useThemeColors from "~/hooks/useThemeColors";

type FoldersProps = NativeStackScreenProps<MainStackParamList, "Folders">;

const Folders = ({ navigation }: FoldersProps) => {
  const folders = useRecoilValue(foldersState);
  const mode = useThemeColors();

  return (
    <Container>
      <Title>Folders</Title>
      <Wrapper>
        {folders.map(({ id, name }) => (
          <View>
            <FolderBox
              key={id}
              onPress={() => navigation.navigate("Home", { folder: name })}
            >
              <Icon name="right" size={16} color={mode.color.iconColor} />
              <FolderName>{name}</FolderName>
            </FolderBox>
            {folders.length > id && <Separator />}
          </View>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Folders;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.color.bg};
`;

const Title = styled.Text`
  font-size: 24px;
  margin: 40px 0;
  padding: 0 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
`;

const Wrapper = styled.View`
  margin: 0 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.container};
`;

const FolderBox = styled.TouchableOpacity`
  margin: 10px 0;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;

const FolderName = styled.Text`
  color: ${({ theme }) => theme.color.textColor};
`;

const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.separator};
`;
