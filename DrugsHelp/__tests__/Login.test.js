import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../screens/auth/Login'; // Ajusta la ruta según tu estructura
import { loginUsuario } from '../services/AuthFunciones'; // Ajusta la ruta según tu estructura

jest.mock('expo-font', () => ({
  useFonts: () => [true], // Simula que las fuentes están cargadas
}));

jest.mock('@expo/vector-icons', () => ({
  Octicons: 'MockedOcticons', // Simula los iconos como texto
}));

// Mock de la función loginUsuario
jest.mock('../services/AuthFunciones', () => ({
  loginUsuario: jest.fn(),
}));

describe('Login', () => {
  it('Debe mostrar los campos de email y contraseña', () => {
    const { getByPlaceholderText } = render(<Login />);

    // Verifica si los campos de email y contraseña están presentes
    expect(getByPlaceholderText('Usuario')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('Debe cambiar el estado de la contraseña oculta cuando se presiona el ícono', () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />);

    // Inicialmente, la contraseña está oculta
    expect(getByPlaceholderText('Contraseña').props.secureTextEntry).toBe(true);

    // Al presionar el ícono, el estado cambia
    fireEvent.press(getByTestId('eye-icon'));
    expect(getByPlaceholderText('Contraseña').props.secureTextEntry).toBe(false);
  });

  it('Debe llamar a loginUsuario cuando se presiona el botón de inicio de sesión para navegar según su rol', async () => {
    const navigation = { navigate: jest.fn() }; // Creamos un mock de la función navigate
    const { getByPlaceholderText, getByText } = render(<Login navigation={navigation} />);
  
    const email = getByPlaceholderText('Usuario');
    const password = getByPlaceholderText('Contraseña');
  
    // Simula la escritura del email y la contraseña
    fireEvent.changeText(email, 'user@example.com');
    fireEvent.changeText(password, 'password123');
  
    const loginButton = getByText('Iniciar Sesión');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
      // Verifica que la función loginUsuario haya sido llamada con los parámetros correctos
      expect(loginUsuario).toHaveBeenCalledWith('user@example.com', 'password123', navigation);
    });
  });
  
  it('Debe redirigir a la pantalla de Signup al presionar el enlace de "Registrarse"', () => {
    const navigation = { navigate: jest.fn() };  // Creamos un mock de la función navigate
    const { getByText } = render(<Login navigation={navigation} />);
  
    const signUpLink = getByText('Registrarse');  // Localiza el texto "Registrarse"
    
    // Simula la acción de presionar el enlace
    fireEvent.press(signUpLink);
    
    // Verifica que la función navigate haya sido llamada con la pantalla correcta
    expect(navigation.navigate).toHaveBeenCalledWith('Signup');
  });
});
