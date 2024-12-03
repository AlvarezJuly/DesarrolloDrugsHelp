import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/CredencialesFirebase'; // Asegúrate de que esta ruta sea correcta

// Función para obtener los datos de una colección específica
export const fetchCollectionData = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error al obtener los datos de la colección ${collectionName}:`, error);
    return [];
  }
};

// Función para obtener los datos de múltiples colecciones
export const fetchAllCollections = async () => {
  try {
    const contactos = await fetchCollectionData('contactos');
    const diag_test = await fetchCollectionData('diag_test');
    const test = await fetchCollectionData('test');
    const user = await fetchCollectionData('user');

    return {
      contactos,
      diag_test,
      test,
      user,
    };
  } catch (error) {
    console.error('Error al obtener todas las colecciones:', error);
    return {
      contactos: [],
      diag_test: [],
      test: [],
      user: [],
    };
  }
};
