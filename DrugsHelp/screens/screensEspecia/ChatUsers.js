import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { db } from '../../services/CredencialesFirebase'; // Asegúrate de que tienes la configuración correcta de Firebase
import { collection, query, onSnapshot, addDoc, orderBy } from 'firebase/firestore';

export default function ChatScreen({ route }) {
  // Verificar si se recibe el parámetro solicitudId
  const { solicitudId } = route.params || {}; // Si no hay params, asigna un objeto vacío

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!solicitudId) {
      console.error('No se recibió solicitudId.');
      return;
    }

    const unsubscribe = onSnapshot(
      query(collection(db, 'chats', solicitudId, 'messages'), orderBy('timestamp')),
      (snapshot) => {
        const messagesData = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      },
      (error) => console.error('Error al obtener mensajes:', error)
    );

    return () => unsubscribe();
  }, [solicitudId]);

  // Enviar un nuevo mensaje
  const enviarMensaje = async () => {
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'chats', solicitudId, 'messages'), {
        text: newMessage,
        timestamp: new Date(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <View style={styles.container}>
      {messages.length === 0 ? (
        <Text style={styles.noMessagesText}>Aún no hay mensajes en este chat.</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.messageText}>{item.text}</Text>}
        />
      )}
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Escribe un mensaje..."
        style={styles.textInput}
      />
      <Button title="Enviar" onPress={enviarMensaje} color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  noMessagesText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#888',
  },
  messageText: {
    fontSize: 16,
    marginVertical: 5,
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
});
