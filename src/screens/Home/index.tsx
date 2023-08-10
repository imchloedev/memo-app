import React, { useRef, useEffect, useCallback } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import auth from "@react-native-firebase/auth";
import HomeHeaderTitle from "components/HomeHeaderTitle";
import NoteItem from "components/NoteItem";
import Spinner from "components/Spinner";
import { notesFilterState, notesState, filteredNotesList } from "~/store";
import { MainStackParamList } from "../@types/index";
import { getNotes } from "apis/memo";

type HomeProps = NativeStackScreenProps<MainStackParamList, "Home">;

const Home = ({ navigation, route }: HomeProps) => {
  const { folder } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const currentUser = auth().currentUser;

  const setNotes = useSetRecoilState(notesState);
  const [filter, setFilter] = useRecoilState(notesFilterState);
  const filteredNotes = useRecoilValue(filteredNotesList);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const fetchNotes = async () => {
    try {
      const result = await getNotes(currentUser);
      setNotes(result);
    } catch (error) {
      console.error("Error fetching memos:", error);
    }
  };

  const moveToNote = (id: string | undefined) => {
    navigation.navigate("Edit", { noteId: id });
  };

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
  }, [scrollY, navigation]);

  useFocusEffect(
    useCallback(() => {
      setFilter(folder);
      fetchNotes();
    }, [])
  );

  return (
    <Container>
      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Title>{filter}</Title>
        {filteredNotes ? (
          filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteItem key={note.id} note={note} moveToNote={moveToNote} />
            ))
          ) : (
            <GuideText>No Notes here yet.</GuideText>
          )
        ) : (
          <Spinner />
        )}
      </Animated.ScrollView>
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

const GuideText = styled.Text`
  margin: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.color.textColor};
`;
