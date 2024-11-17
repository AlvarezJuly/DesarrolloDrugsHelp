import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

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
      setValidData(data);
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

  //para mostrar según sea el caso
  const renderItem = ({ item }) => {
    switch (tipo) {
      case 'articulo':
        return (
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>{item.titulo || "Artículo sin título"}</Text>
            <Text style={styles.activityDescription}>{item.descripcion || "Sin descripción disponible"}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.linkText}>Leer artículo completo</Text>
            </TouchableOpacity>
          </View>
        );
      case 'tecnica':
      case 'rutina':
        return (
          <View style={styles.activityCard}>
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
          </View>
        );
      case 'alimentacion':
        return (
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>{item.titulo}</Text>
            <Text style={styles.activityDescription}>{item.descripcion}</Text>
            {item.alimentos && item.alimentos.length > 0 && (
              <>
                <Text style={styles.foodListTitle}>Alimentos recomendados:</Text>
                {item.alimentos.map((alimento, index) => (
                  <Text key={index} style={styles.foodText}>- {alimento}</Text>
                ))}
              </>
            )}
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
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Actividades</Text>
      <FlatList
        data={validData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84B6F4',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  activityDescription: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#495057',
    marginLeft: 10,
    marginTop: 2,
  },
  foodListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  foodText: {
    fontSize: 14,
    color: '#495057',
    marginLeft: 10,
    marginTop: 2,
  },
  video: {
    width: '100%',
    height: 200,
  },
});
