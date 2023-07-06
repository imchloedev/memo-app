import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import Home from "@screens/Home";
import { RootStackParamList } from "@screens/@types";
import Edit from "@screens/Edit";
import NewNote from "@screens/NewNote";
import Modal from "@screens/Modal";
import IconButton from "@components/IconButton";
import { dark, light } from "./styles/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  const isDarkMode = useColorScheme() === "dark";
  const currentTheme = isDarkMode ? dark : light;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: currentTheme.color.bg,
          },
          headerRight: () => (
            <IconButton
              iconName="pluscircleo"
              color={currentTheme.color.textColor}
              onPress={() => navigation.push("Note")}
            />
          ),
          headerLeft: () => (
            <IconButton
              iconName="folder1"
              color={currentTheme.color.textColor}
              onPress={() => navigation.navigate("Modal")}
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Note"
        component={NewNote}
        options={{
          headerStyle: {
            backgroundColor: currentTheme.color.bg,
          },
          title: "New Note",
          headerTintColor: currentTheme.color.textColor,
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        initialParams={{ noteId: 1 }}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: currentTheme.color.bg,
          },
          headerTintColor: currentTheme.color.textColor,
        }}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
};

export default Navigator;
