  // uso de Localizacion 
  import { useState, useEffect } from 'react';
  import * as Location from 'expo-location';

// googleApi.js
export const fetchNearbyPlaces = async (latitude, longitude, apiKey) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=Hospital&keyword=alcoholicos|camilo|hubeda&key=${apiKey}`
      );
      const data = await response.json();
      return data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }));
    } catch (error) {
      console.error("Error fetching nearby places:", error);
      return [];
    }
  };
  
  export const fetchPlacesByQuery = async (query, apiKey) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}+health&key=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.results) {
        return data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        }));
      } else {
        console.error("Sin resultados para la búsqueda.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching places by query:", error);
      return [];
    }
  };
  
  



const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (err) {
        setError('No se pudo obtener la ubicación');
        console.error(err);
      }
    };

    getLocation();
  }, []);

  return { location, region, error, setRegion };
};

export default useLocation;
