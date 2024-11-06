import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, ScrollView } from 'react-native';

export default function RutaAutocuidado({ route, navigation}) {
  const { diagnosticData } = route.params;
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = 'AIzaSyBeDBHpgk4AB1XsnShIGnzSar5v0iPBYVY';

  useEffect(() => {
    const fetchAndGenerateGuide = async () => {
      try {
        const prompt = `
              Usuario de ${diagnosticData.age} años, de género ${diagnosticData.sex}, con hábito de consumo de ${diagnosticData.substance}.
              Frecuencia del consumo: ${diagnosticData.frequency}. Motivo del consumo: ${diagnosticData.reason}.
              Genera una guía de autocuidado personalizada que incluya recomendaciones específicas en las siguientes categorías:
              - Videos informativos sobre los efectos del ${diagnosticData.substance}, preferiblemente de YouTube.
              - Artículos científicos para un estilo de vida saludable, proporcionando enlaces a fuentes confiables.
              - Técnicas de relajación y manejo de estrés, con descripciones detalladas y pasos.
              - Rutinas de ejercicios para la recuperación, incluyendo ejemplos específicos y demostraciones en video si es posible.
              - Guías de alimentación saludable, con ejemplos de menús y recetas.
              Estructura las recomendaciones para un período de 15 días.
        `;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        });

        const data = await response.json();
        console.log('API Response:', data);  // <-- Añadir este log para depurar

        if (response.ok && data.candidates && data.candidates[0]) {
          console.log('Content:', data.candidates[0].content);  // <-- Añadir este log para ver el contenido
          setGuideData(data.candidates[0].content); // <-- Asegúrate de que esto apunta correctamente a tu data.
        } else {
          const errorMsg = data.error ? data.error.message : "No se pudo generar la guía en este momento.";
          setGuideData(errorMsg);
        }
      } catch (error) {
        console.error("Error al generar la guía de autocuidado:", error);
        setGuideData("Error al generar la guía.");
      } finally {
        setLoading(false);
      }
    };
    
    Alert.alert(
      "Preparado para el proceso de recuperación",
      "¿Deseas continuar?",
      [
        { text: "Cancelar", style: "cancel"},
        { text: "OK", onPress: () => fetchAndGenerateGuide()},
      ]
    );
  }, [diagnosticData]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Guía de Autocuidado</Text>
      {guideData ? (
        <View style={styles.guideContainer}>
          {guideData.parts.map((part, index) => (
            <Text key={index} style={styles.guideText}>{part.text}</Text>
          ))}
        </View>
      ) : (
        <Text style={styles.errorText}>Error al cargar la guía de autocuidado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#002E46',
  },
  guideContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    elevation: 4,
  },
  guideText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
