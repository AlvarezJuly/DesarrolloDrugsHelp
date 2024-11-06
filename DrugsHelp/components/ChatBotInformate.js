import React, { useEffect, useState, useRef } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons' // Importación del icono de Ionicons

const ChatBotInformate = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const chatboxRef = useRef(null);
  const apiKey = 'AIzaSyBeDBHpgk4AB1XsnShIGnzSar5v0iPBYVY'; 

  const getAIResponse = async (userInput) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    try {
      const prompt = `
        Eres JuJo, un chatbot especializado en ayudar a las personas a entender los efectos de las drogas en el cuerpo y la mente, y a proporcionar apoyo y recursos para dejar el consumo de drogas.
        El usuario ha dicho: "${userInput}".
        Responde presentandote y  muestra de manera detallada y coherente la respuesta de la consulta del usuario, ofreciendo apoyo y soluciones para dejar el consumo de drogas.
        Recuerda que si te preguntan acerca de otra cosa que no tenga que ver con el tema, recuerdales el para que estas
      `;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lo siento, hubo un problema al obtener la respuesta.';
      return aiText;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return 'Lo siento, hubo un problema al obtener la respuesta.';
    }
  };

  const conversacion = async () => {
    try {
      const Usuario = {
        user: 'Tú',
        message: input,
        type: 'user',
      };

      const botResponse = await getAIResponse(input);

      const bot = {
        user: 'JuJo_Informa',
        message: botResponse,
        type: 'bot',
      };

      setConversation((prevConversation) => [...prevConversation, Usuario, bot]);
      setInput(''); // Limpiar el input
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      setTimeout(() => {
        chatboxRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation]);

  return (
    <View style={styles.container}>
      <View style={styles.efecto}>
        <View style={styles.title}>
          <Text style={styles.titulo}>¡Hola y bienvenido!</Text>
          <Text style={styles.titulo}>Yo soy JuJo</Text>
          <View style={styles.separador} />
        </View>
        <View style={styles.fondoImage}>
          <Image
            source={require('../assets/icons/botJujo.png')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.chatContainer}>
        <ScrollView
          ref={chatboxRef}
          style={styles.chatBody}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {conversation.map((message, index) => (
            <View key={index} style={message.type === 'user' ? styles.userMessage : styles.botMessage}>
              <Text style={styles.messageUser}>{message.user}: </Text>
              <Text style={styles.mes}>{message.message}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.chatFooter}>
          <TextInput
            style={styles.inputChat}
            value={input}
            placeholder="Pregunta algo..."
            onChangeText={setInput}
            placeholderTextColor="white"
          />
          <TouchableOpacity style={styles.btnSend} onPress={conversacion}>
            <Ionicons name="send-sharp" size={30} color="#002E46" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84B6F4',
  },
  efecto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023E8A',
  },
  separador: {
    height: 1,
    width: '80%',
    backgroundColor: '#023E8A',
    marginVertical: 10,
  },
  fondoImage: {
    marginTop: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 10,
    backgroundColor: '#84B6F4',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 10,
  },
  chatBody: {
    maxHeight: 700,
  },
  chatContent: {
    padding: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#90E0EF',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#0077B6',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  messageUser: {
    fontWeight: 'bold',
    color: '#fff',
  },
  mes: {
    color: '#fff',
  },
  chatFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#A7D8DE',
    borderRadius: 3,
    elevation: 4,
  },
  inputChat: {
    flex: 1,
    borderRadius: 20,
    borderColor: '#002E46',
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  btnSend: {
    borderColor: '#002E46',
    borderWidth: 2.2,
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
});

export default ChatBotInformate;
