import React, { useRef, useEffect, Suspense } from "react";
import { Animated } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSetRecoilState } from "recoil";
import auth from "@react-native-firebase/auth";
import ErrorBoundary from "react-native-error-boundary";
import AnimatedHeaderTitle from "components/common/AnimatedHeaderTitle";
import NoteSkeleton from "components/fallback/NoteSkeleton";
import Layout from "components/common/Layout";
import CustomFallback from "components/fallback/CustomErrorFallback";
import NoteSection from "components/notes/NoteSection";
import { notesFilterState } from "~/store";
import { MainStackParamList } from "../@types/index";

type NotesProps = NativeStackScreenProps<MainStackParamList, "Notes">;

const Notes = ({ navigation, route }: NotesProps) => {
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
        headerTitle: () => (
          <AnimatedHeaderTitle title={folder} styles={opacity} />
        ),
      });
    };

    animatedHeaderTitle();
  }, [scrollY]);

  return (
    <Layout>
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <Suspense fallback={<NoteSkeleton />}>
          <NoteSection
            user={currentUser}
            handleScroll={handleScroll}
            moveToNote={moveToNote}
          />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

export default Notes;
