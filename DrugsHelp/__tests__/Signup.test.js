import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from '../screens/auth/Signup'; // Ruta correcta al componente
import { registroUsuario } from '../services/AuthFunciones'; // Importar la función para registrar

// Mock de las funciones de Firebase
jest.mock('../services/AuthFunciones', () => ({
  registroUsuario: jest.fn(), // Mock de la función 'registroUsuario'
}));

jest.mock('@expo/vector-icons', () => ({
    Octicons: 'Octicons',  // Simulamos el componente como una cadena
  }));

describe('Signup', () => {
  it('Muestra los campos de nombre, correo y contraseña', () => {
    const { getByPlaceholderText } = render(<Signup />);

    // Verifica que los campos estén presentes
    expect(getByPlaceholderText('Nombre completo')).toBeTruthy();
    expect(getByPlaceholderText('Correo electrónico')).toBeTruthy();
    expect(getByPlaceholderText('Contraseña')).toBeTruthy();
  });

  it('Debe cambiar el estado de la contraseña oculta cuando se presiona el ícono', () => {
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    
    // Verifica que la contraseña esté oculta inicialmente
    expect(getByPlaceholderText('Contraseña').props.secureTextEntry).toBe(true);
    
    // Cambia el estado de la contraseña al presionar el ícono
    fireEvent.press(getByTestId('eye-icon'));
    
    // Verifica que la contraseña ya no esté oculta
    expect(getByPlaceholderText('Contraseña').props.secureTextEntry).toBe(false);
  });
  
  it('Envia su credenciales  al presionar el botón de registrarse y navega según su rol', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup navigation={jest.fn()} />); // Mock de navigation
    
    // Simula la entrada de datos
    fireEvent.changeText(getByPlaceholderText('Nombre completo'), 'Juan Perez');
    fireEvent.changeText(getByPlaceholderText('Correo electrónico'), 'juan@gmail.com');
    fireEvent.changeText(getByPlaceholderText('Contraseña'), 'password123');
    
    // Simula el clic en el botón de registro
    fireEvent.press(getByText('Crear Cuenta'));
  
    // Espera a que la función se haya llamado y verifica sus parámetros
    await waitFor(() => {
      // Verifica que la función 'registroUsuario' haya sido llamada con los parámetros correctos
      expect(registroUsuario).toHaveBeenCalledWith(
        'Juan Perez', 
        'juan@gmail.com', 
        'password123', 
        expect.any(Function) // Aquí esperamos que el cuarto parámetro sea una función (navigation)
      );
    });
  });

});

