import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CardEspecialista = ({ especialista, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Imagen del especialista */}
            <Image
                source={{ uri: especialista.foto }}
                style={styles.image}
            />

            {/* Contenedor de la información */}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{especialista.nombreCom || "Nombre no disponible"}</Text>
                <Text style={styles.specialty}>{especialista.especialidad || "Especialidad no disponible"}</Text>
                <Text style={styles.city}>{especialista.ciudad || "Ciudad no especificada"}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row", // Alinea los elementos (imagen e información) en filas
        backgroundColor: "#EDEAE0",
        marginVertical: 8,
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        alignItems: "center", // Centra verticalmente el contenido
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15, // Espaciado entre la imagen y el texto
    },
    infoContainer: {
        flex: 1, // Permite que el contenedor de texto ocupe todo el espacio restante
        justifyContent: "center", // Centra el texto verticalmente
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    specialty: {
        fontSize: 14,
        color: "#007AFF",
        marginBottom: 3,
    },
    city: {
        fontSize: 12,
        color: "#888",
    },
});

export default CardEspecialista;
