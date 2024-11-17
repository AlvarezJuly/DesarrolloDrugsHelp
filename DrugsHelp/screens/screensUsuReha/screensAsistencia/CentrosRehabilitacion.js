// MapScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { fetchNearbyPlaces, fetchPlacesByQuery, useLocation } from '../../../services/MapaApi';  // Importamos las funciones de la API

const apikey = 'AIzaSyD8n4R0uIU9sbk12Bwx8U7UCQGcGZbg1Bc';  

const CentrosRehabilitacion = () => {
  const { location, region, error, setRegion } = useLocation();  // Usamos el hook de ubicación
  const [markers, setMarkers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (location) {
      // Llamamos a la API para obtener lugares cercanos una vez que tengamos la ubicación
      fetchNearbyPlaces(location.latitude, location.longitude, apikey)
        .then((places) => setMarkers(places))
        .catch((err) => console.error(err));
    }
  }, [location]);

  const handleSearch = async () => {
    try {
      const places = await fetchPlacesByQuery(query, apikey);
      setMarkers(places);
    } catch (error) {
      console.error(error);
    }
  };

  const goToCurrentLocation = () => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!region) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(r) => setRegion(r)}
        showsUserLocation
        showsMyLocationButton
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
          />
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar centros de rehabilitación"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
        <Image style={{ height: 20, width: 20, marginBottom: 5 }} source={require('../../../assets/icons/miubic.png')} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  input: {
    height: 25,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 8,
    borderRadius: 5,
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CentrosRehabilitacion;
