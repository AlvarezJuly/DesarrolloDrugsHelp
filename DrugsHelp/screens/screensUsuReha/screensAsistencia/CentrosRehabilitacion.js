import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, ActivityIndicator, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import  { useLocation, fetchNearbyPlaces, fetchPlacesByQuery } from '../../../services/MapaApi'; // Importa las funciones necesarias
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const apikey = 'AIzaSyD8n4R0uIU9sbk12Bwx8U7UCQGcGZbg1Bc'; 

const CentrosRehabilitacion = () => {
  const { location, region, error, setRegion } = useLocation(); // Hook de ubicación
  const [markers, setMarkers] = useState([]);
  const [visibleMarkers, setVisibleMarkers] = useState([]); // Marcadores visibles en el mapa
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (location) {
      fetchNearbyPlaces(location.latitude, location.longitude, apikey)
        .then((places) => setMarkers(places))
        .catch((err) => console.error(err));
    }
  }, [location]);

  const handleSearch = async () => {
    if (!query.trim()) {
      if (location) {
        try {
          const places = await fetchNearbyPlaces(location.latitude, location.longitude, apikey);
          setMarkers(places);
        } catch (error) {
          console.error("Error al cargar centros recomendados:", error);
        }
      }
      return;
    }

    try {
      const places = await fetchPlacesByQuery(query, apikey);

      if (places.length > 0) {
        setMarkers(places);
      } else {
        console.warn("No se encontraron lugares relacionados con la búsqueda.");
        setMarkers([]);
      }
    } catch (error) {
      console.error("Error al buscar lugares:", error);
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

  // Filtra los marcadores visibles en la región actual del mapa
  const updateVisibleMarkers = (region) => {
    const visible = markers.filter((marker) =>
      marker.latitude >= region.latitude - region.latitudeDelta / 2 &&
      marker.latitude <= region.latitude + region.latitudeDelta / 2 &&
      marker.longitude >= region.longitude - region.longitudeDelta / 2 &&
      marker.longitude <= region.longitude + region.longitudeDelta / 2
    );
    setVisibleMarkers(visible);
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
        onRegionChangeComplete={(r) => {
          setRegion(r);
          updateVisibleMarkers(r); // Actualiza los marcadores visibles
        }}
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
            testID={`marker-${marker.id}`} 
          />
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar centros de ayuda"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
        <Button title="Buscar" onPress={handleSearch} testID="search-button" />
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={goToCurrentLocation}>
        <FontAwesome6 name="location-crosshairs" size={24} color="blue" />
      </TouchableOpacity>

      {/* Tarjetas de descripción */}
      <FlatList   
  data={visibleMarkers}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardSubtitle}>
        Lat: {item.latitude.toFixed(4)}, Lng: {item.longitude.toFixed(4)}
      </Text>
    </View>
  )}
  testID="centrosList" 
  style={styles.cardList}
  horizontal // Hacer que sea deslizable horizontalmente
  showsHorizontalScrollIndicator={false} // Ocultar el indicador de scroll
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { flex: 1 },
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
    bottom: 140,
    left: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  cardList: {
    position: 'absolute',
    bottom: 10, // Más espacio desde el borde inferior
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo semi-transparente
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10, // Espacio entre las tarjetas
    width: 250, // Anchura uniforme para todas las tarjetas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  }, 
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardSubtitle: { fontSize: 12, color: '#555' },
});

export default CentrosRehabilitacion;
