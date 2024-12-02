import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const QuestionCard = ({ question, options = [], onNext, isAgeQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ageInput, setAgeInput] = useState('');
  const [error, setError] = useState('');

  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleAgeInput = (text) => {
    const age = parseInt(text, 10);
    if (!isNaN(age) && age >= 16 && age <= 99) {
      setAgeInput(text);
      setError('');
    } else {
      setAgeInput(text);
      setError('La edad debe estar entre 16 y 99 años');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.containerQuestion}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      
      {isAgeQuestion ? (
        <>
          <TextInput
            testID="age-input"
            style={styles.ageInput}
            placeholder="Ingresa tu edad"
            keyboardType="numeric"
            value={ageInput}
            onChangeText={handleAgeInput}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </>
      ) : (
        options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelect(option)}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOptionButton,
            ]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))
      )}

      {/* Botón Siguiente */}
      <View style={styles.botonSiguienteContenedor}>
        <TouchableOpacity
          onPress={() => onNext(isAgeQuestion ? ageInput : selectedAnswer)}
          style={styles.botonSiguiente}
          disabled={isAgeQuestion && (!ageInput || error) || (!isAgeQuestion && !selectedAnswer)}
        >
          <Text style={styles.botonTexto}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EDEAE0',
    padding: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#EDEAE0',
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  containerQuestion: {
    padding: 10,
    margin: 5,
    marginBottom: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002E46',
  },
  optionButton: {
    backgroundColor: '#A7D8DE',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#84B6F4',
    borderColor: '#84B6F4',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  ageInput: {
    width: '100%',
    padding: 15,
    borderColor: '#002E46',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  botonSiguienteContenedor: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  botonSiguiente: {
    backgroundColor: '#002E46',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestionCard;
