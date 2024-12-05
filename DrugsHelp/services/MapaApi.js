import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permiso de ubicación denegado');
          return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
        setRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (e) {
        setError('Error al obtener la ubicación');
      }
    })();
  }, []);

  return { location, region, error, setRegion };
};


export const fetchNearbyPlaces = async (latitude, longitude, apikey) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&key=${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results.map((place) => ({
    id: place.place_id,
    name: place.name,
    address: place.vicinity,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
  }));
};

export const fetchPlacesByQuery = async (query, apikey) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apikey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.results.map((place) => ({
    id: place.place_id,
    name: place.name,
    address: place.formatted_address,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
  }));
};
