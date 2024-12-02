import React from "react"; 
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import { enviarSolicitudChat } from "../../../services/MoReha/AsistenciaFunciones"; // Función para solicitar el chat

const DetalleEspecialista = ({ route }) => {
    const { especialista } = route.params || {};

    const handleChatRequest = async () => {
        try {
            await enviarSolicitudChat(especialista);
            Alert.alert("Solicitud enviada", "Tu solicitud de chat ha sido enviada al especialista.");
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al enviar tu solicitud. Intenta nuevamente.");
            console.error(error);
        }
    };

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
                <Image
                    testID="image"
                    source={{ uri: especialista.foto }}
                    style={styles.image}
                />

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
                {/* Botón de chat */}
                <TouchableOpacity style={styles.chatButton} onPress={handleChatRequest} testID= "chatButton">
                    <Text style={styles.chatButtonText}>Solicitud Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F4FF",
    },
    contentContainer: {
        padding: 20,
        alignItems: "center", // Centra todo horizontalmente
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    specialty: {
        fontSize: 18,
        color: "#666",
        textAlign: "center",
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: "#888",
        textAlign: "center",
        marginBottom: 15,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: "#333",
        textAlign: "justify",
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly", // Espaciado uniforme entre los botones
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
    },
    citaButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    citaButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    chatButton: {
        backgroundColor: "#34C759",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    chatButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginVertical: 20,
    },
});

export default DetalleEspecialista;
