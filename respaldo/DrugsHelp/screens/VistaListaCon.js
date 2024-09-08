import { View, Text, StyleSheet } from 'react-native'
import React from 'react';


export default function VistaListaCon() {
  return (
        <View style={styles.container}>
                    <Text style={styles.textoañadir}>Lista de Contactos</Text>      
        </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#d3d3d3',
        alignItems: 'center',
    },

    textoañadir:{
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop:15,
    }

});