import React, { useRef, useEffect } from "react";
import { Animated, SectionList } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilState } from "recoil";
import auth from "@react-native-firebase/auth";
import HomeHeaderTitle from "components/HomeHeaderTitle";
import NoteItem from "components/NoteItem";
import Layout from "components/Layout";
import ScreenTitle from "components/ScreenTitle";
import { notesFilterState } from "~/store";
import { MainStackParamList } from "../@types/index";
import { useNotesListQuery } from "hooks/notes";

type HomeProps = NativeStackScreenProps<MainStackParamList, "Home">;

const Home = ({ navigation, route }: HomeProps) => {
  const { folder } = route.params;
  const currentUser = auth().currentUser;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [filter, setFilter] = useRecoilState(notesFilterState);
  const { isLoading, error, notesState } = useNotesListQuery(currentUser);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const moveToNote = (id: string | undefined) => {
    navigation.navigate("Edit", { noteId: id });
  };

  useEffect(() => {
    setFilter(folder);
  }, [navigation.isFocused]);

  useEffect(() => {
    const animatedHeaderTitle = () => {
      const opacity = scrollY.interpolate({
        inputRange: [0, 80],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });
      return navigation.setOptions({
        headerTitle: () => <HomeHeaderTitle title={folder} styles={opacity} />,
      });
    };

    animatedHeaderTitle();
  }, [scrollY]);

  return (
    <Layout>
      {notesState && (
        <SectionList
          sections={[
            {
              title: "Pinned",
              data: notesState.filter((note) => note.isPinned === true),
            },
            {
              title: "Notes",
              data: notesState.filter((note) => note.isPinned === false),
            },
          ]}
          style={{ flex: 1 }}
          renderSectionHeader={({ section: { title } }) => (
            <CategoryText>{title}</CategoryText>
          )}
          renderItem={({ item }) => (
            <NoteItem note={item} moveToNote={moveToNote} />
          )}
          keyExtractor={(item) => item.id?.toString() || ""}
          ListHeaderComponent={() => (
            <TitleWrapper>
              <ScreenTitle title={filter} />
            </TitleWrapper>
          )}
          stickySectionHeadersEnabled={true}
          onScroll={handleScroll}
        />
      )}
    </Layout>
  );
};

export default Home;

const TitleWrapper = styled.View`
  padding: 20px;
`;

const CategoryText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
  padding: 10px 28px;
`;
