import React from 'react';
import { LogBox } from 'react-native';
import MainNavigator from './navegacion/MainNavigator'; // Importa el MainNavigator
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Ignorar advertencias específicas (opcional, por si Firebase lanza advertencias conocidas)
LogBox.ignoreLogs([
  "Setting a timer", // Firebase timer warning
]);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MainNavigator />
    </GestureHandlerRootView>
  );
}
