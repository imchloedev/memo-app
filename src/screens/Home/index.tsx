import React, { useRef, useEffect, Suspense } from "react";
import { Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSetRecoilState } from "recoil";
import auth from "@react-native-firebase/auth";
import ErrorBoundary from "react-native-error-boundary";
import HomeHeaderTitle from "~/components/common/AnimatedHeaderTitle";
import Spinner from "~/components/fallback/LoadingFallback";
import CustomFallback from "~/components/fallback/CustomErrorFallback";
import NoteSection from "~/components/notes/NoteSection";
import { notesFilterState } from "~/store";
import { MainStackParamList } from "../@types/index";

type HomeProps = NativeStackScreenProps<MainStackParamList, "Home">;

const Home = ({ navigation, route }: HomeProps) => {
  const { folder } = route.params;
  const currentUser = auth().currentUser;
  const scrollY = useRef(new Animated.Value(0)).current;
  const setFilter = useSetRecoilState(notesFilterState);

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
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <Suspense fallback={<Spinner />}>
        <NoteSection
          user={currentUser}
          handleScroll={handleScroll}
          moveToNote={moveToNote}
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
