import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { db } from "../../../services/CredencialesFirebase";  // Firebase config
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";

const ChatScreenUR = ({ route }) => {
    const { solicitudId } = route.params;  // Obtiene el ID de la solicitud
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // Escuchar en tiempo real los mensajes del chat
    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, "chats", solicitudId, "messages"), orderBy("timestamp")),
            (snapshot) => {
                const messagesData = snapshot.docs.map((doc) => doc.data());
                setMessages(messagesData);
                setLoading(false);
            },
            (error) => {
                console.error("Error al obtener mensajes:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();  // Limpiar el listener cuando el componente se desmonta
    }, [solicitudId]);

    // Función para enviar un nuevo mensaje
    const enviarMensaje = async () => {
        if (newMessage.trim()) {
            try {
                await addDoc(collection(db, "chats", solicitudId, "messages"), {
                    text: newMessage,
                    timestamp: new Date(),
                });
                setNewMessage("");  // Limpiar la caja de texto
            } catch (error) {
                console.error("Error al enviar mensaje:", error);
            }
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando chat...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Escribe un mensaje..."
                />
                <Button title="Enviar" onPress={enviarMensaje} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#E8F4FF",
    },
    messageContainer: {
        padding: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 8,
    },
    messageText: {
        fontSize: 16,
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E0E0E0",
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
});

export default ChatScreenUR;
