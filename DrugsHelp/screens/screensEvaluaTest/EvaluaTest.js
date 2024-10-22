import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Credenciales'; // Asegúrate de tener la configuración de Firebase
import QuestionCard from '../../components/QuestionCard';

const TestScreen = () => {
  const [questions, setQuestions] = useState([]); // Llamar las preguntas de la base de datos
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0); // Navegar entre las preguntas
  const [answers, setAnswers] = useState([]); // Guardar las respuestas
  const [loading, setLoading] = useState(true); // Verificar la carga de la app
  const [testId, setTestId] = useState(null); // Guardar el testId

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test'));
        let listaPreguntas = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const captestId = doc.id; // Captura el testId del documento
          if (!testId) setTestId(captestId); // Guarda el testId si aún no está definido
          if (data.Preguntas && Array.isArray(data.Preguntas)) {
            data.Preguntas.forEach((pregunta) => {
              listaPreguntas.push({
                testId: captestId, // Incluye el testId en cada pregunta
                preguntaId: pregunta.preguntaId,
                question: pregunta.pregTex,
                options: pregunta.Opciones || [],
              });
            });
          }
        });
        setQuestions(listaPreguntas);
        setLoading(false);
      } catch (error) {
        console.error("Error al llamar el test: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, { question: questions[preguntaActualIndex].question, answer }];
    setAnswers(newAnswers);

    if (preguntaActualIndex < questions.length - 1) {
      setPreguntaActualIndex(preguntaActualIndex + 1);
    } else {
      console.log('Respuestas:', newAnswers);
      // Guardar los datos
      try {
        const auth = getAuth();
        const user = auth.currentUser; // Obtener el usuario autenticado
        if (!user) {
          console.error('No hay usuario autenticado');
          return;
        }
        const userId = user.uid; // Obtener el UID del usuario autenticado
        if (!testId) {
          console.error('No se encontró testId');
          return;
        }
        const responseObject = {
          testId: testId,
          userId: userId,
          responses: newAnswers,
          createdAt: new Date(), // Añadir fecha de creación
        };
        // Guarda el objeto en la colección 'test_Comp'
        await addDoc(collection(db, 'test_Comp'), responseObject);
        console.log('Respuestas guardadas correctamente');
      } catch (error) {
        console.error('Error al guardar el usuario o las respuestas:', error);
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="short" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <QuestionCard
          question={questions[preguntaActualIndex].question}
          options={questions[preguntaActualIndex].options}
          onAnswer={handleAnswer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#84B6F4',
  },
});

export default TestScreen;
