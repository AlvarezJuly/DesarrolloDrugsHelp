import React from 'react'; 
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RutaAutocuidado from '../screens/screensUsuReha/screensRutaAyuda/RutaAutocuidado';
import { Alert } from 'react-native';

// Mock de las funciones que interactúan con los servicios
jest.mock('../services/ModelAI', () => ({
  fetchArticulos: jest.fn(),
  fetchTecnicasRelax: jest.fn(),
  fetchEjercicios: jest.fn(),
  fetchAlimentacion: jest.fn(),
}));

jest.mock('../services/MoReha/RutaFunciones', () => ({
  obtenerGuia: jest.fn(),
  guardarGuiaEnFirebase: jest.fn(),
  obtenerVideoRelacionado: jest.fn(),
}));

jest.mock('../services/MoReha/ProgresFunciones', () => ({
  obtenerProgresoSemanal: jest.fn(),
  actualizarProgreso: jest.fn(),
}));

describe('RutaAutocuidado', () => {
  const mockNavigation = { replace: jest.fn(), goBack: jest.fn(), navigate: jest.fn(), };
  const mockRoute = {
    params: {
      userId: 'testUserId',
      diagnosticData: {
        age: 30,
        sex: 'male',
        substance: 'cigarettes',
        frequency: 'daily',
        reason: 'stress',
      },
    },
  };

jest.spyOn(Alert, 'alert');


  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn(); // Asegúrate de que alert esté disponible
  });


  it('Muestra el indicador de carga mientras se obtiene la guía', async () => { 
  const mockGuiaData = { id: 'mockGuiaId', steps: [] };
  
  // Mocks para todas las funciones necesarias
  require('../services/MoReha/RutaFunciones').obtenerGuia.mockResolvedValueOnce(null);
  require('../services/ModelAI').fetchArticulos.mockResolvedValueOnce([]);
  require('../services/ModelAI').fetchTecnicasRelax.mockResolvedValueOnce([]);
  require('../services/ModelAI').fetchEjercicios.mockResolvedValueOnce([]);
  require('../services/ModelAI').fetchAlimentacion.mockResolvedValueOnce([]);
  require('../services/MoReha/RutaFunciones').obtenerVideoRelacionado.mockResolvedValueOnce({
    videoUrl: 'https://example.com/sample-video.mp4',
  });
  require('../services/MoReha/RutaFunciones').guardarGuiaEnFirebase.mockResolvedValueOnce(mockGuiaData);

  const { getByTestId } = render(
    <RutaAutocuidado route={mockRoute} navigation={mockNavigation} />
  );

  // Verificar que el indicador de carga está presente
  expect(getByTestId('loading-indicator')).toBeTruthy();

  // Esperar explícitamente hasta que el indicador desaparezca
  await waitFor(() => expect(() => getByTestId('loading-indicator')).toThrow());
});

  
it('Se muestra una alerta si no se encuentra la guía y no hay datos de diagnóstico', async () => {
    // Mock de `obtenerGuia` para que retorne null
    require('../services/MoReha/RutaFunciones').obtenerGuia.mockResolvedValueOnce(null);
  
    // Renderiza el componente con `diagnosticData` nulo
    const { getByText } = render(
      <RutaAutocuidado
        route={{
          ...mockRoute,
          params: { ...mockRoute.params, diagnosticData: null }, // Sin datos de diagnóstico
        }}
        navigation={mockNavigation}
      />
    );
    // Verifica que la alerta se muestra
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        "Guía de Autocuidado",
        "Primero debes completar el test para generar tu guía de autocuidado. ¿Quiéres realizar el test ahora?",
        [
          { text: "Cancelar", style: "cancel", onPress: expect.any(Function) },
          { text: "OK", onPress: expect.any(Function) }
        ],
        { cancelable: false }
      )
    );
  });
  


  it('Se debe generar una nueva guía(si no se encuentra ninguna) con los datos del diagnóstico ', async () => {
    // Simulamos que no existe una guía guardada y los servicios de generación de guía devuelven datos
    require('../services/MoReha/RutaFunciones').obtenerGuia.mockResolvedValueOnce(null);

    // Simulamos que las funciones de generación de guía devuelven datos vacíos
    require('../services/ModelAI').fetchArticulos.mockResolvedValueOnce([]);
    require('../services/ModelAI').fetchTecnicasRelax.mockResolvedValueOnce([]);
    require('../services/ModelAI').fetchEjercicios.mockResolvedValueOnce([]);
    require('../services/ModelAI').fetchAlimentacion.mockResolvedValueOnce([]);

    const { getByText } = render(
      <RutaAutocuidado route={mockRoute} navigation={mockNavigation} />
    );

    // Verificar que la función para generar la nueva guía es llamada
    await waitFor(() => expect(require('../services/ModelAI').fetchArticulos).toHaveBeenCalled());
    await waitFor(() => expect(require('../services/ModelAI').fetchTecnicasRelax).toHaveBeenCalled());
    await waitFor(() => expect(require('../services/ModelAI').fetchEjercicios).toHaveBeenCalled());
    await waitFor(() => expect(require('../services/ModelAI').fetchAlimentacion).toHaveBeenCalled());
  });

  it('debe mostrar la barra de progreso', async () => {
    // Simulamos los datos del progreso semanal
    require('../services/MoReha/ProgresFunciones').obtenerProgresoSemanal.mockResolvedValueOnce(50);

    const { getByTestId } = render(
      <RutaAutocuidado route={mockRoute} navigation={mockNavigation} />
    );

    // Esperar y verificar que la barra de progreso se muestra correctamente
    await waitFor(() => expect(getByTestId('progress-bar')).toBeTruthy());
  });

  it('Navega a la lista de actividades cuando se presiona un botón de categoría de actividades ej: Artículo', async () => {
    const mockGuia = {
      articulosCientificos: [],
      tecnicasRelax: [],
      rutinasEjercicio: [{ id: 1, name: 'Rutina de prueba' }],
      alimentacionSaludable: [],
      videoRelacionado: null,
    };

    // Mock de obtenerGuia para devolver una guía válida
    jest.spyOn(require('../services/MoReha/RutaFunciones'), 'obtenerGuia').mockResolvedValueOnce(mockGuia);

    // Mock de navigation
    const mockNavigation = {
      navigate: jest.fn(),
      goBack: jest.fn(),
      replace: jest.fn(),
    };

    const { getByTestId } = render(
      <RutaAutocuidado
        route={{
          params: { diagnosticData: {}, userId: 'mockUserId' },
        }}
        navigation={mockNavigation} // Pasar el mock aquí
      />
    );

    // Espera a que el botón sea renderizado
    const categoryButton = await waitFor(() => getByTestId('category-button1'));

    // Simula el clic en el botón
    fireEvent.press(categoryButton);

    // Verifica que navigate haya sido llamado con los parámetros correctos
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Actividades', {
      data: mockGuia.rutinasEjercicio,
      tipo: 'rutina',
    });
  });
  

});
