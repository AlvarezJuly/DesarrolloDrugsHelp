import { db } from '../../services/CredencialesFirebase';
import { collection, getDocs, addDoc, query, where, orderBy, limit, getDoc } from 'firebase/firestore';

// Función para obtener preguntas del test
export const obtenerPreguntasTest = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'test'));
    let listaPreguntas = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.Preguntas && Array.isArray(data.Preguntas)) {
        data.Preguntas.forEach((pregunta) => {
          listaPreguntas.push({
            preguntaId: pregunta.preguntaId,
            question: pregunta.pregTex,
            options: pregunta.Opciones || [],
          });
        });
      }
    });

    return listaPreguntas;
  } catch (error) {
    console.error('Error al obtener las preguntas del test:', error);
    throw new Error('No se pudieron obtener las preguntas del test');
  }
};

// Función para guardar las respuestas del test
export const guardarRespuestasTest = async (userId, answers) => {
  try {
    await addDoc(collection(db, 'diag_test'), {
      userId,
      answers,
      timestamp: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error al guardar las respuestas del test:', error);
    throw new Error('No se pudieron guardar las respuestas del test');
  }
};

// Función para verificar si el test está disponible
export const puedeRealizarTest = async (userId) => {
  try {
    const q = query(
      collection(db, 'diag_test'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const ultimoTest = querySnapshot.docs[0].data();
      const ultimaFecha = ultimoTest.timestamp.toDate();
      const ahora = new Date();

      const diferenciaDias = Math.floor((ahora - ultimaFecha) / (1000 * 60 * 60 * 24));
      return diferenciaDias >= 30; // Devuelve true si han pasado 30 días
    }

    return true; // Si no hay registros, permite realizar el test
  } catch (error) {
    console.error('Error al verificar la disponibilidad del test:', error);
    throw new Error('No se pudo verificar la disponibilidad del test');
  }
};

// Función para obtener la última guía del usuario
export const obtenerUltimaGuia = async (userId) => {
  try {
    const q = query(
      collection(db, 'guiasAutocuidado'),
      where('userId', '==', userId),
      orderBy('fechaInicio', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data(); // Retorna la última guía encontrada
    }

    return null; // No hay guías asociadas
  } catch (error) {
    console.error('Error al obtener la última guía:', error);
    throw new Error('No se pudo obtener la última guía del usuario');
  }
};
