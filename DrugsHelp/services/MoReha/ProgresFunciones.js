//ProgresFunciones.js
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import {db} from '../../services/CredencialesFirebase';
  //Gestion de las notas en progreso 
// Obtener progreso desde Firestore
export const getProgress = async () => {
    try {
      const docRef = doc(db, 'progreso', 'usuario1');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No se encontró el documento.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el progreso:", error);
      return null;
    }
  };
  
  // Actualizar progreso en Firestore
  export const updateProgress = async (completedWeeks, currentWeekProgress, abstinenceDays) => {
    try {
      const docRef = doc(db, 'progreso', 'usuario1');
      await setDoc(docRef, {
        completedWeeks,
        currentWeekProgress,
        abstinenceDays,
      });
    } catch (error) {
      console.error("Error al actualizar el progreso:", error);
    }
  };
  
  // Obtener notas desde Firestore
  export const getNotes = async () => {
    try {
      const notesSnapshot = await getDocs(collection(db, 'notas'));
      const notes = notesSnapshot.docs.map(doc => doc.data());
      return notes;
    } catch (error) {
      console.error("Error al obtener las notas:", error);
      return [];
    }
  };
  
  // Agregar nota a Firestore
  export const addNote = async (title, description) => {
    try {
      await setDoc(doc(collection(db, 'notas')), {
        title,
        description,
      });
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };
  
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


/* // Obtener progreso desde Firestore
export const getProgress = async () => {
    try {
      const doc = await db.collection('progreso').doc('usuario1').get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error("Error al obtener el progreso:", error);
      return null;
    }
  };
  
  // Actualizar progreso en Firestore
  export const updateProgress = async (completedWeeks, currentWeekProgress, abstinenceDays) => {
    try {
      await db.collection('progreso').doc('usuario1').set({
        completedWeeks,
        currentWeekProgress,
        abstinenceDays,
      });
    } catch (error) {
      console.error("Error al actualizar el progreso:", error);
    }
  };
  
  // Obtener notas desde Firestore
  export const getNotes = async () => {
    try {
      const notesSnapshot = await db.collection('notas').get();
      const notes = notesSnapshot.docs.map(doc => doc.data());
      return notes;
    } catch (error) {
      console.error("Error al obtener las notas:", error);
      return [];
    }
  }; */