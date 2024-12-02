import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import TestScreen from '../screens/screensUsuReha/screensEvaluaTest/EvaluaTest';
import { obtenerPreguntasTest, guardarRespuestasTest } from '../services/MoReha/EvaluaTestFunciones';
import React from 'react';

// Mock de las funciones del servicio
jest.mock('../services/MoReha/EvaluaTestFunciones', () => ({
  obtenerPreguntasTest: jest.fn().mockResolvedValue([
    { question: 'Pregunta 1', options: ['Opción 1', 'Opción 2'] },
    { question: 'Pregunta 2', options: ['Opción A', 'Opción B'] },
  ]),
  guardarRespuestasTest: jest.fn().mockResolvedValue(true),
  obtenerUltimaGuia: jest.fn().mockResolvedValue(null),
}));
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View, Text } = require('react-native'); // Importar explícitamente aquí
  return {
    FontAwesome: ({ name, ...props }) => (
      <View {...props}>
        <Text>{name}</Text>
      </View>
    ),
  };
});



// Mock de Firebase
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: 'mock-user-id' },
  })),
}));

// Mock de QuestionCard
jest.mock('../components/QuestionCard', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity, TextInput } = require('react-native');

  return ({ question, options, onNext, isAgeQuestion }) => (
    <View>
      <Text>{question}</Text>
      {options &&
        options.map((option, index) => (
          <TouchableOpacity key={index} onPress={() => onNext(option)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      {isAgeQuestion && (
        <TextInput
          testID="age-input"
          placeholder="Ingresa tu edad"
          keyboardType="numeric"
        />
      )}
    </View>
  );
});



// Configuración común antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
});

test('Debe renderizar preguntas y permitir seleccionar opciones', async () => {
  render(<TestScreen />);

  // Verifica que obtenerPreguntasTest se llamó
  await waitFor(() => expect(obtenerPreguntasTest).toHaveBeenCalled());

  // Verifica que la primera pregunta se renderiza
  expect(await screen.findByText('Pregunta 1')).toBeTruthy();

  // Simula la selección de una opción
  fireEvent.press(screen.getByText('Opción 1'));

  // Verifica que la segunda pregunta se renderiza
  expect(await screen.findByText('Pregunta 2')).toBeTruthy();
});

test('Debe guardar las respuestas correctamente', async () => {
  render(<TestScreen />);

  // Verifica que la primera pregunta se carga
  expect(await screen.findByText('Pregunta 1')).toBeTruthy();

  // Simula la selección de una opción para la primera pregunta
  fireEvent.press(screen.getByText('Opción 1'));

  // Verifica que la segunda pregunta se carga
  expect(await screen.findByText('Pregunta 2')).toBeTruthy();

  // Simula la selección de una opción para la segunda pregunta
  fireEvent.press(screen.getByText('Opción A'));

  // Verifica que las respuestas se guardaron
  await waitFor(() => expect(guardarRespuestasTest).toHaveBeenCalledWith('mock-user-id', [
    { question: 'Pregunta 1', answer: 'Opción 1' },
    { question: 'Pregunta 2', answer: 'Opción A' },
  ]));
});
