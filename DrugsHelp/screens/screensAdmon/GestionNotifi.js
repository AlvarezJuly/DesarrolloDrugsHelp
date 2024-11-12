import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function GestionNotifi() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Notificaciones</Text>
      <Text>Esta funcionalidad aún no está implementada.</Text>
    </View>
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
});
