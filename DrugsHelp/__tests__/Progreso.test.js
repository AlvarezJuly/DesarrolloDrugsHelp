import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import Progreso from '../screens/screensUsuReha/screensProgreso/Progreso'; // Ajusta la ruta según corresponda
import { getProgress, updateProgress, getNotes } from '../services/MoReha/ProgresFunciones';

// Mock de los servicios
jest.mock('../services/MoReha/ProgresFunciones', () => ({
    getProgress: jest.fn(),
    updateProgress: jest.fn(),
    getNotes: jest.fn(),
  }));
  
// Configura el mock para getProgress
jest.mock('../services/MoReha/ProgresFunciones', () => ({
    getProgress: jest.fn(),
    updateProgress: jest.fn(),
    getNotes: jest.fn(),
  }));
  
  // Configura el mock para que no haga nada en los tests
  updateProgress.mockResolvedValue();  // Asegúrate de que la promesa se resuelva correctamente
  
  
// Mock de la navegación
const mockNavigate = jest.fn();

describe('Progreso', () => {
  beforeEach(() => {
    // Mockear los datos iniciales
    getProgress.mockResolvedValue({
      completedWeeks: 5,
      currentWeekProgress: 50,
      abstinenceDays: 30,
    });
    getNotes.mockResolvedValue([
      { id: 1, note: 'Note 1' },
      { id: 2, note: 'Note 2' },
    ]);
  });

  it('Debe mostrar los datos cargados correctamente', async () => {
    const { getByText } = render(<Progreso navigation={{ navigate: mockNavigate }} />);

    // Verifica que los datos de progreso estén en la pantalla
    await waitFor(() => {
      expect(getByText('5 semanas')).toBeTruthy(); // Semanas completadas
      expect(getByText('30 días')).toBeTruthy(); // Días de abstinencia
    });
  });

  it('Debe incrementar los días de abstinencia cuando se presiona "Incrementar"', async () => {
    const { getByText, getByTestId } = render(<Progreso navigation={{ navigate: mockNavigate }} />);

    // Esperar que los días de abstinencia se muestren correctamente
    await waitFor(() => {
      expect(getByText('30 días')).toBeTruthy();
    });

    // Simular el clic en el botón "Incrementar"
    fireEvent.press(getByText('Incrementar'));

    // Verificar que el número de días de abstinencia se haya incrementado
    await waitFor(() => {
      expect(getByText('31 días')).toBeTruthy();
    });

    // Verificar que la función updateProgress haya sido llamada con los nuevos valores
    expect(updateProgress).toHaveBeenCalledWith(5, 50, 31);
  });


  test('Debe reiniciar los días de abstinencia cuando se presiona "Reiniciar"', async () => {
    // Mock de las funciones
    getProgress.mockResolvedValue({
        completedWeeks: 5,
        currentWeekProgress: 50,
        abstinenceDays: 31,
    });

    // Renderiza el componente
    const { getByText } = render(<Progreso />);

    // Espera que se carguen los datos inicialmente
    await waitFor(() => expect(getByText('31 días')).toBeTruthy());

    // Simula el clic en el botón de "Reiniciar"
    fireEvent.press(getByText('Reiniciar'));

    // Verifica que updateProgress haya sido llamada con 0 días
    await waitFor(() => {
        expect(updateProgress).toHaveBeenCalledWith(5, 50, 0);  // Los parámetros deben ser correctos
    });

    // Verifica que el estado de abstinenceDays haya cambiado a 0
    await waitFor(() => expect(getByText('0 días')).toBeTruthy());
});


  
  it('Debe navegar a la pantalla de Notas al presionar el botón de Notas', async () => {
    const mockNavigate = jest.fn();  // Crear un mock de la función navigate
    const { getByText } = render(<Progreso navigation={{ navigate: mockNavigate }} />);
  
    // Simula el clic en el botón "Agrega tus notas"
    fireEvent.press(getByText('Agrega tus notas'));
  
    // Verificar que la navegación fue llamada con los parámetros correctos
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Notas', { notes: expect.any(Array) });
    });
  });
  
  
});
