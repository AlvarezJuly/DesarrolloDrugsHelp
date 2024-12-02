import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import Notas from '../screens/screensUsuReha/screensProgreso/Notas'; // Asegúrate de que esta ruta sea correcta
import { addNote, getNotes, deleteNote } from '../services/MoReha/ProgresFunciones';

// Mocks para las funciones de Firestore
jest.mock('../services/MoReha/ProgresFunciones', () => ({
  addNote: jest.fn(),
  getNotes: jest.fn(),
  deleteNote: jest.fn(),
}));

// Mocks de Expo Font y Ionicons
jest.mock('expo-font', () => ({
  useFonts: jest.fn().mockReturnValue([true]),  // Simula que las fuentes siempre están cargadas
}));

jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: 'Ionicons',  // Retorna un string simple para los íconos en lugar de la implementación real
  };
});

describe('Notas Component', () => {
  const initialNotes = [
    { id: '1', title: 'Nota 1', description: 'Descripción de la nota 1', timestamp: { seconds: 1609459200 } },
    { id: '2', title: 'Nota 2', description: 'Descripción de la nota 2', timestamp: { seconds: 1609545600 } },
  ];

  it('Muestra lista de notas', () => {
    // Renderiza el componente con las notas iniciales
    render(<Notas route={{ params: { notes: initialNotes } }} />);

    // Verifica que las notas se muestran
    initialNotes.forEach(note => {
      expect(screen.getByText(note.title)).toBeTruthy();
      expect(screen.getByText(note.description)).toBeTruthy();
    });
  });

  it('Agregar Nueva nota correctamente', async () => {
    // Mocks de las funciones
    addNote.mockResolvedValueOnce();
    getNotes.mockResolvedValueOnce([
      ...initialNotes,
      { id: '3', title: 'Nueva Nota', description: 'Descripción de la nueva nota', timestamp: { seconds: 1609632000 } },
    ]);

    // Renderiza el componente
    render(<Notas route={{ params: { notes: initialNotes } }} />);

    // Interactúa con los inputs y botones
    fireEvent.changeText(screen.getByPlaceholderText('Título de la nota'), 'Nueva Nota');
    fireEvent.changeText(screen.getByPlaceholderText('Contenido de la nota'), 'Descripción de la nueva nota');
    fireEvent.press(screen.getByText('Agregar Nota'));

    // Espera a que se actualicen las notas
    await waitFor(() => {
      // Verifica que `getNotes` haya sido llamada y que la nueva nota se haya agregado
      expect(getNotes).toHaveBeenCalled();
      expect(screen.getByText('Nueva Nota')).toBeTruthy();
      expect(screen.getByText('Descripción de la nueva nota')).toBeTruthy();
    });
  });

  it('Mensaje de error si los campos están vacíos al agregar una nota', () => {
    // Renderiza el componente
    render(<Notas route={{ params: { notes: initialNotes } }} />);

    // Intenta agregar una nota con campos vacíos
    fireEvent.press(screen.getByText('Agregar Nota'));

    // Verifica que no se haya agregado la nota
    expect(screen.queryByText('Nueva Nota')).toBeNull();
    expect(screen.queryByText('Descripción de la nueva nota')).toBeNull();
  });

it(' Elimina una nota correctamente', async () => {
  // Mocks de las funciones
  const mockDelete = jest.fn();
  deleteNote.mockImplementation(mockDelete);  // Mockea la implementación de deleteNote
  getNotes.mockResolvedValueOnce(initialNotes);

  // Renderiza el componente
  render(<Notas route={{ params: { notes: initialNotes } }} />);

  // Asegúrate de que las notas iniciales se estén renderizando
  initialNotes.forEach(note => {
    expect(screen.getByText(note.title)).toBeTruthy();
    expect(screen.getByText(note.description)).toBeTruthy();
  });

  // Simula la acción de eliminar la primera nota
  const deleteButton = screen.getByTestId('delete-button-1');  // Usamos testID aquí
  fireEvent.press(deleteButton);

  // Verifica que la función de eliminación haya sido llamada
  expect(mockDelete).toHaveBeenCalled();
  
  // Verifica que la lista de notas se actualiza
  await waitFor(() => {
    // La primera nota debería ser eliminada
    expect(screen.queryByText('Nota 1')).toBeNull();
    expect(screen.queryByText('Descripción de la nota 1')).toBeNull();
  });
});

});
