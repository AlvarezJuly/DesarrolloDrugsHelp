import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HomeOptions({ navigation }) {
  return (
    /*Menú de opciones*/
    <View style={styles.container}>
          <View style={styles.header}> 
            <View style={styles.headerImagotipo}>
              <Image 
                source={require('../icons/imagotipoH.png')} 
                style={styles.imagotipo}   
              />
            </View>
        </View>
             
              <View style={styles.contenedorBotones}>
                    
                      <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('EvaluaTest')}>
                                    <Image 
                                    source={require('../icons/Test.png')} 
                                    style={styles.icono}
                                    />    
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Test Evaluativo</Text> 
                                <Text style={styles.textoDesciptivo}>"Completa el test para evaluar tu nivel de adicción"</Text>      
                          </View>
                      </View>

                      <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('Asistencia')}>
                                    <Image 
                                    source={require('../icons/asistencia.png')} 
                                    style={styles.icono} 
                                    />                                       
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Asistencia</Text>       
                          </View>
                      </View>

                      <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('Informate')}>
                                    <Image 
                                    source={require('../icons/Informate.png')} 
                                    style={styles.icono}
                                    />    
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Informate</Text>       
                          </View>
                      </View>

                      <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('RutaAyuda')}>
                                    <Image 
                                    source={require('../icons/autocuidado.png')} 
                                    style={styles.icono}
                                    />    
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Autocuidado</Text>       
                          </View>
                      </View>
     
     
          </View>
        <View style={styles.footer}></View> 
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#84B6F4',
    flex: 1,
  }, 

  contenedorBotones: {
    marginTop: 100, // Para que los botones no queden detrás del header
    marginBottom: 70, // Para que los botones no queden detrás del footer
    paddingHorizontal: 10,
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
    height: 120, 
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
    height: 100,
    width: 100,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#A7D8DE',
    zIndex: 1, // por encima de otros elementos
  }
});
