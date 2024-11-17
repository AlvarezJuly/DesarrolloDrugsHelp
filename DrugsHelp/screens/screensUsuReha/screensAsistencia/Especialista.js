import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';
import CardEspecialista from '../../../components/CardEspecialista';
import { obtenerContactos } from '../../../services/AsistenciaFunciones';

const Especialista = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactosList = await obtenerContactos();
        setContactos(contactosList);
      } catch (error) {
        console.error("Error al obtener contactos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Cargando contactos...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.encabezado}>Lista de Especialistas</Text>
      <ScrollView>
        <FlatList
          data={contactos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CardEspecialista contacto={item} />}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f3fb',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  encabezado: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
  list: {
    paddingBottom: 16,
  },
});

export default Especialista;
