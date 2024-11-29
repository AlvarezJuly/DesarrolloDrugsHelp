import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import EstadisticasApp from '../screens/screensAdmon/EstadisticasApp';
import GestionApp from '../screens/screensAdmon/GestionApp';
import GestionNotifi from '../screens/screensAdmon/GestionNotifi';
import Configuracion from '../screens/screensAdmon/Configuracion';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; // Para íconos en las tabs
import AntDesign from '@expo/vector-icons/AntDesign';


const Tab = createBottomTabNavigator();

function AdminNav() {
  return (
    <Tab.Navigator
      initialRouteName="GestionBaseDatos"
        options={{
          tabBarLabel: 'Panel',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" size={24} color="black" />
          ),
          headerShown: true, 
        }}
    >
      
      <Tab.Screen
        name="GestionBaseDatos"
        component={GestionApp}
        options={{
          tabBarLabel:'Panel Administrativo',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="database" size={24} color="black" />
          ),
          title: 'Gestión de Datos',
        }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={EstadisticasApp}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barschart" size={24} color="black" />
          ),
          title: 'Estadísticas de la App',
        }}
      />
      <Tab.Screen
        name="GestionNotificaciones"
        component={GestionNotifi}
        options={{
          tabBarLabel: 'Notificaciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit-notifications" size={24} color="black" />
          ),
          title: 'Gestión de Notificaciones',
        }}
      />

    <Tab.Screen
        name="Configuraciones"
        component={Configuracion}
        options={{
          tabBarLabel: 'Notificaciones',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
          title: 'Configuraciones',
        }}
      />
    </Tab.Navigator>
      
  );
}

export default AdminNav;
