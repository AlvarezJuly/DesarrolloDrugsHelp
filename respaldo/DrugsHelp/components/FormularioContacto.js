import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import uuid from 'react-native-uuid';

export default function FormularioContacto({ guardarDatos}) {
 
   const [contactos, setContactos] = useState({
    nombreCom: "",
    numero: "",
    correo: "",
    ciudad: "",
   });

   const cambiarTexto = (nombreCom, value) => {
     setContactos({...contactos, [nombreCom]: value})
   }

    //guardar y enviar el nuevo contacto 
    const enviarDatos = () => {
       if ((!contactos.nombreCom) || (!contactos.numero) || (!contactos.correo) || (!contactos.ciudad)) return
            contactos.id = uuid.v4()
            guardarDatos(contactos);
            setContactos({nombreCom:"", numero:"", correo:"", ciudad:""})   
      }
    

  return (
    <View style={styles.container}>
      <Text style={styles.textoH}>Agrega un contacto</Text>
            <TextInput
                style={styles.cajaImput}  
                    placeholder="Nombre y apellido"
                    onChangeText={(value)=> cambiarTexto("nombreCom", value)}
                    value={contactos.nombreCom}>
              </TextInput>
                    
            <TextInput  
                style={styles.cajaImput} 
                    placeholder="Número Telefónico"
                    onChangeText={(value)=> cambiarTexto("numero", value)} 
                    value={contactos.numero}>
               </TextInput>   
            
            <TextInput  
                style={styles.cajaImput} 
                    placeholder="Dirección de correo electrónico"
                    onChangeText={(value)=> cambiarTexto("correo", value)}
                    value={contactos.correo}>
              </TextInput>
                 
            
            <TextInput 
                style={styles.cajaImput}  
                    placeholder="Ciudad actual"
                    onChangeText={(value)=> cambiarTexto("ciudad", value)} 
                    value={contactos.ciudad}
            ></TextInput>
                 

            <TouchableOpacity style={styles.boton} onPress={enviarDatos}>
                <Text style={styles.textoBoton}>Guardar</Text>
            </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center'
    },

    cajaImput:{
        width: '90%',
        height: 57,
        paddingHorizontal: 15,
        marginVertical: 5,
        borderWidth: 3,
        borderColor: '#A4CAD4',
        alignItems: 'flex-start',
        borderRadius: 20,
        marginTop: 15,
    },

    textoH:{
      fontSize: 25,
      fontWeight: 'bold',
    },
    boton: {
        width: '90%',
        height: 50,
        backgroundColor: '#A4CAD4',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20
      },

      textoBoton: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
      }


});