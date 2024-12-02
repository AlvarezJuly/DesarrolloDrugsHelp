import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { registroUsuario } from '../../services/AuthFunciones'; // Importar la función para registrar
import { Octicons } from '@expo/vector-icons';

//Declaracion de variables para actualizar los valores
export default function Signup({ navigation }) {
  const [nombreComp, setNombreComp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);  // Indica que se está procesando la solicitud
    await registroUsuario(nombreComp, email, password, navigation);  // Llama a la función de registro
    setLoading(false);  // Desactiva el indicador de carga después de completar el proceso
  };

  return (
    <View style={styles.container}>
      <View style={styles.registroContenedor}>
        <View style={styles.loginContainer}>
          <Image
            source={require('../../assets/icons/imagotipoV.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Registrarse</Text>
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
        <View style={styles.passwordContainer}>
          <TextInput
            testID="password-input"
            secureTextEntry={hidePassword}
            style={styles.imput}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} testID="eye-icon" >
            <Octicons name={hidePassword ? "eye-closed" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#002E46" />
        ) : (
          <TouchableOpacity style={styles.registerButton} onPress={handleSignup} testID="register-button">
            <Text style={styles.registerButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        )}
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
  registroContenedor: {
    width: '100%',
    height: '75%',
    backgroundColor: '#EDEAE0',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
  },

  loginContainer: {
    width: '90%',
    backgroundColor: '#EDEAE0',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    
  },
  logo: {
    width: 75,
    height: 75, 
    marginHorizontal:40
  },

  input: {
    width: '100%',
    backgroundColor: '#EDEAE0',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    color: '#000',
    borderColor: '#002E46',
    borderWidth: 3,
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

  imput: {
    flex: 1,
    backgroundColor: '#EDEAE0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    color: '#002E46',
    fontWeight: 'bold',
  },

  registerButton: {
    backgroundColor: '#002E46',
    borderRadius: 15,
    padding: 18,
    width: '60%',
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
    marginTop: 10,
  },
  iconoOpciones: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
