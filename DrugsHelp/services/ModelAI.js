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
    });//recepción de la respuesta de la IA
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

// Declaración y exportación de funciones específicas enviar el prompt para generar la guía 
export const fetchArticulos = async (userData) => { //recibe datos 
  const prompt = `
  Por favor recomienda 5 informes o artíulos de la web idioma Español (es) sobre temas que tengan que ver con la rehabilitación de la adicción a ${userData.substance} para una persona de ${userData.age} años y género ${userData.sex}, verifica que la fuente se confiable y el sitio o página web aún activao además que las publicaciones sean a partir del año 2020 en adelante. Procura que la información venga de estos sitios Sitios confiables
  Organizaciones internacionales:World Health Organization, United Nations Office on Drugs and Crime (UNODC), Organizaciones nacionales, Asociaciones profesionales:Asociación Americana de Psicología (APA), Sociedad Española de Adicciones, Bases de datos académicas:Google Scholar, PubMed, en un caso que no puedas obtener las url o sean inválidas entonces no me las recomiendes y busca otros para con información válida y completa. Busca y presenta con los siguientes detalles para cada artículo:
- titulo: El título del artículo.
- url: El enlace directo al artículo que sea válido.
- descripcion: Una breve descripción o resumen del artículo.
- Genera 3 preguntas en base al artículo, para validar la lectura que el usuario realizó todo en format json.
`;
  return await fetchDataFromIA(prompt);//se envía a la IA // retorno lo que da la IA en base al prompt enviado
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

// Función para interactuar con el chatbot JuJo y manetener el hilo de la conversación

// Inicializar un historial vacío si aún no existe
let conversationHistory = [];

// Función para obtener la respuesta del chatbot JuJo
export const fetchChatBotResponse = async (userInput) => {
  // Agregar la nueva consulta del usuario al historial
  conversationHistory.push(`Usuario: ${userInput}`);
  const prompt = `
Eres JuJo, un chatbot especializado en responder cualquier duda sobre los efectos de las drogas. Tu objetivo es informar sobre los efectos del consumo de drogas en el cuerpo y la mente, los riesgos asociados, y proporcionar apoyo motivacional para aquellos que desean superar la adicción.

No proporciones guías de autocuidado directamente; en su lugar, sugiere usar las funcionalidades de la app en la que te encuentras DrugsHelp, donde los usuarios encontrarán recursos completos como una guía personalizada, contactos de especialistas, y un mapa con centros de ayuda cercanos. Motívalos a usar la app como herramienta para dejar el consumo de drogas. Recuerda que tú estas en esta app así que habla de forma personal y no digas que existen otras secciones además de las que ya te he mencionado.
Sólo en la primera respuesta comienza presentándote, ya después ofrece respuestas claras y breves. Si el usuario menciona términos desconocidos, explícalos de manera sencilla. Enfócate en brindar información y soluciones basadas en las funcionalidades de DrugsHelp. Si te preguntan sobre temas que no están relacionados con las drogas o la rehabilitación, recuerda amablemente tu propósito aquí y redirígelos al uso de la app.
${conversationHistory.join('\n')}

JuJo:`;
  // Obtener la respuesta del chatbot utilizando el prompt
  const response = await fetchDataFromIA(prompt);
  // Agregar la respuesta del chatbot al historial
  conversationHistory.push(`JuJo: ${response}`);

  return response;
};

