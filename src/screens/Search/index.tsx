import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import { styled } from "styled-components/native";
import NoteItem from "~/components/notes/NoteItem";
import Layout from "~/components/common/Layout";
import ScreenTitle from "~/components/common/ScreenTitle";
import Icon from "react-native-vector-icons/AntDesign";
import { useSearchNotesQuery } from "hooks/notes";
import { MainStackParamList } from "../@types";

type SearchScreenProps = NativeStackScreenProps<MainStackParamList, "Search">;

const Search = ({ navigation }: SearchScreenProps) => {
  const [text, setText] = useState("");
  const currentUser = auth().currentUser;
  const { isLoading, searchResult } = useSearchNotesQuery(text, currentUser);

  const moveToNote = (id: string | undefined) => {
    navigation.navigate("Edit", { noteId: id });
  };

  return (
    <Layout>
      <Container>
        <TitleWrapper>
          <ScreenTitle title="Search" />
        </TitleWrapper>
        <InputWrapper>
          <Icon name="search1" color="#777" size={16} />
          <Input
            value={text}
            onChangeText={setText}
            placeholder="Search here"
            autoFocus
          />
        </InputWrapper>
      </Container>

      {isLoading ? (
        <ResultWrapper>
          <ActivityIndicator />
        </ResultWrapper>
      ) : searchResult && searchResult.length > 0 ? (
        <FlatList
          data={searchResult}
          renderItem={({ item }) => (
            <NoteItem note={item} moveToNote={moveToNote} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        text && (
          <ResultWrapper>
            <Text>No results</Text>
          </ResultWrapper>
        )
      )}
    </Layout>
  );
};

export default Search;

const Container = styled.View`
  padding: 0 20px;
`;

const TitleWrapper = styled.View`
  margin: 40px 0;
`;

const InputWrapper = styled.View`
  margin-top: 10px;
  background-color: ${({ theme }) => theme.color.container};
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
`;

const Input = styled.TextInput`
  color: ${({ theme }) => theme.color.textColor};
  flex-shrink: 1;
`;

const ResultWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;
