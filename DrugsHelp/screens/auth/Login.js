import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { loginUsuario } from '../../services/AuthFunciones'; //funcion a utilizar
import { Octicons } from '@expo/vector-icons';

export default function Login({ navigation }) {

  //Declaracion de variables para actualizar los valores
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <View style={styles.logoYTexto}>
          <Image
            source={require('../../assets/icons/imagotipoV.png')}
            style={styles.logo}
          />
          <Text style={styles.loginTitulo}>Ingresa:</Text>
        </View>

        <View style={styles.containerUsuario}>
          <TextInput
            style={styles.imput}
            placeholder="Usuario"
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
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} testID="eye-icon">
              <Octicons name={hidePassword ? "eye-closed" : "eye"} size={24} color="black" />
            </TouchableOpacity>
        </View>

          <TouchableOpacity style={styles.loginBoton} onPress={() => loginUsuario(email, password, navigation)}>{/**Se envian los datos a la funcion */}
            <Text style={styles.loginBotonTexto}>Iniciar Sesión</Text>
          </TouchableOpacity>
            <Text style={styles.preguntas}>¿Olvidaste tu contraseña?</Text>
          <View style={styles.contenedorNoCuenta}>
            <Text style={styles.preguntas}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.registrarse}>Registrarse</Text>
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
  },
  loginContainer: {
    width: '90%',
    backgroundColor: '#EDEAE0',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75, 
    marginHorizontal:40
  },
  loginTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginEnd:140
  },
  logoYTexto:{
    marginVertical: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imput: {
    flex: 1,
    backgroundColor: '#EDEAE0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    color: '#002E46',
    fontWeight: 'bold',
  },
  containerUsuario:{
    width: '100%',
    backgroundColor: '#EDEAE0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 60,
    borderWidth: 3,
    borderColor: '#002E46',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#EDEAE0',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#002E46',
  },
  loginBoton: {
    backgroundColor: '#002E46',
    borderRadius: 15,
    padding: 15,
    width: '60%',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginBotonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preguntas: {
    color: '#002E46',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  registrarse: {
    color: '#84B6F4',
    marginHorizontal: 2,
  },
  contenedorNoCuenta: {
    flexDirection: 'row',
    alignItems: 'center',
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
