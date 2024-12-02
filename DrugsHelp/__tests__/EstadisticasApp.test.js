//A;un no me sirveeeeeeeeeeeeeeeeeeeeeeeeeeeeee
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import EstadisticasApp from '../screens/screensAdmon/EstadisticasApp';
import { getDocs, collection } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe('EstadisticasApp Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe mostrar estadísticas correctamente', async () => {
    // Mock para las funciones
    getDocs.mockImplementation((colRef) => {
      if (colRef === 'user') {
        return Promise.resolve({ size: 5 }); // 5 usuarios
      }
      if (colRef === 'contactos') {
        return Promise.resolve({ size: 3 }); // 3 especialistas
      }
      if (colRef === 'diag_test') {
        return Promise.resolve({ size: 10 }); // 10 tests completados
      }
      return Promise.resolve({ size: 0 });
    });

    const { getByText } = render(<EstadisticasApp />);

    // Verificamos los resultados
    await waitFor(() => {
      expect(getByText('5')).toBeTruthy(); // Total de Usuarios
      expect(getByText('3')).toBeTruthy(); // Total de Especialistas
      expect(getByText('10')).toBeTruthy(); // Total de Test Completados
    });
  });
});
