const apiKey = 'AIzaSyC4Nb3SIkhKgvBNNzT5ObnrPIKUGrzX2gg';
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

// Función genérica para hacer peticiones a la IA
const fetchDataFromIA = async (prompt) => {
  try {
    console.log("Prompt enviado a la IA:", prompt);
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    console.log("Respuesta de la IA:", data);  // Verificación de la respuesta de la IA
    // Verificacion que la respuesta contiene los datos esperados
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;  // Acceder al contenido del modelo
      console.log("Texto de la respuesta de la IA:", responseText);  // Ver contenido procesado
      return responseText;
    } else {
      console.error("Respuesta inesperada de la IA:", data);
      return null;
    }
  } catch (error) {
    console.error("Error al conectar con la IA:", error);
    return null;
  }
};

// Declaración y exportación de funciones específicas para generar cada parte de la guía
export const fetchArticulos = async (userData) => {
  const prompt = `Recomienda 5 artículos informativos en el idioma Español (es) sobre la rehabilitación de la adicción a ${userData.substance} para una persona de ${userData.age} años y género ${userData.sex}, verifica que la fuente se confiable y este activa. Devuelve un arreglo formato json con los siguientes detalles para cada artículo:
- titulo: El título del artículo.
- url: El enlace directo al artículo que sea válido y de la región américa.
- descripcion: Una breve descripción o resumen del artículo.
`;
  return await fetchDataFromIA(prompt);
};

export const fetchTecnicasRelax = async (userData) => {
  const prompt = `Proporciona 5 técnicas de relajación adecuadas para una persona en recuperación de ${userData.substance}, que consume ${userData.frequency} por ${userData.reason}, con ${userData.age} años y género ${userData.sex}. Devuelve un arreglo formato json con los siguientes detalles para cada técnica:
- titulo: El nombre de la técnica de relajación.
- descripcion: Una breve descripción de la técnica.
- pasos: Un listado de pasos que el usuario debe seguir para llevar a cabo la técnica.
`;
  return await fetchDataFromIA(prompt);
};

export const fetchEjercicios = async (userData) => {
  const prompt = `Sugiere 5 rutinas de ejercicios físicos para una persona en recuperación de ${userData.substance}, que consume ${userData.frequency} por ${userData.reason}, con ${userData.age} años y género ${userData.sex}. Devuelve un arreglo formato json con los siguientes detalles para cada rutina:
- titulo: El nombre de la rutina de ejercicios.
- descripcion: Una breve descripción de los beneficios de la rutina.
- pasos: Un listado de pasos que el usuario debe seguir para realizar los ejercicios.
`;
  return await fetchDataFromIA(prompt);
};

export const fetchAlimentacion = async (userData) => {
  const prompt = `Recomienda 5 consejos de alimentación saludable para mejorar la recuperación de la adicción a ${userData.substance} en una persona de ${userData.age} años. Devuelve un arreglo formato json con los siguientes detalles para cada consejo:
- titulo: El título del consejo de alimentación.
- alimentos: Una lista de alimentos recomendados.
- descripcion: Una breve descripción del beneficio de este consejo para la recuperación.
`;
  return await fetchDataFromIA(prompt);
};


/* export const fetchVideos = async (userData) => {
  const prompt = `Recomienda 5 videos informativos sobre los efectos de consumir ${userData.substance}, específicamente para una persona de ${userData.age} años, género ${userData.sex}, que consume ${userData.frequency} por ${userData.reason}. Devuelve un arreglo de objetos con las siguientes propiedades:
- titulo: El título del video
- url: El enlace para ver el video
- miniatura: Una imagen miniatura del video
- descripcion: Una pequeña descripción del video.`;
  return await fetchDataFromIA(prompt);
}; */