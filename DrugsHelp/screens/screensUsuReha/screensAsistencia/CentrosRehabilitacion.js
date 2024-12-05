import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker }  from 'react-native-maps'
import { useLocation, fetchNearbyPlaces, fetchPlacesByQuery } from '../../../services/MapaApi';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const apikey = 'AIzaSyBXIO937bDWaz68qZfW9Jcqf_pFhNK2DgU'; // Reemplaza con tu API Key de Google Maps

const CentrosRehabilitacion = () => {
  const { location, region, error, setRegion } = useLocation(); // Hook personalizado
  const [markers, setMarkers] = useState([]);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [query, setQuery] = useState('');

  // Carga de lugares cercanos basada en la ubicación inicial
  useEffect(() => {
    let isMounted = true; // Controla si el componente sigue montado
    if (location) {
      fetchNearbyPlaces(location.latitude, location.longitude, apikey)
        .then((places) => {
          if (isMounted) setMarkers(places);
        })
        .catch((err) => console.error(err));
    }
    return () => {
      isMounted = false; // Evita actualizar el estado en componentes desmontados
    };
  }, [location]);

  const handleSearch = async () => {
    if (!query.trim()) {
      // Si la búsqueda está vacía, carga los lugares cercanos
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
      setMarkers(places.length > 0 ? places : []);
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
          updateVisibleMarkers(r);
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {visibleMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            description={marker.address}
          />
        ))}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar centros de rehabilitación..."
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Buscar" onPress={handleSearch} />
        <TouchableOpacity onPress={goToCurrentLocation} style={styles.locationButton}>
          <FontAwesome6 name="location-arrow" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 5,
  },
  locationButton: {
    marginLeft: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
});

export default CentrosRehabilitacion;
