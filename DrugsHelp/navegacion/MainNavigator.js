import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import RehabiNav from '../navegacion/RehabiNav';
import AdminNav from '../navegacion/AdminNav';
import EspeciaNav from '../navegacion/EspeciaNav';

function MainNavigator({ route }) {
  const { userRole } = route.params;
  console.log(route.params)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userRole === 'rehabilitacion' && (
        <Stack.Screen name="RehabiNav" component={RehabiNav} />
      )}
      {userRole === 'admon' && (
        <Stack.Screen name="AdminNav" component={AdminNav} />
      )}
      {userRole === 'especialista' && (
        <Stack.Screen name="EspeciaNav" component={EspeciaNav} />
      )}
    </Stack.Navigator>
  );
}

export default MainNavigator;
