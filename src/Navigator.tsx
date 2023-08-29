import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { LoginStackParamList, MainStackParamList } from "screens/@types";
import auth from "@react-native-firebase/auth";
import Home from "screens/Home";
import Edit from "screens/Edit";
import NewNote, { SaveButton } from "screens/NewNote";
import MyPage from "screens/MyPage";
import SignIn from "screens/SignIn";
import SignUp from "screens/SignUp";
import Folders from "screens/Folders";
import IconButton from "components/IconButton";
import useThemeColors from "~/hooks/common/useThemeColors";
import Modal from "./screens/Modal";
import Search from "./screens/Search";

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
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerTitle: "",
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
                onPress={() => navigation.navigate("Folders")}
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
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={({ navigation }) => ({
            headerTitle: "New Folder",
            presentation: "modal",
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: mode.color.bg,
            },
            headerTintColor: mode.color.textColor,
            headerLeft: () => (
              <SaveButton onPress={() => navigation.goBack()}>
                Cancel
              </SaveButton>
            ),
          })}
        />
      </Stack.Group>
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

const SearchStackNavi = () => {
  const mode = useThemeColors();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={({ navigation }) => ({
          title: "",
          headerStyle: {
            backgroundColor: mode.color.bg,
          },
          headerTintColor: mode.color.textColor,
        })}
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
      inactiveColor={mode.color.commonMiddleGray}
      barStyle={{ backgroundColor: mode.color.bg }}
    >
      <Tab.Screen
        name="Main"
        component={HomeStackNavi}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavi}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Icon name="search1" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={MyPageStackNavi}
        options={{
          tabBarLabel: "My Page",
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
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
