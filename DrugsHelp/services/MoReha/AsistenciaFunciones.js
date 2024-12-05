import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Firebase Authentication
import { db } from "../../services/CredencialesFirebase"; // Asegúrate de que la configuración de Firebase esté correcta

// Función para obtener los contactos desde Firebase
export const obtenerContactos = async () => {
  try {
    const contactosCollection = collection(db, "contactos");
    const contactosSnapshot = await getDocs(contactosCollection);
    return contactosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener los especialistas:", error);
    throw error;
  }
};

// Función para enviar una solicitud de chat
export const enviarSolicitudChat = async (especialista) => {
  const auth = getAuth();
  const usuarioId = auth.currentUser?.uid;

  if (!usuarioId) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const solicitud = {
      usuarioId,  // ID del usuario que está enviando la solicitud
      especialistaId: especialista.id,  // ID del especialista al que va dirigida la solicitud
      estado: 'pendiente',  // Estado inicial de la solicitud
      fecha: new Date(),
    };

    await addDoc(collection(db, 'contactos'), solicitud);  // Guardamos la solicitud en la colección 'contactos'
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    throw error;
  }
};
// Función para obtener el estado de la solicitud
export const obtenerEstadoSolicitud = async (usuarioId, especialistaId) => {
  try {
    const solicitudesCollection = collection(db, "solicitudes_chat");
    const solicitudesSnapshot = await getDocs(solicitudesCollection);
    const solicitud = solicitudesSnapshot.docs.find(
      (doc) =>
        doc.data().usuarioId === usuarioId && doc.data().especialistaId === especialistaId
    );

    if (solicitud) {
      return solicitud.data().estado;  // Devuelve el estado de la solicitud
    } else {
      throw new Error("No se ha encontrado una solicitud de chat para este usuario y especialista.");
    }
  } catch (error) {
    console.error("Error al obtener el estado de la solicitud:", error);
    throw error;
  }
};
