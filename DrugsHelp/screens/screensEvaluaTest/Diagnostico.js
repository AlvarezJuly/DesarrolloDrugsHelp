import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, query, where, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/CredencialesFirebase';

const Diagnostico = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestDiagnosticData = async () => {
      try {
        // Obtener nombre del usuario
        const userDocRef = doc(db, 'user', userId);
        const userDoc = await getDoc(userDocRef);

        let userName = "Usuario desconocido";
        if (userDoc.exists()) {
          userName = userDoc.data().name;
        }

        // Consulta para obtener el último diagnóstico del usuario
        const q = query(
          collection(db, 'diag_test'),
          where('userId', '==', userId),
          orderBy('timestamp', 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();

          const age = docData.answers.find(ans => ans.question.includes("Edad"))?.answer || "No especificada";
          const sex = docData.answers.find(ans => ans.question.includes("Sexo"))?.answer || "No especificada";
          const substance = docData.answers.find(ans => ans.question.includes("sustancia"))?.answer || "No especificada";
          const frequency = docData.answers.find(ans => ans.question.includes("Frecuencia"))?.answer || "No especificada";
          const reason = docData.answers.find(ans => ans.question.includes("Motivos"))?.answer || "No especificado";

          setUserData({ name: userName });
          setDiagnosticData({ age, sex, substance, frequency, reason });
        } else {
          console.error("No se encontró información de diagnóstico");
        }
      } catch (error) {
        console.error('Error al obtener los datos del diagnóstico:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestDiagnosticData();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData || !diagnosticData) {
    return <Text>Error al cargar los datos del usuario.</Text>;
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.saludoContenedor}>
        <Text style={styles.titulo}>Hola, {userData.name}</Text>
        <Text style={styles.subtitulo}>Aquí está tu diagnóstico de adicción</Text>
      </View>

      <View style={styles.contenedorDiagnostico}>
        <View style={styles.tarjeta}>
          <Text style={styles.seccionTitulo}>Datos Generales</Text>
          <View style={styles.fila}>
            <Text style={styles.textoEtiqueta}>Nombre:</Text>
            <Text style={styles.textoValor}>{userData.name}</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.textoEtiqueta}>Edad:</Text>
            <Text style={styles.textoValor}>{diagnosticData.age} años</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.textoEtiqueta}>Sexo:</Text>
            <Text style={styles.textoValor}>{diagnosticData.sex}</Text>
          </View>
        </View>

        <View style={styles.tarjeta}>
          <Text style={styles.seccionTitulo}>Detalles de la Adicción</Text>
          <View style={styles.fila}>
            <Text style={styles.textoEtiqueta}>Sustancia:</Text>
            <Text style={styles.textoValor}>{diagnosticData.substance}</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.textoEtiqueta}>Frecuencia:</Text>
            <Text style={styles.textoValor}>{diagnosticData.frequency}</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.textoEtiqueta}>Motivo:</Text>
            <Text style={styles.textoValor}>{diagnosticData.reason}</Text>
          </View>
        </View>
      </View>

      <View style={styles.botonContenedor}>
        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('RutaAyuda', { diagnosticData })}
        >
          <Text style={styles.botonTexto}>Ver Ruta de Autocuidado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#84B6F4',
    padding: 20,
  },
  contenedorDiagnostico: {
    backgroundColor: '#f5f7fa',
    margin: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    paddingBottom: 10,
  },
  saludoContenedor: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 10,
  },
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  textoEtiqueta: {
    fontSize: 16,
    color: '#495057',
  },
  textoValor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  botonContenedor: {
    alignItems: 'center',
    marginTop: 20,
  },
  boton: {
    backgroundColor: '#002E46',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Diagnostico;