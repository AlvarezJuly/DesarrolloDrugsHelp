// components/ContactoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardEspecialista = ({ contacto }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{contacto.nombreCom}</Text>
      <Text style={styles.city}>Ciudad: {contacto.ciudad}</Text>
      <Text style={styles.email}>Correo: {contacto.correo}</Text>
      <Text style={styles.phone}>Número: {contacto.numero}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f0f4f7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 14,
    color: '#666',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
});

export default CardEspecialista;
