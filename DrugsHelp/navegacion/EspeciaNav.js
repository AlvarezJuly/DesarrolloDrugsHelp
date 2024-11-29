import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import GestionReha from '../screens/screensEspecia/GestionReha';
import ConfiguracionesE from '../screens/screensEspecia/ConfiguracionesE';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function EspeciaNav() {
  return (
    <Tab.Navigator
      initialRouteName="GestionUsuarios"
      screenOptions={{
        headerStyle: { backgroundColor: '#A7D8DE' },
        headerTintColor: 'white',
        tabBarActiveTintColor: '#007B83',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="GestionUsuarios"
        component={GestionReha}
        options={{
          tabBarLabel: 'Usuarios',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
        <Tab.Screen
        name="Configuraciones"
        component={ConfiguracionesE}
        options={{
          tabBarLabel: 'Configuraciones',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={24} color="black" />
          ),
          title: 'Configuraciones',
        }}
      />
    </Tab.Navigator>
  );
}

export default EspeciaNav;
