import React, { Suspense } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "styled-components/native";
import auth from "@react-native-firebase/auth";
import ErrorBoundary from "react-native-error-boundary";
import IconButton from "components/common/IconButton";
import Layout from "components/common/Layout";
import ScreenTitle from "components/common/ScreenTitle";
import FolderSection from "components/folders/FolderSection";
import CustomErrorFallback from "components/fallback/CustomErrorFallback";
import LoadingFallback from "components/fallback/LoadingFallback";
import useThemeColors from "hooks/common/useThemeColors";
import { MainStackParamList } from "../@types";

type FoldersProps = NativeStackScreenProps<MainStackParamList, "Folders">;

const Folders = ({ navigation }: FoldersProps) => {
  const mode = useThemeColors();
  const currentUser = auth().currentUser;

  const moveToFolder = (folderName: string) => {
    navigation.navigate("Home", { folder: folderName });
  };

  return (
    <Layout>
      <Wrapper>
        <TitleWrapper>
          <ScreenTitle title="Folders" />
          <IconButton
            iconName="addfolder"
            onPress={() => navigation.navigate("Modal")}
            color={mode.color.textColor}
          />
        </TitleWrapper>
        <ContentWrapper>
          <ErrorBoundary FallbackComponent={CustomErrorFallback}>
            <Suspense fallback={<LoadingFallback />}>
              <FolderSection user={currentUser} moveToFolder={moveToFolder} />
            </Suspense>
          </ErrorBoundary>
        </ContentWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Folders;

const Wrapper = styled.ScrollView`
  margin: 0 20px;
`;

const TitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const ContentWrapper = styled.View`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.container};
`;
