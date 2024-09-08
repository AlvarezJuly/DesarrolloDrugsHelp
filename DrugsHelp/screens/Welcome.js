import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'	

export default function Welcome(props) {
  return (
    <View style={styles.container}>
    <View style={styles.curva1}></View>
    <View style={styles.contenido}>
      <Text style={styles.textobienve}>Bienvenido</Text>
      <Image
        source={require('../images/Logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.nombreapp}>DrugsHelp</Text>
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
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  curva1: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    backgroundColor: '#00aaff',
    borderBottomRightRadius: 200,
    zIndex: -1
  },

  curva2: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    backgroundColor: '#00aaff',
    borderTopLeftRadius: 200,
    zIndex: -1,
  },

  contenido: {
    alignItems: 'center',
  },

  textobienve: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  nombreapp: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lema: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 40,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: '#a0c4ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  botonTexto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
