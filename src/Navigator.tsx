import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "@screens/Home";
import { RootStackParamList } from "@screens/@types";
import NewMemo from "@screens/NewMemo";
import IconButton from "@components/IconButton";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: isDarkMode ? "black" : "white",
            },
            headerRight: () => (
              <IconButton
                iconName="pluscircleo"
                color={isDarkMode ? "white" : "black"}
                onPress={() => navigation.push("Memo")}
              />
            ),
            headerLeft: () => (
              <IconButton
                iconName="folder1"
                color={isDarkMode ? "white" : "black"}
                onPress={() => navigation.navigate("Home")}
              />
            ),
            headerShadowVisible: false,
          })}
        />
        <Stack.Screen
          name="Memo"
          component={NewMemo}
          options={{ title: "New memo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
