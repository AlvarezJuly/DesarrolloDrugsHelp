import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { auth, db } from '../Credenciales';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup(props) {
  const [nombreComp, setNombreComp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para mostrar el indicador de carga

  const signup = async () => {
    if (!nombreComp || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setLoading(true); // Mostrar spinner mientras el registro está en proceso

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar los datos del usuario en Firestore
      await setDoc(doc(db, 'user', user.uid), {
        name: nombreComp,
        email: user.email,
        createdAt: new Date(), // guardar la fecha de registro
      });

      // Mostrar alerta de éxito y navegar a la pantalla de inicio
      Alert.alert('Éxito', 'Usuario registrado exitosamente');
      props.navigation.navigate('Home');

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'El correo electrónico ya está registrado');
      } else {
        console.error(error);
        Alert.alert('Error', 'Algo salió mal: ' + error.message);
      }
    } finally {
      setLoading(false); // culmina el proceso de carga
    }
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View style={styles.registroContenedor}>
        <Text style={styles.title}>Registrarse</Text>
=======
      
    <View style={styles.registroContenedor}>

      <Text style={styles.title}>Registrarse</Text>
>>>>>>> DesarrolloScreenAsistencia
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#999"
          onChangeText={setNombreComp}
          value={nombreComp}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#002E46" />
        ) : (
          <TouchableOpacity style={styles.registerButton} onPress={signup}>
            <Text style={styles.registerButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        )}

        <View style={styles.contendorOpciones}>
          <TouchableOpacity>
            <Image source={require('../icons/facebook.png')} style={styles.iconoOpciones} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../icons/google.png')} style={styles.iconoOpciones} />
          </TouchableOpacity>
        </View>
<<<<<<< HEAD
      </View>
=======
    </View>
>>>>>>> DesarrolloScreenAsistencia
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
  registroContenedor: {
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
    padding: 20,
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
