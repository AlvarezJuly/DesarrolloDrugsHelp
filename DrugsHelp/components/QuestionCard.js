import React from 'react';  
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionCard = ({ question, options, onAnswer }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onAnswer(option)}
          style={styles.optionButton}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EDEAE0',
    padding: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#002E46',
    elevation: 3,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#002E46', // Cambié el color del texto de la pregunta
  },
  optionButton: {
    backgroundColor: '#002E46',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#002E46',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'white', // Mantiene el texto de las opciones en blanco
  },
});

export default QuestionCard;
