import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
import {Image} from 'react-native';
import 'react-native-gesture-handler';

//importacion de las pantallas que estan dentro de homeOptions de vistas del usuario en rehabilitación
import HomeOptions from '../screens/screensUsuReha/HomeOptions';
import EvaluaTest from '../screens/screensUsuReha/screensEvaluaTest/EvaluaTest';
import Informate from '../screens/screensUsuReha/screensInformate/Informate';
import Asistencia from '../screens/screensUsuReha/screensAsistencia/Asistencia';
import CentrosRehabilitacion from '../screens/screensUsuReha/screensAsistencia/CentrosRehabilitacion';
import Especialista from '../screens/screensUsuReha/screensAsistencia/Especialista';
import Progreso from '../screens/screensUsuReha/screensProgreso/Progreso';
import Diagnostico from '../screens/screensUsuReha/screensEvaluaTest/Diagnostico';
import RutaAutocuidado from '../screens/screensUsuReha/screensRutaAyuda/RutaAutocuidado';
import ListaActividades from '../screens/screensUsuReha/screensRutaAyuda/ListaActividades';

import DropdownMenu from './MenuDraw';
//Pantallas del menú draw
import AyudaScreen from '../screens/screenMenuDra/AyudaScreen'
import DonacionesScreen from '../screens/screenMenuDra/DonacionesScreen'
import Configuraciones from '../screens/screenMenuDra/Configuraciones'

const Stack = createStackNavigator();
function RehabiNav({ userId }) { 
  console.log("UserId recibido en RehabiNav:", userId);
    return (
          //esta es la primera pantalla del home de rehabilitación de la navegacion llamada RehabiNav
            <Stack.Navigator initialRouteName="HomeOptions"> 
              {/*Pantallas del menú stack*/}
              <Stack.Screen
                  name='HomeOptions'
                  component={HomeOptions}
                  initialParams={{ userId }}
                  options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#A7D8DE'},
                    headerTitle: () => (
                      <Image
                      source={require('../assets/icons/imagotipoH.png')} 
                      style={{ marginLeft: 20, height: 95, width: 140, }} 
                      resizeMode="contain" 
                    />
                    ),
                    headerRight: () => <DropdownMenu />, 
                  }}

              />
                
              <Stack.Screen
                  name='EvaluaTest'
                  component={EvaluaTest}
                  options={{
                    title: 'Evaluación de la condición',
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
                  name='RutaAyuda'
                  component={RutaAutocuidado}
                  initialParams={{ userId }}
                  options={{
                    title: 'Guía de Ayuda',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
              />

              <Stack.Screen
                  name='Actividades'
                  component={ListaActividades}
                  options={{
                    title: 'Lista de tareas',
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
                  component={CentrosRehabilitacion}
                  options={{headerShown:true,
                    title:'Centros de ayuda',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#A7D8DE'}
                  }}
                />

              <Stack.Screen
                  name="Especialistas"
                  component={Especialista}
                  options={{ title: 'Especialistas',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'}}}
              />
                    
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
                  name='Progreso'
                  component={Progreso}
                  options={{
                    title: 'Progreso',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
              />

              {/*Pantallas del menú de draw*/}
              <Stack.Screen
                  name='Ayuda'
                  component={AyudaScreen}
                  options={{
                    headerShown: false
                  }}
              />
            <Stack.Screen
                  name='Donaciones'
                  component={DonacionesScreen}
                  options={{
                    headerShown: false
                  }}
              />
              
              <Stack.Screen
                  name='Configuraciones'
                  component={Configuraciones}
                  options={{
                    headerShown: false
                  }}
              />
          </Stack.Navigator>
    );
  }

export default RehabiNav;