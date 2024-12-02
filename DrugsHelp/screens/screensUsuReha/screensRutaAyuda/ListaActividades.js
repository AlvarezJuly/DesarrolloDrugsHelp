import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Video } from 'expo-av';


export default function ListaActividades({ route }) {
  const { data, tipo } = route.params;
  const [validData, setValidData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (typeof data === 'string') {
      try {
        const jsonStart = data.indexOf('[');
        const jsonEnd = data.lastIndexOf(']') + 1;
        const jsonString = data.substring(jsonStart, jsonEnd);
        const parsedData = JSON.parse(jsonString);
        setValidData(parsedData); 
      } catch (e) {
        console.log("No se pudo parsear el JSON. Mostrando texto directamente.");
        setValidData([{ titulo: data }]);
        setErrorMessage("Error al procesar los datos. Mostrando contenido como texto.");
      }
    } else if (Array.isArray(data)) {
      setValidData(data.map(item => ({ ...item, completada: false })));  // Añadir campo completada
    } else {
      setErrorMessage("Los datos no tienen el formato esperado.");
    }
  }, [data]);

  if (validData.length === 0 && !errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>No hay actividades disponibles en este momento.</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{errorMessage}</Text>
      </View>
    );
  }

    // Función para manejar cuando se marca una tarea como completada
    const marcarComoCompletada = (id) => {
      setValidData(prevState => 
        prevState.map(item => 
          item.id === id ? { ...item, completada: true } : item
        )
      );
    };
  

  const renderItem = ({ item }) => {
    const marcarComoCompletado = async () => {
      // Actualizamos la tarea como completada en el estado local
      setValidData((prevData) => {
        return prevData.map((actividad) =>
          actividad.id === item.id ? { ...actividad, completada: true } : actividad
        );
      });
      // Ahora debemos actualizar el progreso del usuario
      // Llamamos a la función de RutaAutocuidado para actualizar el progreso (suponiendo que la función se pasa como prop)
      if (typeof route.params.actualizarProgreso === 'function') {
        await route.params.actualizarProgreso(10); // Ajusta el incremento del progreso según lo que necesites (ej. 10% por tarea completada)
      }
    };

    switch (tipo) {
      case 'articulo':
        return (
          <View style={[styles.activityCard, styles.enlargedCard]}>
            <Text style={styles.activityTitle}>{item.titulo || "Artículo sin título"}</Text>
            <Text style={styles.activityDescription}>{item.descripcion || "Sin descripción disponible"}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.linkText}>Leer artículo completo</Text>
            </TouchableOpacity>
           {/* Botón para marcar como completado */}
              <TouchableOpacity style={styles.completeButton} onPress={marcarComoCompletado}>
            <Text style={styles.completeButtonText}>Marcar como completado</Text>
          </TouchableOpacity>
          </View>
        );
      case 'tecnica':
      case 'rutina':
        return (
          <View style={[styles.activityCard, styles.enlargedCard]}>
            <Text style={styles.activityTitle}>{item.titulo}</Text>
            <Text style={styles.activityDescription}>{item.descripcion}</Text>
            {item.pasos && item.pasos.length > 0 && (
              <>
                <Text style={styles.stepsTitle}>Pasos:</Text>
                {item.pasos.map((paso, index) => (
                  <Text key={index} style={styles.stepText}>{index + 1}. {paso}</Text>
                ))}
              </>
            )}
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.completeButtonText}>Marcar como completado</Text>
            </TouchableOpacity>
          </View>
        );
      case 'alimentacion':
        return (
          <View style={[styles.activityCard, styles.enlargedCard]}>
            <Text style={styles.activityTitle}>{item.titulo}</Text>
            <Text style={styles.activityDescription}>{item.descripcion}</Text>
            {item.alimentos && item.alimentos.length > 0 && (
              <>
                <Text style={styles.foodListTitle}>Alimentos recomendados:</Text>
                {item.alimentos.map((alimento, index) => (
                  <Text key={index} style={styles.foodItemText}>- {alimento}</Text>
                ))}
              </>
            )}
            <TouchableOpacity style={styles.completeButton}>
              <Text style={styles.completeButtonText}>Marcar como completado</Text>
            </TouchableOpacity>
          </View>
        );
        case 'video':
          return (
            <View style={styles.activityCard}>
              <Text style={styles.activityTitle}>{item.titulo || 'Video sin título'}</Text>
              <Video
                source={{ uri: item.videoUrl }}
                style={styles.video}
                useNativeControls
                resizeMode="contain"
                shouldPlay={true}
                onFullscreenUpdate={async ({ fullscreenUpdate }) => {
                  if (fullscreenUpdate === 0) { // FULLSCREEN_WILL_PRESENT
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
                  } else if (fullscreenUpdate === 3) { // FULLSCREEN_DID_DISMISS
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
                  }
                }}
              />
              <TouchableOpacity style={styles.completeButton}>
                <Text style={styles.completeButtonText}>Marcar como completado</Text>
              </TouchableOpacity>
            </View>
          );
        default:
          return null;
      }
    };

  return (
    <View style={styles.container}>
      <FlatList
        data={validData}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  activityCard: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  enlargedCard: {
    padding: 24,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activityDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepText: {
    fontSize: 14,
    marginBottom: 2,
  },
  foodListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  foodItemText: {
    fontSize: 14,
    marginBottom: 2,
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  completeButton: {
    backgroundColor: 'orange',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: 'green', // Cambia el color si está completado
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#f00',
    marginTop: 8,
  },
  linkText: {
    color: '#007bff',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});
