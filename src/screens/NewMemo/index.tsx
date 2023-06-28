import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../@types";

type TypeNewMemoProps = NativeStackScreenProps<RootStackParamList, "Memo">;

const NewMemo = ({ navigation, route }: TypeNewMemoProps) => {
  return (
    <View>
      <Text>NEW!</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default NewMemo;
