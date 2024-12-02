import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Especialista from "../screens/screensUsuReha/screensAsistencia/Especialista"; // Ajusta la ruta según tu estructura de carpetas
import { obtenerContactos } from "../services/MoReha/AsistenciaFunciones";

// Mock de la API obtenerContactos
jest.mock("../services/MoReha/AsistenciaFunciones", () => ({
  obtenerContactos: jest.fn(),
}));

describe("Especialista", () => {
  it("Tiene que mostrar el indicador de carga mientras se obtienen los datos", () => {
    obtenerContactos.mockResolvedValue([]); // Simula una respuesta vacía

    const { getByText } = render(<Especialista navigation={{}} />);

    // Verifica que el texto de carga se muestra
    expect(getByText("Cargando especialistas...")).toBeTruthy();
  });

  it("Tiene que mostrar la lista de especialistas cuando los datos se cargan correctamente", async () => {
    const mockEspecialistas = [
      { id: "1", nombreCom: "Dr. Juan Pérez", especialidad: "Psicología", ciudad: "Ciudad de México", foto: "https://via.placeholder.com/60" },
      { id: "2", nombreCom: "Dra. María López", especialidad: "Psiquiatría", ciudad: "Monterrey", foto: "https://via.placeholder.com/60" },
    ];

    obtenerContactos.mockResolvedValue(mockEspecialistas);

    const { getByText } = render(<Especialista navigation={{}} />);

    // Espera a que los datos se muestren
    await waitFor(() => {
      expect(getByText("Dr. Juan Pérez")).toBeTruthy();
      expect(getByText("Dra. María López")).toBeTruthy();
    });
  });

  it("Tiene que navegar a la pantalla de detalle cuando se presiona un especialista", async () => {
    const mockNavigate = jest.fn();
    const mockEspecialistas = [
      { id: "1", nombreCom: "Dr. Juan Pérez", especialidad: "Psicología", ciudad: "Ciudad de México", foto: "https://via.placeholder.com/60" },
    ];

    obtenerContactos.mockResolvedValue(mockEspecialistas);

    const { getByText } = render(<Especialista navigation={{ navigate: mockNavigate }} />);

    // Espera a que los especialistas se carguen
    await waitFor(() => {
      const item = getByText("Dr. Juan Pérez");
      fireEvent.press(item);
    });

    // Verifica que la navegación se ha realizado
    expect(mockNavigate).toHaveBeenCalledWith("DetalleEspecialista", { especialista: mockEspecialistas[0] });
  });
});
