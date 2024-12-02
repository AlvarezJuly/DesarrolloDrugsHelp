import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardEspecialista from '../components/CardEspecialista'; // Ajusta la ruta según tu estructura

describe('CardEspecialista', () => {
  const mockOnPress = jest.fn();
  const especialista = {
    nombreCom: 'Juan Pérez',
    especialidad: 'Cardiólogo',
    ciudad: 'Madrid',
    foto: 'https://example.com/foto.jpg',
  };

  it('Debe mostrar la información del especialista correctamente', () => {
    const { getByTestId, getByText } = render(
      <CardEspecialista especialista={especialista} onPress={mockOnPress} />
    );

    // Verifica que la imagen del especialista está presente
    const imageElement = getByTestId('image-especialista');
    expect(imageElement).toBeTruthy();

    // Verifica que el nombre del especialista está presente
    const nameElement = getByText('Juan Pérez');
    expect(nameElement).toBeTruthy();

    // Verifica que la especialidad del especialista está presente
    const specialtyElement = getByText('Cardiólogo');
    expect(specialtyElement).toBeTruthy();

    // Verifica que la ciudad del especialista está presente
    const cityElement = getByText('Madrid');
    expect(cityElement).toBeTruthy();
  });

  it('Al hacer onPress en la card o tarjeta debe navegar a detalles del especialista(Pantalla de info completa)', () => {
    const { getByTestId } = render(
      <CardEspecialista especialista={especialista} onPress={mockOnPress} />
    );

    // Simula el clic en el TouchableOpacity
    fireEvent.press(getByTestId('card-especialista'));

    // Verifica que la función onPress fue llamada
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('Debe mostrar valores por defecto si los datos del especialista no están disponibles', () => {
    const especialistaDefault = {};

    const { getByText } = render(
      <CardEspecialista especialista={especialistaDefault} onPress={mockOnPress} />
    );

    // Verifica que los valores por defecto se muestran correctamente
    const nameElement = getByText('Nombre no disponible');
    expect(nameElement).toBeTruthy();

    const specialtyElement = getByText('Especialidad no disponible');
    expect(specialtyElement).toBeTruthy();

    const cityElement = getByText('Ciudad no especificada');
    expect(cityElement).toBeTruthy();
  });
});
