import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRecoilValue, useSetRecoilState } from "recoil";
import HomeHeaderTitle from "@components/HomeHeaderTitle";
import NoteContainer from "@components/NoteContainer";
import { RootStackParamList } from "../@types/index";
import { notesFilterState, notesState } from "@recoil/atoms";
import { getNoteDate } from "~/utils/date";
import { getNotes } from "@api/storage";
import { INoteInfo, filteredNotesList } from "@recoil/selectors";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const setNotes = useSetRecoilState(notesState);
  const filter = useRecoilValue(notesFilterState);
  const filteredNotes = useRecoilValue(filteredNotesList);

  const all = useRecoilValue(notesState);
  console.log(all);

  const loadNotes = async () => {
    const result = await getNotes();
    setNotes(result);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const animatedHeaderTitle = () => {
    const opacity = scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return navigation.setOptions({
      headerTitle: () => <HomeHeaderTitle title={filter} styles={opacity} />,
    });
  };

  useEffect(() => {
    animatedHeaderTitle();
  }, [navigation, scrollY]);

  useEffect(() => {
    loadNotes();
  }, [filter]);

  const moveToNote = (id: string | number) => {
    navigation.navigate("Edit", { noteId: id });
  };

  return (
    <Container>
      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Title>{filter}</Title>
        {filteredNotes &&
          (filteredNotes.length > 0 ? (
            filteredNotes.map(([date, note]) => {
              const info = note as INoteInfo;
              return (
                <NoteContainer key={date} id={date} moveToNote={moveToNote}>
                  <NoteTitleWrapper>
                    <NoteTitle>{info.text}</NoteTitle>
                  </NoteTitleWrapper>
                  <NoteDate>{getNoteDate(Number(date))}</NoteDate>
                  <NoteFolder>{info.folder}</NoteFolder>
                </NoteContainer>
              );
            })
          ) : (
            <GuideText>No Notes here yet.</GuideText>
          ))}
      </Animated.ScrollView>
    </Container>
  );
};

export default Home;

const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme.color.bg};
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  margin: 20px 0;
  padding: 0 20px;
  font-weight: bold;
  color: ${(props) => props.theme.color.textColor};
`;

const NoteTitleWrapper = styled.View`
  height: 20px;
  overflow: hidden;
`;

const NoteTitle = styled.Text.attrs({
  ellipsizeMode: "tail",
  numberOfLines: 2,
})`
  color: ${(props) => props.theme.color.textColor};
`;

const NoteDate = styled.Text`
  color: #666;
`;

const NoteFolder = styled.Text`
  color: #414141;
`;

const GuideText = styled.Text`
  margin: 20px 0;
  text-align: center;
  color: ${(props) => props.theme.color.textColor};
`;
