import React from "react";
import { View, Text, Button } from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/index";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Home = ({ navigation }: HomeProps) => {
  // navigation 타입 지정하기
  return (
    <Container>
      <Text>Home</Text>
      <View>
        <Button
          title="create new memo"
          onPress={() => navigation.navigate("Memo")}
        />
      </View>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
