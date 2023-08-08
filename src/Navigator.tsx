import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LoginStackParamList, MainStackParamList } from "@screens/@types";
import Home from "@screens/Home";
import Edit from "@screens/Edit";
import NewNote from "@screens/NewNote";
import Modal from "@screens/Modal";
import MyPage from "@screens/MyPage";
import SignIn from "@screens/SignIn";
import SignUp from "@screens/SignUp";
import Folders from "@screens/Folders";
import IconButton from "@components/IconButton";
import { tokenState } from "./recoil/atoms";
import useThemeColors from "./hooks/useThemeColors";
import { getToken } from "./api/storage";

const Stack = createNativeStackNavigator<MainStackParamList>();
const LoginStack = createNativeStackNavigator<LoginStackParamList>();
const Tab = createMaterialBottomTabNavigator();

const LoginStackNavi = () => {
  const mode = useThemeColors();

  return (
    <LoginStack.Navigator>
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
    </LoginStack.Navigator>
  );
};

const HomeStackNavi = () => {
  const mode = useThemeColors();

  return (
    <Stack.Navigator initialRouteName="Folders">
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{ folder: "Notes" }}
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
              onPress={() => navigation.popToTop()}
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
        name="Folders"
        component={Folders}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
    </Stack.Navigator>
  );
};

const MyPageStackNavi = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavi = () => {
  const mode = useThemeColors();

  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor={mode.color.textColor}
      inactiveColor={mode.color.middleGray}
      barStyle={{ backgroundColor: mode.color.bg }}
    >
      <Tab.Screen
        name="Main"
        component={HomeStackNavi}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageStackNavi}
        options={{
          tabBarLabel: "My Page",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const [token, setToken] = useRecoilState(tokenState);

  useEffect(() => {
    const loadToken = async () => {
      const res = await getToken();
      setToken(res);
    };
    loadToken();
  }, []);

  return (
    <NavigationContainer>
      {token ? <TabNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};

export default Navigator;
