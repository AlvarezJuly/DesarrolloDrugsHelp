// EvaluaTestFunciones.js - Modelo para la interacción de la funcionalidad del test de evaluación y el diagnóstico.
import { auth, db } from '../../services/CredencialesFirebase'
import { collection, getDocs, addDoc, query, where, orderBy, limit, getDoc, doc } from 'firebase/firestore';

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
        timestamp: new Date()
        });
        return true; // Indicar que el guardado fue exitoso
    } catch (error) {
        console.error('Error al guardar las respuestas del test:', error);
        throw new Error('No se pudieron guardar las respuestas del test');
    }
};

// Función para obtener el último diagnóstico de un usuario
export const obtenerUltimoDiagnostico = async (userId) => {
    try {
    // Obtener el nombre del usuario
    const userDocRef = doc(db, 'user', userId);
    const userDoc = await getDoc(userDocRef);

    let userName = 'Usuario desconocido';
    if (userDoc.exists()) {
        userName = userDoc.data().name;
    }

    // Consulta para obtener el último diagnóstico del usuario
    const q = query(
        collection(db, 'diag_test'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(1)
        );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        // Obtener respuestas del diagnóstico
        const age = docData.answers.find((ans) => ans.question.includes('Edad'))?.answer || 'No especificada';
        const sex = docData.answers.find((ans) => ans.question.includes('Sexo'))?.answer || 'No especificada';
        const substance = docData.answers.find((ans) => ans.question.includes('sustancia'))?.answer || 'No especificada';
        const frequency = docData.answers.find((ans) => ans.question.includes('Frecuencia'))?.answer || 'No especificada';
        const reason = docData.answers.find((ans) => ans.question.includes('Motivos'))?.answer || 'No especificado';

        return { userName, age, sex, substance, frequency, reason };
        } else {
        throw new Error('No se encontró información de diagnóstico');
        }
    } catch (error) {
        console.error('Error al obtener el diagnóstico:', error);
        throw new Error('No se pudo obtener el diagnóstico del usuario');
    }
};

