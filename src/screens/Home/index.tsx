import React, { useRef, useEffect } from "react";
import { Animated, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MemoContainer from "~/components/NoteContainer";
import HomeHeaderTitle from "~/components/HomeHeaderTitle";
import { RootStackParamList } from "../@types/index";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const NOTES = [
  { id: 1, title: "title 1" },
  { id: 2, title: "title 1" },
  { id: 3, title: "title 1" },
  { id: 4, title: "title 1" },
  { id: 5, title: "title 1" },
  { id: 6, title: "title 1" },
  { id: 7, title: "title 1" },
  { id: 8, title: "title 1" },
  { id: 9, title: "title 1" },
  { id: 10, title: "title 1" },
  { id: 11, title: "title 1" },
];

const Home = ({ navigation }: HomeProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;

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
      headerTitle: () => <HomeHeaderTitle title="Notes" styles={opacity} />,
    });
  };

  useEffect(() => {
    animatedHeaderTitle();
  }, [navigation, scrollY]);

  return (
    <Container isDarkMode={isDarkMode}>
      <Animated.ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <Title isDarkMode={isDarkMode}>Notes</Title>
        {NOTES.map((note) => (
          <MemoContainer key={note.id} title={note.title} />
        ))}
      </Animated.ScrollView>
    </Container>
  );
};

export default Home;

const Container = styled.SafeAreaView<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "black" : "white")};
  flex: 1;
`;

const Title = styled.Text<{ isDarkMode: boolean }>`
  font-size: 24px;
  margin: 20px 0;
  padding: 0 20px;
  font-weight: bold;
  color: ${({ isDarkMode }) => (isDarkMode ? "white" : "black")};
`;
