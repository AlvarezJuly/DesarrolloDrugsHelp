
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Card } from 'react-native-paper';


const { width, height } = Dimensions.get('window');


//const GOOGLE_MAPS_APIKEY = 'AIzaSyAMFLtOMkhcweqWwyEVQyh9jPXqJP4hYG4';
export default function centros_de_rehabilitacion() {

  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  // Datos de ejemplo de centros de rehabilitación
  const rehabCenters = [
    {
      id: 1,
      name: 'Alcoholicos Anonimos S.A',
      description: 'Programa de tratamiento del alcoholismo',
      location: { latitude: 12.1364, longitude: -86.2514 },
      phone: '8724-9579',
    },
    {
      id: 2,
      name: 'Centro Médico Juigalpa',
      description: 'Clínica ambulatoria',
      location: { latitude: 12.1394, longitude: -86.2519 },
      phone: '2512-1817',
      rating: 3.9,
      review: 'Buen servicio',
    },
  ];

  // Obtener la ubicación actual del usuario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  // Manejar selección de lugares
  const handlePlaceSelection = (data, details) => {
    const { lat, lng } = details.geometry.location;
    const newMarker = {
      latitude: lat,
      longitude: lng,
      title: data.description,
    };

    setMarkers([newMarker]);
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  // Obtener indicaciones entre ubicaciones
  const getDirections = async (startLoc, destinationLoc) => {
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key='AIzaSyAMFLtOMkhcweqWwyEVQyh9jPXqJP4hYG4`
    );
    const respJson = await resp.json();
    const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
    const coords = points.map(point => ({
      latitude: point[0],
      longitude: point[1],
    }));
    setRouteCoordinates(coords);
  };

  // Manejar clic en el botón de indicaciones
  const handleDirections = (centerLocation) => {
    if (location) {
      const startLoc = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      getDirections(startLoc, centerLocation);
    }
  };

      return (
        <View style={styles.container}>
        {/* Cuadro Azul "Centros de Ayuda" */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Centros de Ayuda</Text>
        </View>
  
        {/* Barra de búsqueda */}
        <GooglePlacesAutocomplete
          placeholder="Buscar dirección"
          fetchDetails
          onPress={handlePlaceSelection}
          query={{
            key: 'AIzaSyAMFLtOMkhcweqWwyEVQyh9jPXqJP4hYG4',
            language: 'es',
          }}
          styles={styles.googlePlacesAutocomplete}
          
        />
  
        {/* Mapa */}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location ? location.latitude : 12.1364,
            longitude: location ? location.longitude : -86.2514,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Marcadores de los centros de rehabilitación */}
          {rehabCenters.map((center) => (
            <Marker
              key={center.id}
              coordinate={center.location}
              title={center.name}
              description={center.description}
            />
          ))}
  
          {/* Dibujo de la ruta */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#000"
              strokeWidth={3}
            />
          )}
        </MapView>
  
        {/* Tarjetas informativas */}
        <View style={styles.cardContainer}>
          {rehabCenters.map((center) => (
            <Card style={styles.card} key={center.id}>
              <Text style={styles.cardTitle}>{center.name}</Text>
              <Text>{center.description}</Text>
              <Text>{center.phone}</Text>
              <Text>{center.rating ? `Rating: ${center.rating}` : 'Sin calificaciones'}</Text>
              {center.review && <Text>"{center.review}"</Text>}
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={() => handleDirections(center.location)}
              >
                <Text style={styles.directionsText}>Indicaciones</Text>
              </TouchableOpacity>
            </Card>
  ))}
        </View>
      </View>
      )}


      const styles = StyleSheet.create({
        container: {
          flex: 1,
        },
        header: {
          backgroundColor: 'blue',
          padding: 15,
          alignItems: 'center',
          marginTop :8
        },
        headerText: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        },
        map: {
          width: width,
          height: height * 0.5,
          marginTop: 20,
        },
        cardContainer: {
          position: 'absolute',
          bottom: 0,
          width: '100%',
        },
        card: {
          backgroundColor: 'white',
          marginVertical: 5,
          padding: 10,
          borderRadius: 10,
          marginHorizontal: 10,
        },
        cardTitle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        directionsButton: {
          backgroundColor: '#4285F4',
          padding: 8,
          borderRadius: 5,
          marginTop: 6,
        },
        directionsText: {
          color: 'white',
          textAlign: 'center',
        },
        googlePlacesAutocomplete: {
          container: {
            position: 'absolute',
            top: 60,
            width: '90%',
            zIndex: 1,
            alignSelf: 'center',
          },
          textInputContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 10,
          },
          textInput: {
            height: 44,
            color: '#5d5d5d',
            fontSize: 16,
          },
        },
      });