import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '~/screens/Home/Home';
import CreateNewMemo from './screens/CreateNewMemo/CreateNewMemo';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="New Memo" component={CreateNewMemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
