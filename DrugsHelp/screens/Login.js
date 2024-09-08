import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Credenciales';
import { Octicons } from '@expo/vector-icons';

export default function Login (props) {

  // Variables de estado
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true); // Se inicializa en 'true' para ocultar la contraseña por defecto.. "ojito"

  const logueo = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Iniciando sesión', 'Accediendo...');
      props.navigation.navigate('Home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'El usuario o la contraseña son incorrectos');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Image
          source={require('../images/Logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.loginTitulo}>Inicia Sesión</Text>
        <View style={styles.containerUsuario}>
        <TextInput
          style={styles.imput}
          placeholder="correo@gmail.com"
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor="#999"
        />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={hidePassword}
            style={styles.imput}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Octicons name={hidePassword ? "eye-closed" : "eye"} size={24} color="black" /> 
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBoton} onPress={logueo}>
          <Text style={styles.loginBotonTexto}>Iniciar</Text>
        </TouchableOpacity>
        <Text style={styles.olvidarcontra}>¿Olvidaste tu contraseña?</Text>
        <View style={styles.contenedorNoCuenta}>
          <Text style={styles.textoNoCuenta}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text style={styles.registrarse}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contendorOpciones}>
          <TouchableOpacity>
            <Image source={require('../images/facebook.png')} style={styles.iconoOpciones} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/google.png')} style={styles.iconoOpciones} />
          </TouchableOpacity>
        </View>
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
  },
  loginContainer: {
    width: '90%',
    backgroundColor: '#a0c4ff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  loginTitulo: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  imput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  containerUsuario:{
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 60
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginBoton: {
    backgroundColor: '#00aaff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginBotonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  olvidarcontra: {
    color: '#000',
    marginVertical: 10,
  },
  textoNoCuenta: {
    color: '#000',
    marginVertical: 10,
  },
  registrarse: {
    color: 'blue',
    marginHorizontal: 2,
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
  contenedorNoCuenta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
