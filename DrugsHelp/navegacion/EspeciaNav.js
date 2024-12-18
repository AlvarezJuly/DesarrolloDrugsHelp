import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import GestionReha from '../screens/screensEspecia/GestionReha';
import ConfiguracionesE from '../screens/screensEspecia/ConfiguracionesE';
import ChatUsers from '../screens/screensEspecia/ChatUsers';
import ChatRequestsScreen from '../screens/screensEspecia/ChatRequestsScreen';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function EspeciaNav() {
  return (
    <Tab.Navigator
      initialRouteName="Gestión"
      screenOptions={{
        headerStyle: { backgroundColor: '#A7D8DE' },
        headerTintColor: 'white',
        tabBarActiveTintColor: '#007B83',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Gestión"
        component={GestionReha}
        options={{
          tabBarLabel: 'Usuarios',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="house-user" size={24} color="black" />
          ),
          headerShown: true,
        }}
      />

      <Tab.Screen
              name="Chats"
              component={ChatUsers}
              options={{
                tabBarLabel: 'Chats',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="wechat" size={24} color="black" />
                ),
                headerShown: true,
              }}
            />

          <Tab.Screen
              name="Solicitudes"
              component={ChatRequestsScreen}
              options={{
                tabBarLabel: 'Solicitudes',
                tabBarIcon: ({ color, size }) => (
                  <FontAwesome name="wechat" size={24} color="black" />
                ),
                headerShown: true,
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
