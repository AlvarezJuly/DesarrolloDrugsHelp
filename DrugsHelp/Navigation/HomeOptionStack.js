import React from 'react'
//navegation
import { createStackNavigator } from '@react-navigation/stack';
import HomeOptions from '../screens/HomeOptions';

import AsistenciaMyTabs from '../Navigation/NavegacionTabAsistencia';
//importacion de las pantallas de asistencia tengo que agregarlas aquí Menuasistencia
//hereeeee

//declaracion de la stack
const Stack = createStackNavigator();

//stack para navegar internamente ...subnavegacion para ir a asistencia
//screens dentro del HomeOptions

export function HomeOptionStack() {
    return (
      <Stack.Navigator> 
        <Stack.Screen 
          name="HomeOptions" 
          component={HomeOptions} 
          options={{ headerShown: false }} 
        />
  
        <Stack.Screen
            name='Asistencia'
            component={AsistenciaMyTabs}
            options={{
              title: 'Asistencia',
              headerTintColor: "white",
              headerStyle: { backgroundColor: '#00aaff'},
            }}
          />
      </Stack.Navigator>
    );
  }