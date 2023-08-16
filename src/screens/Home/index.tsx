import React, { useRef, useEffect } from "react";
import { ActivityIndicator, Animated, FlatList } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import auth from "@react-native-firebase/auth";
import HomeHeaderTitle from "components/HomeHeaderTitle";
import NoteItem from "~/components/NoteItem";
import { notesFilterState } from "~/store";
import { showAlert } from "~/utils";
import { useNotesListQuery } from "~/hooks/notes";

import { MainStackParamList } from "../@types/index";

type HomeProps = NativeStackScreenProps<MainStackParamList, "Home">;

const Home = ({ navigation, route }: HomeProps) => {
  const { folder } = route.params;
  const currentUser = auth().currentUser;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [filter, setFilter] = useRecoilState(notesFilterState);
  const isFocused = useIsFocused();
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
  }, [isFocused]);

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

  if (isLoading) return <ActivityIndicator />;
  if (error) return showAlert("Error", "Please try again later.");

  return (
    <Container>
      {notesState && (
        <FlatList
          data={notesState}
          renderItem={({ item }) => (
            <NoteItem note={item} moveToNote={moveToNote} />
          )}
          keyExtractor={(item) => item.id?.toString() || ""}
          onScroll={handleScroll}
          ListHeaderComponent={() => <Title>{filter}</Title>}
        />
      )}
    </Container>
  );
};

export default Home;

const Container = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.color.bg};
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  margin: 20px 0;
  padding: 0 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
`;
