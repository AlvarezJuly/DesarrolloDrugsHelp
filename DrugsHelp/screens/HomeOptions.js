import { View, Text,StyleSheet, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function HomeOptions({ navigation }) {
  return (
    /*Menú de opciones*/
    <View style={styles.container}>
          <View style={styles.header}> 
              <Image 
                source={require('../images/Logo.png')} 
                style={styles.logo}
              />
              <Text style={styles.textoHeader}>DrugsHelp</Text>
        </View>
             

              <View style={styles.contenedorBotones}>
                    
                      <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('Test')}>
                                    <Image 
                                    source={require('../images/Test.png')} 
                                    style={{height: 110, width:110}}
                                    />    
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Test Evaluativo</Text>       
                          </View>
                      </View>

                      <View style={styles.trasfondo}>
                          <TouchableOpacity style={styles.contenedorIcono} 
                                  onPress={() => navigation.navigate('Asistencia')}>
                                    <Image 
                                    source={require('../images/Asistencia.png')} 
                                    style={{height: 110, width:110}}
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
                                    source={require('../images/Informate.png')} 
                                    style={{height: 110, width:110}}
                                    />    
                          </TouchableOpacity>
                          <View style={styles.contenedorTexto}> 
                                <Text style={styles.textoIconoBoton}>Informate</Text>       
                          </View>
                      </View>
     
          </View>
        <View style={styles.footer}></View> 
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3',
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
    backgroundColor: '#A4CAD4',
    borderColor: '#00CEFF',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 30,
    borderRadius: 50, // Reducción del tamaño del fondo respecto al contenedor
    width: 370, // Tamaño menor que el contenedorIcono
    height: 130, // Tamaño menor que el contenedor
    alignSelf: 'center', // Centrar el fondo respecto a los botones
  },

  contenedorIcono: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A4CAD4',
    borderRadius: 50,
    width: 140,  
    height: 165,
    padding: 20,
    borderColor: '#00CEFF',
    borderWidth: 5,
  },

  icono: {
    height: 110,
    width: 90,
  },
 
  textoIconoBoton: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  contenedorTexto:{
    width: 180,
    height: 110,
    marginHorizontal: 15,
    paddingHorizontal:10
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    borderColor: '#00aaff',
    backgroundColor: '#00aaff',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1, 
  },

  textoHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    marginTop: 25,
  },

  logo: {
    marginTop: 25,
    height: 60,
    width: 60,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    borderColor: '#00aaff',
    backgroundColor: '#00aaff',
    zIndex: 1, // por encima de otros elementos
  }
});
