// Archivo: RutaFunciones.js
// Este archivo contiene funciones relacionadas con la base de datos de la guía de autocuidado
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
        videos.push({
            id: doc.id,
            titulo: doc.data().titulo,
            videoUrl: doc.data().videoUrl,
        });
        });

        return videos.length > 0 ? videos[0] : null; // Retornamos el primer video encontrado
    } catch (error) {
        console.error('Error al obtener el video relacionado:', error);
        return null;
    }
};
