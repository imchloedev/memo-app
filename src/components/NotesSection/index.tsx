import React, { useState, useRef, useEffect } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import NoteItem from "components/NoteItem";
import { INote } from "~/store";
import { styled } from "styled-components/native";
import Icon from "react-native-vector-icons/Entypo";

interface INotesSection {
  title: string;
  notes: INote[];
  moveToNote: (id: string | undefined) => void;
}

const NotesSection = ({ title, notes, moveToNote }: INotesSection) => {
  // const getShowState = async (newData) => {
  //   await AsyncStorage.setItem("@category", JSON.stringify(newData));
  // };

  let filteredNotes = [];

  if (title === "Pinned") {
    filteredNotes = notes;
  } else {
    filteredNotes = notes.filter((note) => note.isPinned === false);
  }

  const [isOpened, setIsOpened] = useState(true);
  const [shouldAnimate, setIsShouldAnimate] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  // console.log(shouldAnimate);

  const heightValue = heightAnim.interpolate({
    inputRange: [0, 0],
    outputRange: [0, 500],
  });

  const handleShow = () => {
    setIsOpened((prev) => !prev);
    setIsShouldAnimate(true);
  };

  // useEffect(() => {
  //   if (shouldAnimate) {
  //     if (!isOpened) {
  //       Animated.timing(heightAnim, {
  //         toValue: -1000,
  //         duration: 1000,
  //         useNativeDriver: true,
  //       }).start();
  //     } else {
  //       Animated.timing(heightAnim, {
  //         toValue: 0,
  //         duration: 500,
  //         useNativeDriver: true,
  //       }).start();
  //     }
  //   } else {
  //     heightAnim.setValue(0);
  //   }
  // }, [isOpened]);

  return (
    <Container>
      {notes ? (
        notes.length > 0 && (
          <View>
            <CategoryContainer onPress={handleShow}>
              {<CategoryText>{title}</CategoryText>}
              <Icon name="chevron-thin-down" size={16} color={"#f5c519"} />
            </CategoryContainer>
            <Wrapper isActive={isOpened}>
              <Animated.View
                style={{
                  transform: [{ translateY: heightAnim }],
                }}
              >
                {filteredNotes.map((note) => (
                  <NoteItem key={note.id} note={note} moveToNote={moveToNote} />
                ))}
              </Animated.View>
            </Wrapper>
          </View>
        )
      ) : (
        <ActivityIndicator />
      )}
    </Container>
  );
};

export default NotesSection;

const Container = styled.View`
  margin-bottom: 20px;
`;

const Wrapper = styled.View<{ isActive: boolean }>`
  /* max-height: ${({ isActive }) => (isActive ? "auto" : 0)}; */
  overflow: hidden;
  /* background-color: yellow; */
`;

const CategoryContainer = styled.Pressable`
  padding: 0 26px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;

const CategoryText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.color.textColor};
  margin-right: 10px;
`;
