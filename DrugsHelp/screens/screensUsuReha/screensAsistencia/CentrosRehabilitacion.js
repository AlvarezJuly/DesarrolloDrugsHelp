import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

//API de Google aquí
const GOOGLE_MAPS_APIKEY = 'AIzaSyD8n4R0uIU9sbk12Bwx8U7UCQGcGZbg1Bc';

export default function CentrosRehabilitacion() {
  const [location, setLocation] = useState(null);
  const [centrosCercanos, setCentrosCercanos] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación denegado');
        return;
      }

      // Seguimiento de la ubicación en tiempo real del usuario
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({ latitude, longitude });
          obtenerCentrosCercanos(latitude, longitude); // Actualizar centros cercanos cada vez que cambia la ubicación
        }
      );
    })();
  }, []);

  // Función para centrar el mapa en la ubicación del usuario
  const centrarEnUbicacionUsuario = () => {
    if (location) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  // Función para obtener centros de ayuda cercanos utilizando Google Places Nearby Search
  const obtenerCentrosCercanos = async (latitude, longitude) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital|health&keyword=rehabilitación|hospital|alcohólicos|drogas&key=${GOOGLE_MAPS_APIKEY}`
    );
    const data = await response.json();
    if (data.results) {
      const centros = data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        location: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
        address: place.vicinity,
      }));
      setCentrosCercanos(centros);
    }
  };

  // Manejar selección de lugar en la búsqueda manual
  const manejarBusquedaManual = (data, details) => {
    const { lat, lng } = details.geometry.location;
    const nuevoCentro = {
      id: details.place_id,
      name: data.description,
      location: { latitude: lat, longitude: lng },
    };
    setCentrosCercanos([nuevoCentro]); // Muestra solo el resultado de la búsqueda manual
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda manual */}
      <GooglePlacesAutocomplete
        placeholder="Buscar centro de ayuda"
        fetchDetails
        onPress={manejarBusquedaManual}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'es',
          types: 'establishment',
          keyword: 'rehabilitación|hospital|ayuda|alcohólicos|drogas',
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
        {location && (
          <Marker
            coordinate={location}
            title="Mi ubicación"
            description="Ubicación en tiempo real"
            pinColor="blue" // Color azul para el usuario
          />
        )}

        {centrosCercanos.map((centro) => (
          <Marker
            key={centro.id}
            coordinate={centro.location}
            title={centro.name}
            description={centro.address}
            pinColor="red" // Color rojo para puntos recomendados
          />
        ))}
      </MapView>

      {/* Botón para centrar en la ubicación actual */}
      <TouchableOpacity style={styles.locationButton} onPress={centrarEnUbicacionUsuario}>
        <MaterialIcons name="my-location" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: width, height: height },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googlePlacesAutocomplete: {
    container: {
      position: 'absolute',
      top: 10,
      width: '90%',
      zIndex: 1,
      alignSelf: 'center',
    },
    textInputContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 10,
    },
    textInput: { height: 44, color: '#5d5d5d', fontSize: 16 },
  },
});
