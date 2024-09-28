import React from 'react'
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

export default function espacialista(){

    const doctors = [
        {
          id: '1',
          name: 'Dr. Carlos Pérez',
          specialty: 'Psiquiatría',
          image: 'https://via.placeholder.com/100',  // Usa una URL de imagen real o una local
        },
        {
          id: '2',
          name: 'Dr. Juan Ramírez',
          specialty: 'Medicina General',
          image: 'https://via.placeholder.com/100',
        },
        {
          id: '3',
          name: 'Dr. Ana García',
          specialty: 'Psicología Clínica',
          image: 'https://via.placeholder.com/100',
        },
        {
          id: '4',
          name: 'Lic. Marta López',
          specialty: 'Terapia Ocupacional',
          image: 'https://via.placeholder.com/100',
        },
      ];
      
    
        const renderDoctor = ({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </View>
            </View>
          );
        
          return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backText}>←</Text>
              </TouchableOpacity>
        
              <FlatList
                data={doctors}
                renderItem={renderDoctor}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
              />
            </View>
    )

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E0F7FA',
    },
    backButton: {
      margin: 15,
    },
    backText: {
      fontSize: 24,
      color: 'black',
    },
    list: {
      padding: 10,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#80DEEA',
      borderRadius: 15,
      padding: 10,
      marginBottom: 15,
      alignItems: 'center',
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      borderColor: '#004D40',
    },
    info: {
      marginLeft: 15,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#004D40',
    },
    specialty: {
      fontSize: 14,
      color: '#004D40',
    },
  });
