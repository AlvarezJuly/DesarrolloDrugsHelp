import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { db } from '../../services/CredencialesFirebase'; // Asegúrate de que tienes la configuración correcta de Firebase
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

export default function ChatRequestsScreen({ navigation }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener solicitudes de chat pendientes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'solicitudes_chat'), where('estado', '==', 'pendiente')),
      (snapshot) => {
        const solicitudesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSolicitudes(solicitudesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error al obtener solicitudes:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Función para aceptar la solicitud
  const aceptarSolicitud = async (solicitudId) => {
    try {
      const solicitudRef = doc(db, 'solicitudes_chat', solicitudId);
      await updateDoc(solicitudRef, { estado: 'aceptada' });  // Cambiar estado a aceptada
      Alert.alert('Solicitud aceptada', 'Has aceptado la solicitud del usuario.');
      navigation.navigate('ChatScreen', { solicitudId });  // Navegar al chat después de aceptar
    } catch (error) {
      console.error('Error al aceptar la solicitud:', error);
      Alert.alert('Error', 'Hubo un problema al aceptar la solicitud. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Cargando solicitudes...</Text>
      ) : solicitudes.length === 0 ? (
        <Text style={styles.noSolicitudesText}>No tienes solicitudes pendientes.</Text>
      ) : (
        <FlatList
          data={solicitudes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.solicitudItem}>
              <Text style={styles.usuarioNombre}>{item.usuarioNombre} ha solicitado un chat</Text>
              <Button
                title="Aceptar solicitud"
                onPress={() => aceptarSolicitud(item.id)}
                color="#28a745" // Color verde para el botón
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  noSolicitudesText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#888',
  },
  solicitudItem: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  usuarioNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
