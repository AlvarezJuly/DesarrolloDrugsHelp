import React, { useState, useEffect } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/auth/Welcome";
import Login from "./screens/auth/Login";
import Signup from "./screens/auth/Signup";
//importaciones de los servicios de firebase
import {  doc, getDoc } from 'firebase/firestore';
import { auth,db } from './services/CredencialesFirebase';

//Como la HomeOptions tiene las opciones entonces se creo la navegación interna y en esa 
//se navegación se llama a la pantalla y aqui lo que se tiene que llamar es el componente
import "react-native-gesture-handler";
import { RehabiNav } from './navegacion/RehabiNav';//paso el componente que contiene la navegación interna para usuarios en rehabilitación
import { AdminNav } from "./navegacion/AdminNav"; //componente de la subnavegació del administrador
import { EspeciaNav } from "./navegacion/EspeciaNav"; //componente de la subnavegació del Especialista

export default function App() {

  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
  const [loading, setLoading] = useState(true); // Para controlar el estado de carga
  //Enrutamiento de la app, la nevegaión principal
  const Stack = createStackNavigator();

  // Función para verificar el rol del usuario desde Firestore
  const fetchUserRole = async () => {
    const user = auth.currentUser;
    if (user) {
      
      const userDocRef = doc(db, 'user', user.uid); // Referencia al documento del usuario en Firestore
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role); // Asigna el rol del usuario
      }
      setLoading(false); // Cambia el estado de carga una vez que tengamos el rol
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole(); // Llamada a la función cuando el componente se monta
  }, []);

  // Si estamos cargando, podemos mostrar un spinner o algo similar
  if (loading) {
    return null; // O puedes agregar un spinner aquí
  }

  function MyStack() {
    return (
      <Stack.Navigator>
        
      {/* Pantallas de Autenticación */}
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} /> 

          {/* Dependiendo del rol, redirigimos a la subnavegación correspondiente */}
        {userRole === 'rehabilitacion' && (
          <Stack.Screen name='RehabiNav'
            component={RehabiNav} // Navegación interna para usuarios en rehabilitación
            options={{ headerShown: false }}
          />
        )}

        {userRole === 'admon' && (
          <Stack.Screen
            name='AdminNav'
            component={AdminNav} // Navegación para administradores
            options={{ headerShown: false }}
          />
        )}

        {userRole === 'especialista' && (
          <Stack.Screen
            name='EspeciaNav'
            component={EspeciaNav} // Navegación para especialistas
            options={{ headerShown: false }}
          />
        )} 
      </Stack.Navigator>
    );
  }
  return (
    //encapsulamiento de la navegación
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}


