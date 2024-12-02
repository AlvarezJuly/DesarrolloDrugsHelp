import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import ChatBotInformate from '../components/ChatBotInformate'; // Ruta correcta
import { fetchChatBotResponse } from '../services/ModelAI'; // Mock del servicio

// Mock del servicio de IA
jest.mock('../services/ModelAI', () => ({
  fetchChatBotResponse: jest.fn(),
}));

// Mock de Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: (props) => {
    const MockIcon = (innerProps) => <div {...innerProps}>Mocked Icon</div>;
    return MockIcon(props);
  },
}));

test('Debe manejar la conversación correctamente', async () => {
  fetchChatBotResponse.mockResolvedValue('Esta es una respuesta simulada');

  render(<ChatBotInformate />);

  const input = screen.getByPlaceholderText('Pregunta algo...');
  const sendButton = screen.getByTestId('send-button');

  // Simula la interacción del usuario
  fireEvent.changeText(input, '¿Cuál es tu nombre?');
  fireEvent.press(sendButton);

  // Verifica que se haya llamado al servicio mockeado
  await waitFor(() => {
    expect(fetchChatBotResponse).toHaveBeenCalledWith('¿Cuál es tu nombre?');
  });

  // Depuración: verifica el estado de la conversación en el DOM
  const userMessage = await screen.findByText('¿Cuál es tu nombre?');
  const botMessage = await screen.findByText('Esta es una respuesta simulada');

  // Verifica los mensajes en la conversación
  expect(userMessage).toBeTruthy();
  expect(botMessage).toBeTruthy();
});
