import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { fetchArticulos, fetchTecnicasRelax, fetchEjercicios, fetchAlimentacion } from '../../../services/ModelAI';
import { obtenerGuia, guardarGuiaEnFirebase, obtenerVideoRelacionado } from '../../../services/MoReha/RutaFunciones';
import { ProgressBar } from 'react-native-paper';
import { obtenerProgresoSemanal, actualizarProgreso } from '../../../services/MoReha/ProgresFunciones';

export default function RutaAutocuidado({ route, navigation }) {
  const diagnosticData = route.params?.diagnosticData;
  const userId = route.params?.userId || diagnosticData?.userId;
  const [loading, setLoading] = useState(true);
  const [guia, setGuia] = useState({
    articulosCientificos: [],
    tecnicasRelax: [],
    rutinasEjercicio: [],
    alimentacionSaludable: [],
    videoRelacionado: null
  });
  
  const [progress, setProgress] = useState(0); // Progreso general
  const [weeklyProgress, setWeeklyProgress] = useState(0); // Progreso semanall

  // Función para verificar si ya existe una guía guardada o generar una nueva
  useEffect(() => {
    const verificarGuia = async () => {
      try {
        setLoading(true);

        if (!userId) {
          console.error("Error: userId es undefined. No se puede continuar sin un userId.");
          return;
        }

        // Intentar obtener una guía existente
        const guiaExistente = await obtenerGuia(userId);

        if (guiaExistente) {
          console.log("Guía existente cargada desde Firebase.");
          setGuia(guiaExistente); // Cargar guía en el estado
        } else if (diagnosticData) {
          console.log("No se encontró una guía guardada. Generando una nueva guía.");
          await generarNuevaGuia();
        } else {
          Alert.alert(
            "Guía de Autocuidado",
            "Primero debes completar el test para generar tu guía de autocuidado. ¿Quiéres realizar el test ahora?",
            [
              { text: "Cancelar", style: "cancel", onPress: () => navigation.goBack() },
              { text: "OK", onPress: () => navigation.replace('EvaluaTest') }
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error("Error al verificar la guía:", error);
      } finally {
        setLoading(false);
      }
    };

    verificarGuia();
  }, [userId, diagnosticData]);

  // Función para generar una nueva guía con los datos del diagnóstico
  const generarNuevaGuia = async () => {
    try {
      if (!diagnosticData) {
        console.error("No hay datos de diagnóstico disponibles para generar una guía.");
        return;
      }

      const { age, sex, substance, frequency, reason } = diagnosticData;

      const articulos = await fetchArticulos({ age, sex, substance, frequency, reason }) || [];
      const tecnicas = await fetchTecnicasRelax({ age, sex, substance, frequency, reason }) || [];
      const ejercicios = await fetchEjercicios({ age, sex, substance, frequency, reason }) || [];
      const alimentacion = await fetchAlimentacion({ age, sex, substance, frequency, reason }) || [];
      const videoRelacionado = await obtenerVideoRelacionado(substance);

      const nuevaGuia = {
        articulosCientificos: articulos,
        tecnicasRelax: tecnicas,
        rutinasEjercicio: ejercicios,
        alimentacionSaludable: alimentacion,
        videoRelacionado: videoRelacionado
      };

      setGuia(nuevaGuia);

      console.log("Guardando la nueva guía en Firebase...");
      await guardarGuiaEnFirebase(userId, nuevaGuia);

      console.log("Nueva guía generada y guardada correctamente.");
    } catch (error) {
      console.error("Error al generar la nueva guía de autocuidado:", error);
    }
  };

// Función para actualizar el progreso después de completar una actividad
const actualizarProgresoTarea = async (nuevoProgreso) => {
  try {
    // Actualizar el progreso en Firebase
    await actualizarProgreso(userId, nuevoProgreso);

    // Actualizar el estado local de progreso semanal
    setWeeklyProgress(nuevoProgreso);

    console.log("Progreso actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar el progreso:", error);
  }
};

  if (loading) {
    return <ActivityIndicator  size="large" color="#0000ff" testID="loading-indicator" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Progreso Semanal</Text>
        <ProgressBar progress={weeklyProgress / 100} color="#4caf50" style={styles.progressBar} />
        <Text style={styles.progressText}>{weeklyProgress}% completado</Text>

      <Text style={styles.title}>Guía de Autocuidado</Text>
      <ScrollView>
        {guia.articulosCientificos.length > 0 && (
          <TouchableOpacity
            testID="category-button"
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.articulosCientificos, tipo: 'articulo' })}
          >
            <Image source={require('../../../assets/icons/articulos.png')} style={styles.icon} />
            <Text style={styles.cardText}>Artículos Científicos</Text>
          </TouchableOpacity>
        )}
        {guia.videoRelacionado && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: [guia.videoRelacionado], tipo: 'video' })}
          >
            <Image source={require('../../../assets/icons/videoF.png')} style={styles.icon} />
            <Text style={styles.cardText}>Videos</Text>
          </TouchableOpacity>
        )}
        {guia.tecnicasRelax.length > 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.tecnicasRelax, tipo: 'tecnica' })}
          >
            <Image source={require('../../../assets/icons/relax.png')} style={styles.icon} />
            <Text style={styles.cardText}>Técnicas de Relajación</Text>
          </TouchableOpacity>
        )}
        {guia.rutinasEjercicio.length > 0 && (
          <TouchableOpacity
           testID="category-button1"
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.rutinasEjercicio, tipo: 'rutina' })}
          >
            <Image source={require('../../../assets/icons/ejercicio.png')} style={styles.icon} />
            <Text style={styles.cardText}>Rutinas de Ejercicio</Text>
          </TouchableOpacity>
        )}
        {guia.alimentacionSaludable.length > 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.alimentacionSaludable, tipo: 'alimentacion' })}
          >
            <Image source={require('../../../assets/icons/alimentacion.png')} style={styles.icon} />
            <Text style={styles.cardText}>Guías de Alimentación Saludable</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#84B6F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  divisionContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
