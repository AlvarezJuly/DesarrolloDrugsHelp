// TestScreen.js - Vista y Controlador
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { obtenerPreguntasTest, guardarRespuestasTest } from '../../../services/EvaluaTestFunciones'; // funciones del Modelo
import QuestionCard from '../../../components/QuestionCard';
import { FontAwesome } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';

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
        const listaPreguntas = await obtenerPreguntasTest();
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

    try {
      await guardarRespuestasTest(user.uid, answers);
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
  const isAgeQuestion = currentQuestion?.question.toLowerCase().includes("edad");

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
//Comieza la vista
  return (
    <View style={styles.container}>
      <View style={styles.conText}>
        <View style={styles.contTitulo}>
          <Image source={require('../../../assets/icons/compromiso.png')} style={styles.imag} />
        </View>
        <View style={styles.contTitulo}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 35 }}>Test Evaluativo</Text>
          <Text style={styles.titulo}>
            Estamos aquí para ayudarte. Completa este Test para evaluar tu condición, contesta con toda sinceridad y confianza.
          </Text>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#84B6F4',
    borderRadius: 50,
    marginVertical:30,
    paddingHorizontal:60,
    paddingVertical:10,
    backgroundColor: '#A7D8DE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 22,
    fontWeight: '10',
    color: '#000',
  },
  contTitulo:{
    padding:10,
    justifyContent: 'center',
  },
  imag:{
    width: 100,
    height: 90,
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
