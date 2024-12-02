import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
import DetalleEspecialista from "../screens/screensUsuReha/screensAsistencia/DetalleEspecialista"; // Asegúrate de usar la ruta correcta
import { Alert } from "react-native";

// Mock de las funciones de Firebase
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

// Mock de la función enviarSolicitudChat
jest.mock("../services/MoReha/AsistenciaFunciones", () => ({
  enviarSolicitudChat: jest.fn().mockResolvedValue("Solicitud enviada"),
}));

// Mock de la alerta de React Native
jest.spyOn(Alert, 'alert').mockImplementation(() => {});  // Evita que se muestre la alerta en los tests

describe("DetalleEspecialista", () => {
  const especialista = {
    nombreCom: "Juan Pérez",
    especialidad: "Cardiólogo",
    correo: "juan@ejemplo.com",
    foto: "http://example.com/foto.jpg",
    descripcion: "Descripción del especialista",
  };

  it("Debe mostrar los datos completos del especialista", () => {
    render(<DetalleEspecialista route={{ params: { especialista } }} />);

    // Verificar que los detalles del especialista se muestran correctamente
    expect(screen.getByText("Juan Pérez")).toBeTruthy(); // Nombre
    expect(screen.getByText("Cardiólogo")).toBeTruthy(); // Especialidad
    expect(screen.getByText("juan@ejemplo.com")).toBeTruthy(); // Correo
    expect(screen.getByText("Descripción del especialista")).toBeTruthy(); // Descripción

    // Verificar la imagen
    const image = screen.getByTestId("image");
    expect(image.props.source.uri).toBe("http://example.com/foto.jpg");
  });

  it("Debe llamar a la función enviarSolicitudChat cuando se presiona el botón de solicitud de chat", async () => {
    render(<DetalleEspecialista route={{ params: { especialista } }} />);

    // Simula el clic en el botón de solicitud de chat
    fireEvent.press(screen.getByTestId("chatButton"));

    // Verifica que la función enviarSolicitudChat fue llamada
    await waitFor(() => {
      expect(require("../services/MoReha/AsistenciaFunciones").enviarSolicitudChat).toHaveBeenCalledWith(especialista);
    });

    // Verificar que la alerta se muestra correctamente
    expect(Alert.alert).toHaveBeenCalledWith(
      "Solicitud enviada", 
      "Tu solicitud de chat ha sido enviada al especialista."
    );
  });

});
