//navegacion con tab 
//esta es la pantalla Asistencia
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
//importaciones para usar tabs 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//importacion de las pantallas
import AñadirUnContac from './AñadirUnContac';
import VistaListaCon  from './VistaListaCon';


//declaracion de la Tab
const Tab = createBottomTabNavigator();

export default function AsistenciaMyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name = 'Contactos' component = {VistaListaCon}
            options={{ headerShown: false,
                tabBarIcon: ()=>(
                    <AntDesign name="contacts" size={24} color="black" />
                ),
            }}/> 

            <Tab.Screen name = 'Añadir' component = {AñadirUnContac}
            options={{ headerShown: false,
                tabBarIcon: ()=>(
                    <AntDesign name="pluscircleo" size={24} color="black" />
                ),
            }}/> 
        </Tab.Navigator>

    );
}



