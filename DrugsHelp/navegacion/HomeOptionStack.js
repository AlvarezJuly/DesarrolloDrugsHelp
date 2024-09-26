import React from 'react'
//navegation interna de homeOptios, entrar en las opciones que se muestran dentro...
import { createStackNavigator } from '@react-navigation/stack';

//importacion de las pantallas que estan dentro de homeOptions
import HomeOptions from '../screens/HomeOptions';
import Asistencia from '../screens/screensAsistencia/Asistencia';
import EvaluaTest from '../screens/screensEvaluaTest/EvaluaTest';
import Informate from '../screens/screensInformate/Informate';
import RutaAyuda from '../screens/screensRutaAyuda/Ruta';


//declaracion de la stack
const Stack = createStackNavigator();

//stack para navegar internamente, screens dentro del HomeOptions

export function HomeOptionStack() {
    return (
      <Stack.Navigator> 
                <Stack.Screen
                  name='Home'
                  component={HomeOptions}
                  options={{
                    headerShown: false
                  }}
                />

              <Stack.Screen
                  name='EvaluaTest'
                  component={EvaluaTest}
                  options={{
                    title: 'EvaluaTest',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#00aaff'}
                  }}
                />

              <Stack.Screen
                  name='Asistencia'
                  component={Asistencia}
                  options={{
                    title: 'Asistencia',
                    headerTintColor: "black",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
                />

              <Stack.Screen
                  name='Informate'
                  component={Informate}
                  options={{
                    title: 'Informate',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#00aaff'},
                  }}
                />

              <Stack.Screen
                  name='RutaAyuda'
                  component={RutaAyuda}
                  options={{
                    title: 'Ruta',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#00aaff'},
                  }}
                />
            </Stack.Navigator>
    );
  }