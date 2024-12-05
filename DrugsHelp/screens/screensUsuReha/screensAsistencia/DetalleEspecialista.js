import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import { enviarSolicitudChat, obtenerEstadoSolicitud } from "../../../services/MoReha/AsistenciaFunciones"; // Asegúrate de que las funciones están correctamente importadas
import { getAuth } from "firebase/auth"; // Importamos Firebase Authentication para obtener el usuario actual

const DetalleEspecialista = ({ route, navigation }) => {
  const { especialista } = route.params || {}; // Obtenemos los datos del especialista desde los parámetros de navegación
  const [estadoSolicitud, setEstadoSolicitud] = useState(null);  // Estado de la solicitud (pendiente o aceptada)
  const [usuarioId, setUsuarioId] = useState(null);  // Estado para almacenar el ID del usuario autenticado

  // Función para obtener el estado de la solicitud
  const verificarEstadoSolicitud = async () => {
    try {
      if (especialista && especialista.id && usuarioId) {
        const estado = await obtenerEstadoSolicitud(usuarioId, especialista.id); // Obtenemos el estado para este especialista en específico
        setEstadoSolicitud(estado);  // Establecemos el estado de la solicitud
      }
    } catch (error) {
      console.error("Error al obtener el estado de la solicitud:", error);
    }
  };

  // useEffect para cargar el ID del usuario actual y verificar el estado de la solicitud
  useEffect(() => {
    const auth = getAuth();
    const usuarioActual = auth.currentUser;

    if (usuarioActual) {
      setUsuarioId(usuarioActual.uid);  // Guardamos el ID del usuario autenticado
    }

    if (especialista) {
      verificarEstadoSolicitud();  // Verificamos el estado de la solicitud cuando tenemos el especialista y el usuario
    }
  }, [especialista, usuarioId]);

  // Función para enviar la solicitud de chat
  const handleChatRequest = async () => {
    try {
      if (!usuarioId) {
        throw new Error("Usuario no autenticado");
      }
      await enviarSolicitudChat(especialista);  // Enviamos la solicitud de chat
      Alert.alert("Solicitud enviada", "Tu solicitud de chat ha sido enviada al especialista.");
      setEstadoSolicitud("pendiente");  // Actualizamos el estado de la solicitud a pendiente
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Alert.alert("Error", "Hubo un problema al enviar tu solicitud. Intenta nuevamente.");
    }
  };

  // Función para iniciar el chat
  const handleIniciarChat = () => {
    if (estadoSolicitud === "aceptada") {
      navigation.navigate("ChatUser", { especialistaId: especialista.id });
    } else {
      Alert.alert("Espera la aceptación", "El especialista aún no ha aceptado tu solicitud.");
    }
  };

  // Si no se ha encontrado un especialista, mostrar un mensaje de error
  if (!especialista) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se pudo cargar la información del especialista.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Foto del especialista */}
        <Image source={{ uri: especialista.foto }} style={styles.image} />

        {/* Nombre del especialista */}
        <Text style={styles.name}>{especialista.nombreCom}</Text>

        {/* Información básica */}
        <Text style={styles.specialty}>{especialista.especialidad}</Text>
        <Text style={styles.email}>{especialista.correo}</Text>

        {/* Descripción */}
        <Text style={styles.description}>{especialista.descripcion}</Text>
      </ScrollView>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        {estadoSolicitud === null && (
          <TouchableOpacity onPress={handleChatRequest} style={styles.button}>
            <Text style={styles.buttonText}>Solicitar Chat</Text>
          </TouchableOpacity>
        )}
        {estadoSolicitud === "pendiente" && (
          <Text style={styles.statusText}>Solicitud pendiente...</Text>
        )}
        {estadoSolicitud === "aceptada" && (
          <TouchableOpacity onPress={handleIniciarChat} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Chat</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 18,
    color: "gray",
  },
  email: {
    fontSize: 16,
    color: "blue",
  },
  description: {
    fontSize: 16,
    color: "black",
    marginTop: 8,
  },
  buttonsContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  statusText: {
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default DetalleEspecialista;
