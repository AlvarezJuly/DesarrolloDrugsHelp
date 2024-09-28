import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Credenciales';
import QuestionCard from '../../components/QuestionCard';

const TestScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'test'));
        let questionsList = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.Preguntas && Array.isArray(data.Preguntas)) {
            data.Preguntas.forEach((pregunta) => {
              questionsList.push({
                preguntaId: pregunta.preguntaId,
                question: pregunta.pregTex,
                options: pregunta.Opciones || [], // Asegúrate de que las opciones existan
              });
            });
          }
        });

        setQuestions(questionsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { question: questions[currentQuestionIndex].question, answer }];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Respuestas:', newAnswers);
      // Aquí puedes guardar las respuestas en Firestore si lo deseas
      
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <QuestionCard
          question={questions[currentQuestionIndex].question}
          options={questions[currentQuestionIndex].options}
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
