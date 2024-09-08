import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import "react-native-gesture-handler";
import { HomeOptionStack } from "./Navigation/HomeOptionStack";



export default function App() {
  //Enrutamiento navegació de la HomeOptions
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
            name='Welcome'
            component={Welcome}
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

