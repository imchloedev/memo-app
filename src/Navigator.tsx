import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "~/screens/Home/Home";
import CreateNewMemo from "./screens/CreateNewMemo/CreateNewMemo";
import { RootStackParamList } from "./screens/@types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="Memo"
          component={CreateNewMemo}
          options={{ title: "New memo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
