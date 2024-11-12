import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { db } from '../../services/CredencialesFirebase';
import { collection, getDocs } from 'firebase/firestore';

export default function EstadisticasApp() {
  const [usersCount, setUsersCount] = useState(0);
  const [specialistsCount, setSpecialistsCount] = useState(0);
  const [completedTests, setCompletedTests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'user'));
        setUsersCount(usersSnapshot.size);

        const specialistsSnapshot = await getDocs(collection(db, 'contactos'));
        setSpecialistsCount(specialistsSnapshot.size);

        const testsSnapshot = await getDocs(collection(db, 'diag_test'));
        setCompletedTests(testsSnapshot.size);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estadísticas de la App</Text>

      <Card style={styles.card}>
        <Card.Title title="Usuarios" />
        <Card.Content>
          <Title>Total de Usuarios</Title>
          <Paragraph>{usersCount}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Especialistas" />
        <Card.Content>
          <Title>Total de Especialistas</Title>
          <Paragraph>{specialistsCount}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Test Evaluativos" />
        <Card.Content>
          <Title>Total de Test Completados</Title>
          <Paragraph>{completedTests}</Paragraph>
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
    marginTop:20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
});
