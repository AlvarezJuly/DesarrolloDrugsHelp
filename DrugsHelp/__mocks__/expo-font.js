export const Font = {
    isLoaded: jest.fn(() => true), // Simula que las fuentes están cargadas correctamente
    loadAsync: jest.fn(), // Mock de loadAsync para evitar errores en las pruebas
};
  