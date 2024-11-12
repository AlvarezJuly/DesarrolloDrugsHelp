import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// Importaciones de pantallas
import Panel from '../screens/screensAdmon/Panel';
import EstadisticasApp from '../screens/screensAdmon/EstadisticasApp';
import GestionApp from '../screens/screensAdmon/GestionApp';
import GestionNotifi from '../screens/screensAdmon/GestionNotifi';

const AdminStack = createStackNavigator(); //declarcion de como se llama el componente navegacion segun los roles para no confundir 

export function AdminNav() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name='PanelAministrativo'
        component={Panel}
        options={{
          headerShown: false
        }}
      />
      <AdminStack.Screen
        name='GestionBaseDatos'
        component={GestionApp}
        options={{
          title: 'Atrás',
          headerTintColor: "white",
          headerStyle: { backgroundColor: '#A7D8DE' }
        }}
      />
      <AdminStack.Screen
        name='Estadisticas'
        component={EstadisticasApp}
        options={{
          title: 'Atrás',
          headerTintColor: "white",
          headerStyle: { backgroundColor: '#A7D8DE' }
        }}
      />
      <AdminStack.Screen
        name='GestionNotificaciones'
        component={GestionNotifi}
        options={{
          title: 'Atrás',
          headerTintColor: "white",
          headerStyle: { backgroundColor: '#A7D8DE' }
        }}
      />
    </AdminStack.Navigator>
  );
}
