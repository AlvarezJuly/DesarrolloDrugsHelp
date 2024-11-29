//ProgresFunciones.js
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy, updateDoc  } from 'firebase/firestore';
import {db} from '../../services/CredencialesFirebase';
import { getAuth } from 'firebase/auth';

  //Gestion de las notas en progreso 
// Obtener el progreso semanal de un usuario
export const obtenerProgresoSemanal = async (userId) => {
  try {
    const docRef = doc(db, 'progreso', userId);  // Cambié la sintaxis para Firestore v9
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().progresoSemanal || 0; // Retorna el progreso semanal guardado
    } else {
      return null; // Si no existe el documento, retorna null
    }
  } catch (error) {
    console.error("Error al obtener el progreso semanal:", error);
    return null;
  }
};

// Inicializar el progreso si no existe
export const inicializarProgreso = async (userId) => {
  try {
    const docRef = doc(db, 'progreso', userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        progresoSemanal: 0,  // Inicializamos el progreso semanal
        actividadesCompletadas: []  // Lista de tareas completadas
      });
      console.log("Progreso inicializado para el usuario.");
    }
  } catch (error) {
    console.error("Error al inicializar el progreso:", error);
  }
};

// Función para actualizar el progreso semanal
export const actualizarProgreso = async (userId, nuevoProgreso) => {
  try {
    const docRef = doc(db, 'progreso', userId);
    await updateDoc(docRef, {
      progresoSemanal: nuevoProgreso,
    });
    console.log("Progreso actualizado.");
  } catch (error) {
    console.error("Error al actualizar el progreso:", error);
  }
};

  
  // Obtener notas desde Firestore
  export const getNotes = async () => {
    try {
      // Crear una consulta para ordenar las notas por fecha (timestamp)
      const notesQuery = query(collection(db, 'notas'), orderBy('timestamp', 'desc'));
      const notesSnapshot = await getDocs(notesQuery);
  
      const notes = notesSnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }; // Retorna el id del documento junto con los datos
      });
  
      return notes;
    } catch (error) {
      console.error("Error al obtener las notas:", error);
      return [];
    }
  };

 // Agregar nota a Firestore
export const addNote = async (title, description) => {
  try {
    const user = getAuth().currentUser; // Obtén el usuario actual autenticado
    const userId = user ? user.uid : 'anonimo'; // Si el usuario está autenticado, obtenemos su ID; si no, usamos un ID anónimo

    const timestamp = new Date(); // Fecha y hora actuales

    // Agregar la nota a Firestore
    await setDoc(doc(collection(db, 'notas')), {
      title,
      description,
      userId, // ID del usuario
      timestamp, // Fecha y hora de creación
    });

    console.log("Nota agregada exitosamente.");
  } catch (error) {
    console.error("Error al agregar la nota:", error);
  }
};

//Notassssss
  // Editar nota en Firestore
  export const editNote = async (noteId, title, description) => {
    try {
      const noteRef = doc(db, 'notas', noteId);
      await setDoc(noteRef, { title, description }, { merge: true });
    } catch (error) {
      console.error("Error al editar la nota:", error);
    }
  };
  
  // Eliminar nota de Firestore
  export const deleteNote = async (noteId) => {
    try {
      const noteRef = doc(db, 'notas', noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };