import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Asistencia from "./screens/screensAsistencia/Asistencia";
import centros_de_rehabilitacion from "./screens/screensAsistencia/centros_de_rehabilitacion";
//Como la HomeOptions tiene las opciones entones se creo la navegación interna y en esa 
//se navegación se llama a la pantall y aqui lo que se tiene que llamar es el componente
import "react-native-gesture-handler";
import { HomeOptionStack } from "./navegacion/HomeOptionStack";





export default function App() {
  //Enrutamiento de la app, la nevegaión principal
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Welcome'
            component={Welcome} //Nombre de la screen
            options={{
              headerShown:false
            }}
          />  

        <Stack.Screen
            name='Home'
            component={HomeOptionStack}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }}
          />
          
      
      <Stack.Screen
          name="Asistencia"
          component={Asistencia}
          options={{headerShown:false
          }}/>
        <Stack.Screen
          name="Centros_de_rehabilitacion"
          component={centros_de_rehabilitacion}
          options={{headerShown:false
          }}/>

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
              title: "Signup",
              headerTitleAlign: 'Center',
              headerStyle: { backgroundColor: '#00aaff' },
              headerTintColor: "white",
            }}
        
          />  
          
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


