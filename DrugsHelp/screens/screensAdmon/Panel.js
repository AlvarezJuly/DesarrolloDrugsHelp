import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';

export default function Panel({ navigation }) {
  return (
    <View style={styles.container}>

<View style={styles.header}> 
            <View style={styles.headerImagotipo}>
              <Image 
                source={require('../../assets/icons/imagotipoH.png')} 
                style={styles.imagotipo}   
              />
            </View>
        </View>
      <Text style={styles.title}>Panel de Administración</Text>

      {/* Estadísticas */}
      <Card style={styles.card}>
        <Card.Title title="Estadísticas de la App" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Estadisticas')}
            style={styles.cardButton}
          >
            Ver Estadísticas
          </Button>
        </Card.Content>
      </Card>

      {/* Gestión de Base de Datos */}
      <Card style={styles.card}>
        <Card.Title title="Gestión de Base de Datos" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('GestionBaseDatos')}
            style={styles.cardButton}
          >
            Gestionar Base de Datos
          </Button>
        </Card.Content>
      </Card>

      {/* Gestión de Notificaciones */}
      <Card style={styles.card}>
        <Card.Title title="Gestión de Notificaciones" />
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('GestionNotificaciones')}
            style={styles.cardButton}
          >
            Gestionar Notificaciones
          </Button>
        </Card.Content>
      </Card>
      <View style={styles.footer}></View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 105,
    backgroundColor: '#A7D8DE',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
    zIndex: 1, 
  },

  headerImagotipo:{
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10, 
    width: 250,
    height: 75, 
  },

  imagotipo: {
    height: 70,
    width: 175,
  },

  title: {
    marginTop: 105,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    padding:10
  },
  cardButton: {
    marginTop: 10,
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
