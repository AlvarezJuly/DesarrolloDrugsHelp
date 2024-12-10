import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const QuestionCard = ({ question, options = [], onNext, isAgeQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ageInput, setAgeInput] = useState('');
  const [error, setError] = useState('');

  // Determinar si el botón "Siguiente" debe estar deshabilitado
  const isNextButtonDisabled = isAgeQuestion
    ? !ageInput || Boolean(error) // Asegura que error se evalúe como booleano
    : !selectedAnswer;

  // Manejar la selección de una opción
  const handleOptionSelect = (option) => {
    setSelectedAnswer(option);
  };

  // Manejar la entrada de la edad
  const handleAgeInput = (text) => {
    // Limitar a caracteres numéricos
    const sanitizedText = text.replace(/[^0-9]/g, '');
    const age = parseInt(sanitizedText, 10);

    if (!isNaN(age) && age >= 16 && age <= 99) {
      setAgeInput(sanitizedText);
      setError('');
    } else {
      setAgeInput(sanitizedText);
      setError('La edad debe estar entre 16 y 99 años');
    }
  };

  return (
    <View style={styles.card}>
      {/* Mostrar la pregunta */}
      <View style={styles.containerQuestion}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      {/* Mostrar entrada de edad o botones de opciones */}
      {isAgeQuestion ? (
        <>
          <TextInput
            style={styles.ageInput}
            placeholder="Ingresa tu edad"
            keyboardType="numeric"
            value={ageInput}
            onChangeText={handleAgeInput}
            maxLength={2} // Limitar a 2 caracteres
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
          onPress={() => {
            const valueToSend = isAgeQuestion ? parseInt(ageInput, 10) : selectedAnswer;
            onNext(valueToSend);
          }}
          style={[
            styles.botonSiguiente,
            isNextButtonDisabled && styles.botonSiguienteDeshabilitado,
          ]}
          disabled={isNextButtonDisabled}
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
    color: '#002E46',
  },
  ageInput: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderColor: '#84B6F4',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
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
  botonSiguienteDeshabilitado: {
    backgroundColor: '#B0BEC5',
  },
  botonTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestionCard;
