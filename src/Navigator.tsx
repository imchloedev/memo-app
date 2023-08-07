import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "@screens/Home";
import { LoginStackParamList, MainStackParamList } from "@screens/@types";
import Edit from "@screens/Edit";
import NewNote from "@screens/NewNote";
import Modal from "@screens/Modal";
import IconButton from "@components/IconButton";
import SignIn from "./screens/SignIn";
import { getToken } from "./api/storage";
import SignUp from "./screens/SignUp";
import { useRecoilState } from "recoil";
import { tokenState } from "./recoil/atoms";
import useThemeColors from "./hooks/useThemeColors";

const Stack = createNativeStackNavigator<MainStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();

const LoginStackNavi = () => {
  const mode = useThemeColors();

  return (
    <Stack.Navigator>
      <LoginStack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <LoginStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: "Sign Up",
          headerStyle: {
            backgroundColor: mode.color.bg,
          },
          headerTintColor: mode.color.textColor,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeStackNavi = () => {
  const mode = useThemeColors();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: mode.color.bg,
          },
          headerRight: () => (
            <IconButton
              iconName="pluscircleo"
              color={mode.color.textColor}
              onPress={() => navigation.push("Note")}
            />
          ),
          headerLeft: () => (
            <IconButton
              iconName="folder1"
              color={mode.color.textColor}
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
            backgroundColor: mode.color.bg,
          },
          title: "New Note",
          headerTintColor: mode.color.textColor,
        }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        initialParams={{ noteId: 1 }}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: mode.color.bg,
          },
          headerTintColor: mode.color.textColor,
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
  const [token, setToken] = useRecoilState(tokenState);

  const getUser = async () => {
    const result = await getToken();
    setToken(result);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <NavigationContainer>
      {token ? <HomeStackNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};

export default Navigator;
