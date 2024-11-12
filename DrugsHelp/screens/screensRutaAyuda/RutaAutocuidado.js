import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';
import { fetchArticulos, fetchTecnicasRelax, fetchEjercicios, fetchAlimentacion } from '../../services/ModelAI';

export default function RutaAutocuidado({ route, navigation }) {
  const { diagnosticData } = route.params;
  const [guia, setGuia] = useState({
    articulosCientificos: [],
    tecnicasRelax: [],
    rutinasEjercicio: [],
    alimentacionSaludable: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerGuia = async () => {
      try {
        setLoading(true);
        const { age, sex, substance, frequency, reason } = diagnosticData;

        const articulos = await fetchArticulos({ age, sex, substance, frequency, reason }) || [];
        const tecnicas = await fetchTecnicasRelax({ age, sex, substance, frequency, reason }) || [];
        const ejercicios = await fetchEjercicios({ age, sex, substance, frequency, reason }) || [];
        const alimentacion = await fetchAlimentacion({ age, sex, substance, frequency, reason }) || [];

        setGuia({
          articulosCientificos: articulos,
          tecnicasRelax: tecnicas,
          rutinasEjercicio: ejercicios,
          alimentacionSaludable: alimentacion
        });
      } catch (error) {
        console.error("Error al obtener la guía de autocuidado:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerGuia();
  }, [diagnosticData]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruta de Autocuidado</Text>
      <ScrollView>
        {/* Artículos Científicos */}
        {guia.articulosCientificos.length > 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.articulosCientificos, tipo: 'articulo' })}
          >
            <Image source={require('../../assets/icons/tarea.png')} style={styles.icon} />
            <Text style={styles.cardText}>Artículos Científicos</Text>
          </TouchableOpacity>
        )}

        {/* Técnicas de Relajación */}
        {guia.tecnicasRelax.length > 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.tecnicasRelax, tipo: 'tecnica' })}
          >
            <Image source={require('../../assets/icons/tarea.png')} style={styles.icon} />
            <Text style={styles.cardText}>Técnicas de Relajación</Text>
          </TouchableOpacity>
        )}

        {/* Rutinas de Ejercicio */}
        {guia.rutinasEjercicio.length > 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.rutinasEjercicio, tipo: 'rutina' })}
          >
            <Image source={require('../../assets/icons/tarea.png')} style={styles.icon} />
            <Text style={styles.cardText}>Rutinas de Ejercicio</Text>
          </TouchableOpacity>
        )}

        {/* Guías de Alimentación Saludable */}
        {guia.alimentacionSaludable.length > 0 && (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Actividades', { data: guia.alimentacionSaludable, tipo: 'alimentacion' })}
          >
            <Image source={require('../../assets/icons/tarea.png')} style={styles.icon} />
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
