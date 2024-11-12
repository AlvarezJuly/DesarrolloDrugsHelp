import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { db } from '../../services/CredencialesFirebase'; // Asegúrate de importar Firestore
import { collection, getDocs } from 'firebase/firestore';

export default function GestionApp() {
  const [collectionsData, setCollectionsData] = useState({
    contactos: [],
    diag_test: [],
    test: [],
    user: [],
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        // Obtener datos de la colección 'contactos'
        const contactosSnapshot = await getDocs(collection(db, 'contactos'));
        const contactosList = contactosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Obtener datos de la colección 'diag_test'
        const diagTestSnapshot = await getDocs(collection(db, 'diag_test'));
        const diagTestList = diagTestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Obtener datos de la colección 'test'
        const testSnapshot = await getDocs(collection(db, 'test'));
        const testList = testSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Obtener datos de la colección 'user'
        const usersSnapshot = await getDocs(collection(db, 'user'));
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setCollectionsData({
          contactos: contactosList,
          diag_test: diagTestList,
          test: testList,
          user: usersList,
        });
      } catch (error) {
        console.error('Error al obtener las colecciones:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestiónde Datos</Text>

      {/* Colección de Usuarios */}
      <Card style={styles.card}>
        <Card.Title title="Usuarios" />
        <Card.Content>
          <Title>Total: {collectionsData.user.length}</Title>
          {collectionsData.user.map((item) => (
            <View key={item.id} style={styles.dataRow}>
              <Paragraph>ID: {item.id}</Paragraph>
              <Paragraph>Nombre: {item.name}</Paragraph>
              <Paragraph>Correo: {item.email}</Paragraph>
              <Paragraph>Rol: {item.role}</Paragraph>
              <Paragraph>Creado: {item.createdAt ? item.createdAt.toDate().toLocaleString() : 'N/A'}</Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Colección de Especialistas */}
      <Card style={styles.card}>
        <Card.Title title="Especialistas" />
        <Card.Content>
          <Title>Total: {collectionsData.contactos.length}</Title>
          {collectionsData.contactos.map((item) => (
            <View key={item.id} style={styles.dataRow}>
              <Paragraph>ID: {item.id}</Paragraph>
              <Paragraph>Nombre: {item.nombreCom}</Paragraph>
              <Paragraph>Correo: {item.correo}</Paragraph>
              <Paragraph>Ciudad: {item.ciudad}</Paragraph>
              <Paragraph>Número: {item.numero}</Paragraph>
              <Paragraph>Rol: {item.role}</Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Colección de Test Evaluativos */}
      <Card style={styles.card}>
        <Card.Title title="Diagnósticos" />
        <Card.Content>
          <Title>Total: {collectionsData.diag_test.length}</Title>
          {collectionsData.diag_test.map((item) => (
            <View key={item.id} style={styles.dataRow}>
              <Paragraph>ID: {item.id}</Paragraph>
              <Paragraph>Respuestas:</Paragraph>
              {item.answers && item.answers.map((answer, index) => (
                <View key={index}>
                  <Paragraph>{answer.question}: {answer.answer}</Paragraph>
                </View>
              ))}
              <Paragraph>Fecha: {item.timestamp ? item.timestamp.toDate().toLocaleString() : 'N/A'}</Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Colección de Preguntas de Test */}
      <Card style={styles.card}>
        <Card.Title title="Tests" />
        <Card.Content>
          <Title>Total: {collectionsData.test.length}</Title>
          {collectionsData.test.map((item) => (
            <View key={item.id} style={styles.dataRow}>
              <Paragraph>ID: {item.id}</Paragraph>
              {item.Preguntas && item.Preguntas.map((pregunta, index) => (
                <View key={index}>
                  <Paragraph>{pregunta.pregText}</Paragraph>
                  {pregunta.Opciones && pregunta.Opciones.map((opcion, optIndex) => (
                    <Paragraph key={optIndex}>- {opcion}</Paragraph>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#84B6F4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
  },
  dataRow: {
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
  },
});
