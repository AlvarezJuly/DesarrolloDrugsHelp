import React, { useState, useEffect } from 'react'; 
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../Credenciales';
import QuestionCard from '../../components/QuestionCard';
import { FontAwesome } from '@expo/vector-icons';

const TestScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [preguntaActualIndex, setPreguntaActualIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false); // Estado para saber si el test está completo
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test'));
        let listaPreguntas = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.Preguntas && Array.isArray(data.Preguntas)) {
            data.Preguntas.forEach((pregunta) => {
              listaPreguntas.push({
                preguntaId: pregunta.preguntaId,
                question: pregunta.pregTex,
                options: pregunta.Opciones || [],
              });
            });
          }
        });
        setQuestions(listaPreguntas);
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleNext = (answer) => {
    const newAnswers = [...answers, { question: questions[preguntaActualIndex].question, answer }];
    setAnswers(newAnswers);

    if (preguntaActualIndex < questions.length - 1) {
      setPreguntaActualIndex(preguntaActualIndex + 1);
    } else {
      saveTestResults(newAnswers);
      setTestCompleted(true);
    }
  };

  const saveTestResults = async (answers) => {
    if (!user) {
      console.error("No hay usuario autenticado");
      alert("Por favor, inicia sesión antes de completar el test.");
      return;
    }

    const userId = user.uid;

    try {
      await addDoc(collection(db, 'diag_test'), {
        userId: userId,
        answers: answers,
        timestamp: new Date()
      });
      console.log("Respuestas guardadas correctamente");
    } catch (error) {
      console.error("Error al guardar el test completado:", error);
      alert("Hubo un error al guardar las respuestas. Inténtalo de nuevo.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const currentQuestion = questions[preguntaActualIndex];
  const isAgeQuestion = currentQuestion.question.toLowerCase().includes("edad");

  if (testCompleted) {
    return (
      <View style={styles.completionContainer}>
        <FontAwesome name="check-circle" size={80} color="#4CAF50" />
        <Text style={styles.completionText}>¡Test Completado!</Text>
        <TouchableOpacity
          style={styles.viewDiagnosisButton}
          onPress={() => navigation.navigate('Diagnostico', { userId: user.uid })}
        >
          <Text style={styles.viewDiagnosisButtonText}>Ver Diagnóstico</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.conText}>
        <Text style={styles.titulo}>Test de Evaluativo, contesta con toda sinceridad y confianza</Text>
      </View>
      
      {questions.length > 0 && (
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onNext={handleNext}
          isAgeQuestion={isAgeQuestion}
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
  conText: {
    marginBottom: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  completionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#84B6F4',
  },
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  viewDiagnosisButton: {
    backgroundColor: '#002E46',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  viewDiagnosisButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TestScreen;
