import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LoginStackParamList, MainStackParamList } from "screens/@types";
import auth from "@react-native-firebase/auth";
import Home from "screens/Home";
import Edit from "screens/Edit";
import NewNote from "screens/NewNote";
import MyPage from "screens/MyPage";
import SignIn from "screens/SignIn";
import SignUp from "screens/SignUp";
import Folders from "screens/Folders";
import IconButton from "components/IconButton";
import useThemeColors from "~/hooks/useThemeColors";

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
    <Stack.Navigator initialRouteName="Home">
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
        initialParams={{ noteId: "note" }}
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
        name="Account"
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
  const currentUser = auth().currentUser;

  return (
    <NavigationContainer>
      {currentUser ? <TabNavi /> : <LoginStackNavi />}
    </NavigationContainer>
  );
};

export default Navigator;
