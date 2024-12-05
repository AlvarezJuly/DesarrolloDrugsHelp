//ProgresFunciones.js
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy, updateDoc  } from 'firebase/firestore';
import {db} from '../../services/CredencialesFirebase';
import { getAuth } from 'firebase/auth';

  //Gestion de las notas en progreso 
// Obtener el progreso semanal de un usuario
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
      // Si el documento no existe, lo creamos
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
export const actualizarProgreso = async (userId, progresoIncremental) => {
  try {
    const docRef = doc(db, 'progreso', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentProgreso = docSnap.data().progresoSemanal;
      const newProgreso = Math.min(currentProgreso + progresoIncremental, 100);  // Asegurar que el progreso no supere el 100%

      await updateDoc(docRef, {
        progresoSemanal: newProgreso,
      });
      console.log("Progreso actualizado a: " + newProgreso + "%");
    } else {
      console.error("No se encontró el documento de progreso del usuario.");
    }
  } catch (error) {
    console.error("Error al actualizar el progreso:", error);
  }
};

// Función para registrar una tarea como completada
export const registrarTareaCompletada = async (userId, tareaId) => {
  try {
    const docRef = doc(db, 'progreso', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const actividadesCompletadas = docSnap.data().actividadesCompletadas || [];

      // Verificar si la tarea ya está marcada como completada
      if (!actividadesCompletadas.includes(tareaId)) {
        actividadesCompletadas.push(tareaId);  // Añadir tarea a la lista

        await updateDoc(docRef, {
          actividadesCompletadas: actividadesCompletadas,
        });
        console.log(`Tarea con ID ${tareaId} registrada como completada.`);
      } else {
        console.log("La tarea ya está completada.");
      }
    } else {
      console.error("No se encontró el documento de progreso del usuario.");
    }
  } catch (error) {
    console.error("Error al registrar la tarea como completada:", error);
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


  //Dias de abstinenci 

  // Inicializar los días de abstinencia si el documento no existe
export const inicializarAbstinencia = async (userId) => {
  try {
    const docRef = doc(db, 'progreso', userId); // Documento para el progreso del usuario
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // Si no existe, creamos el documento con los días de abstinencia inicializados a 0
      await setDoc(docRef, {
        abstinenciaDias: 0, // Inicializamos los días de abstinencia a 0
      });
      console.log("Abstinencia inicializada para el usuario.");
    }
  } catch (error) {
    console.error("Error al inicializar la abstinencia:", error);
  }
};


// Obtener los días de abstinencia desde Firestore
export const obtenerAbstinenciaDias = async (userId) => {
  try {
    const docRef = doc(db, 'progreso', userId); // Documento del usuario
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().abstinenciaDias || 0; // Retorna los días guardados o 0 si no existen
    } else {
      return 0; // Si no existe el documento, retornamos 0
    }
  } catch (error) {
    console.error("Error al obtener los días de abstinencia:", error);
    return 0; // Si ocurre un error, retornamos 0
  }
};

// Actualizar los días de abstinencia en Firestore
export const actualizarAbstinenciaDias = async (userId, abstinenciaDias) => {
  try {
    const docRef = doc(db, 'progreso', userId); // Documento del usuario
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        abstinenciaDias: abstinenciaDias, // Actualiza los días de abstinencia
      });
      console.log(`Días de abstinencia actualizados a: ${abstinenciaDias}`);
    } else {
      console.error("No se encontró el documento de abstinencia.");
    }
  } catch (error) {
    console.error("Error al actualizar los días de abstinencia:", error);
  }
};
