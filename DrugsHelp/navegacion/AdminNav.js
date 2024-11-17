import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(); 
// Importaciones de pantallas
import Panel from '../screens/screensAdmon/Panel';
import EstadisticasApp from '../screens/screensAdmon/EstadisticasApp';
import GestionApp from '../screens/screensAdmon/GestionApp';
import GestionNotifi from '../screens/screensAdmon/GestionNotifi';

function AdminNav() {
  return (
    <Stack.Navigator initialRouteName='PanelAdministrativo'>
      <Stack.Screen
        name='PanelAministrativo'
        component={Panel}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='GestionBaseDatos'
        component={GestionApp}
        options={{
          title: 'Atrás',
          headerTintColor: "white",
          headerStyle: { backgroundColor: '#A7D8DE' }
        }}
      />
      <Stack.Screen
        name='Estadisticas'
        component={EstadisticasApp}
        options={{
          title: 'Atrás',
          headerTintColor: "white",
          headerStyle: { backgroundColor: '#A7D8DE' }
        }}
      />
      <Stack.Screen
        name='GestionNotificaciones'
        component={GestionNotifi}
        options={{
          title: 'Atrás',
          headerTintColor: "white",
          headerStyle: { backgroundColor: '#A7D8DE' }
        }}
      />
    </Stack.Navigator>
  );
}
export default AdminNav;