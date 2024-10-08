import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

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
      [{text: 'OK',onPress:()=> props.navigation.navigate ('Login')}

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
          placeholder="Escribe una contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.registerButton} onPress={singup}>
          <Text style={styles.registerButtonText}>Crear Cuenta</Text>
        </TouchableOpacity>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  registroContenedor:{
    width: '100%',
    height: '90%',
    backgroundColor: '#a0c4ff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  registerButton: {
    backgroundColor: '#00aaff',
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
});
