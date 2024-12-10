import { collection, getDocs, addDoc, query, where, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/CredencialesFirebase';

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

export const obtenerUltimoDiagnostico = async (userId) => {
  try {
    // Buscar el último diagnóstico del usuario
    const q = query(
      collection(db, 'diag_test'), // Cambia 'diag_test' si tu colección tiene otro nombre
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const diagData = querySnapshot.docs[0].data();

      // Extraer las respuestas relacionadas con las palabras clave
      const respuestasClave = diagData.answers.filter((respuesta) =>
        ['frecuencia', 'edad', 'sexo', 'sustancia', 'motivos'].some((clave) =>
          respuesta.question.toLowerCase().includes(clave)
        )
      );

      // Estructurar las respuestas en un objeto claro
      const diagnostico = {};
      respuestasClave.forEach((respuesta) => {
        const pregunta = respuesta.question.toLowerCase();
        if (pregunta.includes('frecuencia')) diagnostico.frequency = respuesta.answer;
        if (pregunta.includes('edad')) diagnostico.age = respuesta.answer;
        if (pregunta.includes('sexo')) diagnostico.sex = respuesta.answer;
        if (pregunta.includes('sustancia')) diagnostico.substance = respuesta.answer;
        if (pregunta.includes('motivos')) diagnostico.reason = respuesta.answer;
      });

      // Buscar el nombre del usuario en la colección 'user'
      const userDoc = await getDoc(doc(db, 'user', userId)); // Cambia 'user' si el nombre de la colección es otro
      const userName = userDoc.exists() ? userDoc.data().nombre : 'Desconocido';

      // Retornar el diagnóstico completo
      return {
        userName,
        ...diagnostico,
      };
    } else {
      throw new Error('No se encontró ningún diagnóstico para este usuario.');
    }
  } catch (error) {
    console.error('Error en obtenerUltimoDiagnostico:', error);
    throw error;
  }
};
