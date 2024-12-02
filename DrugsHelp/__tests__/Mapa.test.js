import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import CentrosRehabilitacion from '../screens/screensUsuReha/screensAsistencia/CentrosRehabilitacion';

// Mock de servicios
jest.mock('../services/MapaApi', () => ({
  useLocation: jest.fn(() => ({
    location: { latitude: 40.7128, longitude: -74.0060 },
    region: {
      latitude: 40.7128,
      longitude: -74.0060,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    error: null,
    setRegion: jest.fn(),
  })),
  fetchNearbyPlaces: jest.fn(() =>
    Promise.resolve([
      { id: '1', latitude: 40.7128, longitude: -74.0060, name: 'Centro A' },
      { id: '2', latitude: 40.7138, longitude: -74.0070, name: 'Centro B' },
    ])
  ),
  fetchPlacesByQuery: jest.fn(() =>
    Promise.resolve([
      { id: '3', latitude: 40.7150, longitude: -74.0080, name: 'Centro C' },
    ])
  ),
}));

jest.setTimeout(15000);

// Mock de FontAwesome6
jest.mock('@expo/vector-icons/FontAwesome6', () => 'FontAwesome6');

afterEach(cleanup);

describe('CentrosRehabilitacion', () => {
  it('Debe mostrar un mapa con los marcadores de los centros de rehabilitación cercanos', async () => {
    const { findAllByTestId, getByTestId } = render(<CentrosRehabilitacion />);

    // Esperar que el mapa se haya renderizado completamente
    await waitFor(() => expect(getByTestId('map-container')).toBeTruthy(), { timeout: 10000 });

    // Espera a que los marcadores se rendericen
    const markers = await waitFor(() => findAllByTestId('map-marker'), { timeout: 10000 });

    // Verifica que se han renderizado los marcadores
    expect(markers.length).toBe(2);
    expect(markers[0]).toHaveProp('testID', 'marker-1');
    expect(markers[1]).toHaveProp('testID', 'marker-2');
  });

  it('Debe mostrar los resultados de búsqueda de centros por nombre', async () => {
    const { getByTestId, findAllByTestId } = render(<CentrosRehabilitacion />);

    // Verifica que el input de búsqueda está presente
    await waitFor(() => expect(getByTestId('search-input-main')).toBeTruthy(), { timeout: 5000 });

    // Realiza la búsqueda
    fireEvent.changeText(getByTestId('search-input-main'), 'Centro A');
    fireEvent.press(getByTestId('search-button'));

    // Espera los resultados de la búsqueda
    const results = await waitFor(() => findAllByTestId('map-marker'), { timeout: 10000 });

    // Verifica que se han mostrado los resultados
    expect(results.length).toBeGreaterThan(0);

    // Verifica que el marcador correspondiente al resultado de la búsqueda está presente
    expect(results[0]).toHaveProp('testID', 'marker-1');
  });
});
