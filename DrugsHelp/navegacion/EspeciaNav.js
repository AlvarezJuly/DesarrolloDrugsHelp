import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
//importacion de las pantallas
import GestionReha from '../screens/screensEspecia/GestionReha'
import 'react-native-gesture-handler';

function EspeciaNav() {
  return (
    <Stack.Navigator initialRouteName='GestionU'>
      <Stack.Screen
            name='GestionU'
            component={GestionReha}
            options={{
            headerShown: false
            }}
      />
    </Stack.Navigator>
  );
}
export default EspeciaNav;