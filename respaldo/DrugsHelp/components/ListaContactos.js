import { Alert, View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ListaContactos({datos, eliminarContacto} ) {
  return (
    <ScrollView>
      {datos.map((i) => {
        return(
          <View key={i.id} style={styles.contenedor}>
       <Text style={styles.texto1}>{i.nombreCom}</Text>
            <AntDesign onPress={() =>
              Alert.alert('Eliminar', '¿Está seguro?', [
                {text: 'Cancel', style: 'cancel',},
                {text: 'OK', onPress: () => eliminarContacto(i.id)},])
              }
              style={styles.iconoEliminar} name="delete" size={30} color="black" />
      </View>
        )
      })}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  contenedor: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    borderColor:'gray',
    borderWidth:1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 0.22,
    elevation: 0.5,
  },
  texto1: {
    flex:2,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color:'#000',
  },
  iconoEliminar: {
    flex:1,
    color: 'green',
    textAlign:'right',

  },

})