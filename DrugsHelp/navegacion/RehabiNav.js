import React from 'react'
//navegation interna de homeOptios, entrar en las opciones que se muestran dentro...
import { createStackNavigator } from '@react-navigation/stack';

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


//declaracion de la stack
const RehabiNavStack = createStackNavigator();

//stack para navegar internamente, screens dentro del HomeOptions, el home de los usuarios en rehabilitación

export function RehabiNav() {
  
    return (
          //esta es la primera pantalla del home de rehabilitación de la navegacion llamada RehabiNav
            <RehabiNavStack.Navigator> 
              <RehabiNavStack.Screen
                  name='Home'
                  component={HomeOptions}
                  options={{
                    headerShown: false
                  }}
              />
                
              <RehabiNavStack.Screen
                  name='EvaluaTest'
                  component={EvaluaTest}
                  options={{
                    title: 'Evaluación de la condición',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'}
                  }}
              />

              <RehabiNavStack.Screen
                  name='Diagnostico'
                  component={Diagnostico}
                  options={{
                    title: 'Resumen del Diagnóstico',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE' },
                  }}
              />

              <RehabiNavStack.Screen
                  name='RutaAyuda'
                  component={RutaAutocuidado}
                  options={{
                    title: 'Guía de Ayuda',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
              />

              <RehabiNavStack.Screen
                  name='Actividades'
                  component={ListaActividades}
                  options={{
                    title: 'Lista de tareas',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE' },
                  }}
              />      
                
              <RehabiNavStack.Screen
                  name='Asistencia'
                  component={Asistencia}
                  options={{
                    title: 'Asistencia',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
              />
              <RehabiNavStack.Screen
                  name="Centros"
                  component={CentrosRehabilitacion}
                  options={{headerShown:true,
                    title:'Centros de ayuda',
                    headerTintColor: 'white',
                    headerStyle: { backgroundColor: '#A7D8DE'}
                  }}
                />

              <RehabiNavStack.Screen
                  name="Especialistas"
                  component={Especialista}
                  options={{ title: 'Especialistas',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'}}}
              />
                    
              <RehabiNavStack.Screen
                  name='Informate'
                  component={Informate}
                  options={{
                    title: 'Informate',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
              />
              
              <RehabiNavStack.Screen
                  name='Progreso'
                  component={Progreso}
                  options={{
                    title: 'Prgreso',
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: '#A7D8DE'},
                  }}
              />
          </RehabiNavStack.Navigator>
    );
  }