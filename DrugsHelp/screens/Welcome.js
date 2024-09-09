import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'	

export default function Welcome(props) {
  return (
    <View style={styles.container}>
    <View style={styles.curva1}></View>
    <View style={styles.contenido}>
      <Text style={styles.textobienve}>Bienvenido</Text>
      <Image
        source={require('../icons/imagotipoV.png')} 
        style={styles.logo}
      />
      <Text style={styles.lema}>“Libérate hoy, transforma tu mañana.”</Text>
      <TouchableOpacity style={styles.boton} onPress={()=> props.navigation.navigate('Login')}>
        <Text style={styles.botonTexto}>Iniciar</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.curva2}></View> 
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAE0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  curva1: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '25%',
    backgroundColor: '#A7D8DE',
    borderBottomRightRadius: 200,
    zIndex: -1
  },

  curva2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '25%',
    backgroundColor: '#A7D8DE',
    borderTopLeftRadius: 200,
    zIndex: -1,
  },

  contenido: {
    alignItems: 'center',
  },

  textobienve: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#002E46',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  lema: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    marginBottom: 25,
    textAlign: 'center',
  },
  boton: {
    width: 162,
    height: 65 ,
    backgroundColor: '#002E46',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  botonTexto: {
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EDEAE0'
  },
});
