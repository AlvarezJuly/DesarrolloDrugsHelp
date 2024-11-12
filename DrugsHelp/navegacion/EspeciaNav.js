import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//importacion de las pantallas
import GestionReha from '../screens/screensEspecia/GestionReha'

const EspeciaStack = createStackNavigator(); //declaracion diferente para casa navegación

export function EspeciaNav() {
  return (
    <EspeciaStack.Navigator>
      <EspeciaStack.Screen
            name='GestionU'
            component={GestionReha}
            options={{
            headerShown: false
            }}
      />
    </EspeciaStack.Navigator>
  );
}
