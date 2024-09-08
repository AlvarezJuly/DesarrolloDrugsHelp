//navegacion con tab 
//esta es la pantalla Asistencia
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
//importaciones para usar tabs 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



//declaracion de la Tab
const Tab = createBottomTabNavigator();

export default function AsistenciaMyTabs(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarActiveBackgroundColor: '#00aaff',
            tabBarInactiveBackgroundColor: '#fff',
        }}>

            <Tab.Screen name = 'Contactos' component = {MenuAsistencia}
            options={{ headerShown: false,
                tabBarIcon: ()=>(
                    <AntDesign name="contacts" size={24} color="black" />
                ),
            }}/> 
        </Tab.Navigator>

    );
}



