import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { obtenerContactos } from "../../../services/MoReha/AsistenciaFunciones";
import CardEspecialista from "../../../components/CardEspecialista";

const Especialista = ({ navigation }) => {
  const [especialistas, setEspecialistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const getEspecialistas = async () => {
          try {
              setLoading(true);
              const data = await obtenerContactos();
              setEspecialistas(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };
      getEspecialistas();
  }, []);

  const handleChatRequest = async (especialista) => {
      try {
          await enviarSolicitudChat(especialista);
          Alert.alert("Solicitud enviada", "Se ha enviado tu solicitud al especialista.");
      } catch (error) {
          Alert.alert("Error", "Hubo un problema al enviar la solicitud.");
          console.error(error);
      }
  };

  if (loading) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Cargando especialistas...</Text>
          </View>
      );
  }

  if (error) {
      return (
          <View style={styles.container}>
              <Text style={styles.errorText}>Error: {error}</Text>
          </View>
      );
  }

  if (especialistas.length === 0) {
      return (
          <View style={styles.container}>
              <Text style={styles.emptyText}>No hay especialistas disponibles en este momento.</Text>
          </View>
      );
  }

  return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Lista de especialistas disponibles</Text>
          <FlatList
              data={especialistas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <CardEspecialista
                      especialista={item}
                      onPress={() => navigation.navigate("DetalleEspecialista", { especialista: item })}
                      onChatRequest={() => handleChatRequest(item)}
                  />
              )}
          />
          <View style={styles.footer}></View> 
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: "#84B6F4",
  },

  titulo:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin:10
  },

  loadingText: {
      fontSize: 16,
      textAlign: "center",
      marginVertical: 20,
  },
  errorText: {
      fontSize: 16,
      color: "red",
      textAlign: "center",
      marginVertical: 20,
  },
  emptyText: {
      fontSize: 16,
      textAlign: "center",
      marginVertical: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#A7D8DE',
    zIndex: 1, // por encima de otros elementos
  }
});

export default Especialista;