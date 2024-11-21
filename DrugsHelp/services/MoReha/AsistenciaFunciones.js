// AsistenciaFunciones.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/CredencialesFirebase';

// Función para obtener los contactos desde Firebase
export const obtenerContactos = async () => {
    try {
        const contactosCollection = collection(db, 'contactos');
        const contactosSnapshot = await getDocs(contactosCollection);
        return contactosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener contactos: ", error);
        throw error;
    }
};
