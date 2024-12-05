// Archivo: RutaFunciones.js
import { db } from '../CredencialesFirebase'; 
import { collection, query, where, addDoc, getDocs, orderBy, limit } from 'firebase/firestore';

// Función para buscar videos según la sustancia
export const obtenerVideoRelacionado = async (substance) => {
    try {
        const videoQuery = query(
            collection(db, 'videos'),
            where('substance', '==', substance)
        );
        const querySnapshot = await getDocs(videoQuery);
        const videos = [];

        querySnapshot.forEach((doc) => {
            const videoData = doc.data();
            if (videoData.videoUrl) {
                videos.push({
                    id: doc.id,
                    titulo: videoData.titulo,
                    videoUrl: videoData.videoUrl,
                });
            }
        });

        return videos.length > 0 ? videos[0] : null; // Retornamos el primer video encontrado
    } catch (error) {
        console.error('Error al obtener el video relacionado:', error);
        return null;
    }
};

// Función para guardar la guía de autocuidado en Firebase
export const guardarGuiaEnFirebase = async (userId, guia) => {
    if (!userId) {
        console.error("Error: userId no puede estar vacío. No se guardará la guía.");
        return; 
    }

    try {
        const fechaInicio = new Date(); 
        await addDoc(collection(db, 'guiasAutocuidado'), {
            userId, 
            guia,
            fechaInicio,
        });
        console.log("Guía de autocuidado guardada correctamente en Firebase.");
    } catch (error) {
        console.error("Error al guardar la guía de autocuidado en Firebase:", error);
    }
};

// Función para obtener la guía de autocuidado más reciente
export const obtenerGuia = async (userId) => {
    try {
        const guiaQuery = query(
            collection(db, 'guiasAutocuidado'),
            where('userId', '==', userId),
            orderBy('fechaInicio', 'desc'),
            limit(1) // Solo obtener la guía más reciente
        );

        const querySnapshot = await getDocs(guiaQuery);
        if (!querySnapshot.empty) {
            const guia = querySnapshot.docs[0].data().guia; 
            return guia;
        }
        return null;
    } catch (error) {
        console.error('Error al obtener la guía guardada:', error);
        return null;
    }
};

