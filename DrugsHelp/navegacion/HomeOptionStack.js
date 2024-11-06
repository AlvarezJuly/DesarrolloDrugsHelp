import React from 'react'
//navegation interna de homeOptios, entrar en las opciones que se muestran dentro...
import { createStackNavigator } from '@react-navigation/stack';

//importacion de las pantallas que estan dentro de homeOptions
import HomeOptions from '../screens/inicio/HomeOptions';
import EvaluaTest from '../screens/screensEvaluaTest/EvaluaTest';
import Informate from '../screens/screensInformate/Informate';
import Asistencia from '../screens/screensAsistencia/Asistencia';
import Centros_de_rehabilitacion from '../screens/screensAsistencia/Centros_de_rehabilitacion';
import Especialista from '../screens/screensAsistencia/Especialista'; 
import Progreso from '../screens/screensProgreso/Progreso';
import Diagnostico from '../screens/screensEvaluaTest/Diagnostico';
import RutaAutocuidado from '../screens/screensRutaAyuda/RutaAutocuidado';


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
                    headerStyle: { backgroundColor: '#A7D8DE'}
                  }}
                />

              <Stack.Screen
                  name='Diagnostico'
                  component={Diagnostico}
                  options={{
                    title: 'Resumen del Diagnóstico',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE' },
                  }}
                />

              <Stack.Screen
                  name='Asistencia'
                  component={Asistencia}
                  options={{
                    title: 'Asistencia',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
                />
                <Stack.Screen
                  name="Centros"
                  component={Centros_de_rehabilitacion}
                  options={{headerShown:true,
                    title:'Centros de ayuda',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#A7D8DE'}
                  }}/>

                <Stack.Screen
                  name="Especialistas"
                  component={Especialista}
                  options={{ title: 'Especialistas',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'}}}/>
                    
              <Stack.Screen
                  name='Informate'
                  component={Informate}
                  options={{
                    title: 'Informate',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
                />
              <Stack.Screen
                  name='RutaAyuda'
                  component={RutaAutocuidado}
                  options={{
                    title: 'Guía de Ayuda',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
                />
                  <Stack.Screen
                  name='Progreso'
                  component={Progreso}
                  options={{
                    title: 'Prgreso',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
                />
            </Stack.Navigator>
    );
  }