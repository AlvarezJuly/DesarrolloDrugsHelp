import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';

//importación de la bd
import {auth, db} from '../Credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, setDoc } from 'firebase/firestore'


export default function Signup(props) {
  const [nombreComp, setNombreComp] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const singup = async () => {
    if (!nombreComp || !email || !password){
      Alert.alert('Please', 'Todos los campos son obligatorios');
      return;
    }

    try {
      //creación de usuario en firebase auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //Guardar usuario
      await setDoc (doc( db, "user", user.uid), {
        name: nombreComp,
        email: email,
      });

      Alert.alert('Registro exitoso', 'Cuenta creada con éxito',
      [{text: 'OK',onPress:()=> props.navigation.navigate ('Home')}

      ]);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El correo electrónico ya esta registrado');
      } else{
      console.log(error);
      Alert.alert('Error', error.message);
    }
  }
};

  return (
    <View style={styles.container}>
      
      <View style={styles.registroContenedor}>

      <Text style={styles.title}>Registrarse</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          onChangeText={(text) => setNombreComp(text)}
          value={nombreComp}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección de correo electrónico"
          placeholderTextColor="#999"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Esribe tu contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.registerButton} onPress={singup}>
          <Text style={styles.registerButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <View style={styles.contendorOpciones}>
          <TouchableOpacity>
            <Image source={require('../icons/facebook.png')} style={styles.iconoOpciones} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../icons/google.png')} style={styles.iconoOpciones} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84B6F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  registroContenedor:{
    width: '100%',
    height: '60%',
    backgroundColor: '#EDEAE0',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 20
  },

  input: {
    width: '100%',
    backgroundColor: '#EDEAE0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#000',
    borderColor: '#002E46',
    borderWidth: 3,
  },
  registerButton: {
    backgroundColor: '#002E46',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },


  contendorOpciones: {
    flexDirection: 'row',
    marginTop: 20,
  },
  iconoOpciones: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
