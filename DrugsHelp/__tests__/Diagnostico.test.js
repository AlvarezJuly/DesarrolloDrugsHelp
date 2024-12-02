import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Diagnostico from '../screens/screensUsuReha/screensEvaluaTest/Diagnostico'; // Ajusta la ruta según tu estructura
import { obtenerUltimoDiagnostico } from '../services/MoReha/EvaluaTestFunciones'; // Ajusta la ruta según tu estructura

// Mock de la función de servicio
jest.mock('../services/MoReha/EvaluaTestFunciones', () => ({
  obtenerUltimoDiagnostico: jest.fn(),
}));

describe('Diagnostico', () => {
  const mockRoute = { params: { userId: '12345' } };
  const mockNavigation = { navigate: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debe mostrar un indicador de carga al inicio', () => {
    const { getByTestId } = render(
      <Diagnostico route={mockRoute} navigation={mockNavigation} />
    );

    // Verifica que el indicador de carga está presente
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('Debe mostrar los datos del diagnóstico correctamente', async () => {
    obtenerUltimoDiagnostico.mockResolvedValue({
      userName: 'Juan Pérez',
      age: 30,
      sex: 'Masculino',
      substance: 'Alcohol',
      frequency: 'Diario',
      reason: 'Estrés',
    });

    const { getByText } = render(
      <Diagnostico route={mockRoute} navigation={mockNavigation} />
    );

    // Espera a que se obtengan los datos del diagnóstico
    await waitFor(() => expect(obtenerUltimoDiagnostico).toHaveBeenCalledWith('12345'));

    // Verifica que los datos se muestran correctamente
    expect(getByText('Hola, Juan Pérez')).toBeTruthy();
    expect(getByText('30 años')).toBeTruthy();
    expect(getByText('Masculino')).toBeTruthy();
    expect(getByText('Alcohol')).toBeTruthy();
    expect(getByText('Diario')).toBeTruthy();
    expect(getByText('Estrés')).toBeTruthy();
  });

  it('Debe mostrar un mensaje de error si no se pueden cargar los datos', async () => {
    obtenerUltimoDiagnostico.mockRejectedValue(new Error('Error al obtener los datos'));

    const { getByText } = render(
      <Diagnostico route={mockRoute} navigation={mockNavigation} />
    );

    // Espera a que el componente maneje el error
    await waitFor(() =>
      expect(getByText('Error al cargar los datos del usuario.')).toBeTruthy()
    );
  });
});
