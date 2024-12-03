import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'	

export default function Welcome({navigation}) {
  return (
    <View style={styles.container}>
    <View style={styles.curva1}></View>
    <View style={styles.contenido}>
      <Text style={styles.textobienve}>Bienvenido</Text>
      <Image
        source={require('../../assets/icons/imagotipoV.png')} 
        style={styles.logo}
      />
      <Text style={styles.lema}>“Libérate hoy, transforma tu mañana.”</Text>
      <TouchableOpacity style={styles.boton} onPress={()=> navigation.navigate('Login')}>
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
    width: '110%',
    height: '27%', // Ajustar altura para una curva más pronunciada
    backgroundColor: '#A7D8DE',
    borderBottomRightRadius: 350, // Radio más grande para suavizar la curva
    overflow: 'hidden', // Evitar desbordamientos
  },

  curva2: {
    position: 'absolute',
    bottom: 0,
    width: '110%',
    height: '25%', // Similar a la curva superior
    backgroundColor: '#A7D8DE',
    borderTopLeftRadius: 300, // Suavidad consistente
    overflow: 'hidden',
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
    width: 160,
    height: 60 ,
    backgroundColor: '#002E46',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  botonTexto: {
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EDEAE0'
  },
});
