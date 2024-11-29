import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Importa ProgressBar de React Native Paper
//import { Ionicons } from '@expo/vector-icons';
import { getProgress, updateProgress, getNotes } from '../../../services/MoReha/ProgresFunciones'; // Asegúrate de que esta ruta esté correcta

export default function Progreso({ navigation }) {
  const [completedWeeks, setCompletedWeeks] = useState(0);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(0);
  const [abstinenceDays, setAbstinenceDays] = useState(0);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Cargar los datos desde Firebase
    const loadProgress = async () => {
      const progressData = await getProgress();  // Obtiene el progreso
      if (progressData) {
        setCompletedWeeks(progressData.completedWeeks);
        setCurrentWeekProgress(progressData.currentWeekProgress);
        setAbstinenceDays(progressData.abstinenceDays);
      }

      // Cargar las notas desde Firebase
      const notesData = await getNotes();
      setNotes(notesData);
    };

    loadProgress();
  },[]);

  const incrementAbstinenceDays = async () => {
    const newDays = abstinenceDays + 1;
    setAbstinenceDays(newDays);
    await updateProgress(completedWeeks, currentWeekProgress, newDays); // Actualiza Firebase con el nuevo número de días de abstinencia
  };
  const resetAbstinenceDays = () => {
    setAbstinenceDays(0);
  };

  // Navegar a la pantalla de notas
  const handleGoToNotes = () => {
    navigation.navigate('Notas', { notes }); // Pasa las notas a la pantalla de Notas
  };

  return (
    <View style={styles.container}>
      {/* Progreso Semanal 
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progreso de la Semana</Text>
        <ProgressBar progress={currentWeekProgress / 100} color="#5AC8FA" style={styles.progressBar} />
        <Text style={styles.percentageText}>{currentWeekProgress}% completado</Text>
      </View>
*/}
      {/* Semanas Completadas */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Semanas Completadas</Text>
        <Text style={styles.content}>{completedWeeks} semanas</Text>
      </View>

      {/* Días de Abstinencia */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Días de Abstinencia</Text>
        <View style={styles.cuadroNum}>
        <Text style={styles.num}>{abstinenceDays} días</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.incrementButton} onPress={incrementAbstinenceDays}>
          <Text style={styles.buttonText}>Incrementar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.resetButton} onPress={resetAbstinenceDays}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
      </View>

      {/* Botón para ir a las notas */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={handleGoToNotes}>
          <Text style={styles.buttonText}>Agrega tus notas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84B6F4',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
  cuadroNum:{
    fontSize: 16,
    color: '#333',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 5,
    margin:10,
    marginHorizontal: 100,
    padding:30,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  percentageText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#5AC8FA',
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incrementButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  num:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
