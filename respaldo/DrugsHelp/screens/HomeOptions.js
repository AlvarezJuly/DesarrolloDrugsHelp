import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
//import pantalla de la navegación Tab
import AsistenciaMyTabs from './NavegacionTabAsistencia';
//navegation
import { createStackNavigator } from '@react-navigation/stack';


//declaracion de la stack
const Stack = createStackNavigator();


export default function HomeOptions({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Image 
            source={require('../images/logo.png')} 
            style={styles.logo}
          />
          <Text style={styles.textoHeader}>DrugsHelp</Text>
      </View>

      <View style={styles.contenedorIconosBoton}>

            <TouchableOpacity style={styles.contenedorIcono}>
                <Image 
                source={require('../images/question.png')} 
                style={styles.icono}
                />
                <Text style={styles.textoIconoBoton}>Test</Text>
            </TouchableOpacity >
       
          <TouchableOpacity style={styles.contenedorIcono} 
           onPress={() => navigation.navigate('Asistencia')}>
              <Image 
              source={require('../images/asistencia.png')} 
              style={{height: 110, width:110}}
              />
            <Text style={styles.textoIconoBoton}>Asistencia</Text>
            
          </TouchableOpacity> 
       
          <TouchableOpacity style={styles.contenedorIcono}>
              <Image 
              source={require('../images/informate.png')} 
              style={styles.icono}
            />
            <Text style={styles.textoIconoBoton}>Informate</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.feetpage}></View> 
    </View>
  )
}
//stack para navegar internamente
//screens dentro del HomeOptions
export function HomeOptionStack() {
  return (
    <Stack.Navigator> 
      <Stack.Screen 
        name="HomeOptions" 
        component={HomeOptions} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen
          name='Asistencia'
          component={AsistenciaMyTabs}
          options={{
            title: 'Asistencia',
            headerTintColor: "white",
            headerStyle: { backgroundColor: '#00aaff'},
          }}
        />
       

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
  },

  contenedorIconosBoton:{
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 160
  },

  contenedorIcono:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4CAD4',
    borderRadius: 50,
    width: 160,  
    height:185,
    alignItems: 'center',
    padding: 20,
    margin: 10
  },

  icono:{
    height: 110,
    width: 90,
  },

  textoIconoBoton:{
    textAlign:'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },

  header:{
     width: '100%',
     height: 100,
     borderColor: '#00aaff',
     backgroundColor: '#00aaff',
     justifyContent: 'center',
     alignItems: 'center',
     flexDirection: 'row'
  },

  textoHeader:{
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    marginTop: 25
  },

  logo:{
    marginTop: 25,
    height: 60,
    width: 60,
  },

  feetpage:{
    width: '100%',
     height: 50,
     borderColor: '#00aaff',
     backgroundColor: '#00aaff',
  }

});