// AsistenciaFunciones.js
import { collection, getDocs, getAuth } from "firebase/firestore";
import { db } from "../../services/CredencialesFirebase";


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
    try {
        const auth = getAuth();
        const usuarioActual = auth.currentUser;
        console.log("Usuario actual:", auth.currentUser);


        if (!usuarioActual) {
            throw new Error("El usuario no está autenticado.");
        }

        const nuevaSolicitud = {
            especialistaId: especialista.id,
            especialistaNombre: especialista.nombreCom,
            usuarioId: usuarioActual.uid, // ID del usuario autenticado
            usuarioNombre: usuarioActual.displayName || "Usuario Anónimo", // Nombre del usuario
            usuarioEmail: usuarioActual.email, // Correo electrónico del usuario
            estado: "pendiente", // Estado inicial de la solicitud
            fecha: new Date().toISOString(), // Fecha de creación
        };

        await addDoc(collection(db, "solicitudes_chat"), nuevaSolicitud);
    } catch (error) {
        console.error("Error al enviar la solicitud de chat:", error);
        throw error;
    }
};










/* // Función para enviar una solicitud de chat
export const enviarSolicitudChat = async (especialista) => {
    try {
        const nuevaSolicitud = {
            especialistaId: especialista.id,
            especialistaNombre: especialista.nombreCom,
            usuarioId: "user.uid", // Cambia esto por el ID real del usuario
            usuarioNombre: "NOMBRE_DEL_USUARIO_EN_SESION", // Cambia esto por el nombre real del usuario
            estado: "pendiente", // Estado inicial
            fecha: new Date().toISOString(),
        }; 

        await addDoc(collection(db, "solicitudes_chat"), nuevaSolicitud);
    } catch (error) {
        console.error("Error al enviar la solicitud de chat:", error);
        throw error;
    }
};
 */













/* export const fetchEspecialistas = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "contactos"));
        const especialistas = [];
        querySnapshot.forEach((doc) => {
            especialistas.push({ id: doc.id, ...doc.data() });
        });
        return especialistas;
    } catch (error) {
        console.error("Error obteniendo especialistas: ", error);
        // Podrías retornar un mensaje de error o lanzar un error más específico
        throw new Error("No se pudo obtener la lista de especialistas.");
    }
};
 */


/* // Función para obtener los contactos desde Firebase
export const obtenerContactos = async () => {
    try {
        const contactosCollection = collection(db, 'contactos');
        const contactosSnapshot = await getDocs(contactosCollection);
        return contactosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
        }));
    } catch (error) {
        console.error("Error al obtener el especialista: ", error);
        throw error;
    }
};
 */
