import { View, Text ,TouchableOpacity, StyleSheet, Image} from 'react-native'
import React from 'react'


export default function Asistencia({navigation}) {
  
  return (<View style={styles.container}>
    <View style={styles.trasfondo}>
                      <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('Especialistas')}>
                                    <Image 
                                    source={require('../../assets/icons/Especialistas.png')} 
                                    style={styles.icono}
                                    />    
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Especialistas</Text> 
                                <Text style={styles.textoDesciptivo}>"Encuentra asitencia directa con especialistas"</Text>      
                          </View>
                      </View>
                      
                        {/* Contenedor de opciones */}
                        <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('Centros')}>
                                    <Image 
                                    source={ require('../../assets/icons/Centros.png') } 
                                    style={styles.icono} 
                                    />                                       
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}>     
                                  <Text style={styles.textoIconoBoton}>Centros de rehabilitación </Text> 
                                  <Text style={styles.textoDesciptivo}>"Encuentra información de centros de rehabilitación "</Text>       
                          </View>
                      </View>
    </View>
    
  )

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#84B6F4',
    flex: 1,
    justifyContent: 'center', // Centramos el contenido verticalmente
    alignItems: 'center',

  }, 

  contenedorBotones: {
    marginTop: 100, // Para que los botones no queden detrás del header
    marginBottom: 70, // Para que los botones no queden detrás del footer
    paddingHorizontal: 10,
    paddingVertical:30,
    flexDirection: 'column', 
    justifyContent: 'space-around',
  },

  trasfondo: {
    alignItems: 'center',
    backgroundColor: '#EDEAE0',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 50, // Reducción del tamaño del fondo respecto al contenedor
    width: 350, 
    height: 135, 
    alignSelf: 'center', // Centrar el fondo respecto a los botones
  },

  contenedorIcono: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEAE0',
    borderRadius: 50,
    width: 135,  
    height: 145,
    padding: 10,
    borderColor: '#002E46',
    borderWidth: 5,
  },

  icono: {
    height: 95,
    width: 95,
  },

  textoIconoBoton: {
    marginVertical:10,
    marginHorizontal:5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contenedorTexto:{
    width: 180,
    height: 110,
    marginHorizontal: 15,
    textAlign: 'center',
    paddingHorizontal:10,
  },

  textoDesciptivo: {
    fontSize: 12,
    textAlign: 'center'
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 105,
    backgroundColor: '#A7D8DE',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
    zIndex: 1, 
  },

  headerImagotipo:{
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10, 
    width: 250,
    height: 70, 
  },

  imagotipo: {
    height: 70,
    width: 175,
  },

  footer: {
    position: 'center',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#A7D8DE',
    zIndex: 1, // por encima de otros elementos
  }
});









