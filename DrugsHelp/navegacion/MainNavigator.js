import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import RehabiNav from './RehabiNav'; // Navegación para usuarios en rehabilitación
import AdminNav from './AdminNav'; // Navegación para administradores
import EspeciaNav from './EspeciaNav'; // Navegación para especialistas
import AuthNavigator from './AuthNavigator'; // Navegación para autenticación
import { verificarSesion } from '../services/AuthFunciones'; // Función para monitorear la sesión activa

export default function MainNavigator() {
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar el spinner de carga

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true); // Inicia el estado de carga
      await verificarSesion(setUser); // Verifica la sesión activa y actualiza el estado del usuario
      setIsLoading(false); // Finaliza el estado de carga
    };
    checkSession(); // Llama a la función de verificación al montar el componente
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007B83" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        user.role === 'rehabilitacion' ? (
            <RehabiNav userId={user.userId} />
          ) : user.role === 'admon' ? (
            <AdminNav />
          ) : user.role === 'especialista' ? (
            <EspeciaNav />
          ) : (
            <AuthNavigator /> 
          )
        ) : (
        <AuthNavigator /> 
      )}
    </NavigationContainer>
  );
}