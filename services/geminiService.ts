import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MessageRequest, Product } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDedication = async (req: MessageRequest): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key no configurada.";

  const prompt = `Escribe una dedicatoria para una tarjeta de flores. 
  Ocasión: ${req.occasion}. 
  Destinatario: ${req.recipient}. 
  Tono: ${req.tone}. 
  Longitud: Máximo 30 palabras. 
  Solo devuelve el texto del mensaje, nada más.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No se pudo generar el mensaje.";
  } catch (error) {
    console.error("Error generating dedication:", error);
    return "Lo sentimos, hubo un error al generar el mensaje. Por favor intenta de nuevo.";
  }
};

export const recommendProducts = async (occasion: string, preferences: string, products: Product[]): Promise<{id: string, reason: string}[]> => {
  const ai = getAiClient();
  if (!ai) return [];

  const catalogContext = products.map(p => 
    `ID: ${p.id}, Nombre: ${p.name}, Categoría: ${p.category}, Tags: ${p.tags.join(',')}, Descripción: ${p.description}`
  ).join('\n');

  const prompt = `Actúa como un florista experto. Recomienda hasta 3 productos de mi catálogo basándote en la solicitud del cliente.
  
  Catálogo disponible:
  ${catalogContext}

  Solicitud del cliente:
  Ocasión: ${occasion}
  Gustos/Detalles: ${preferences}

  Devuelve SOLO un array JSON válido con el formato:
  [{"id": "id_del_producto", "reason": "breve explicación de por qué es buena opción"}]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let text = response.text || "[]";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error recommending products:", error);
    return [];
  }
};

export const chatWithFlorist = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key no configurada.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "Eres 'Rosa', una asistente experta de la florería 'Lavanda & Rosas'. Tu objetivo es ayudar a los clientes a elegir el arreglo floral perfecto. Eres amable, conocedora de flores y estacionalidad. Recomienda productos basándote en emociones y ocasiones. Tus respuestas deben ser breves y útiles (máximo 60 palabras).",
      },
      history: history as any,
    });

    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "No entendí tu pregunta.";
  } catch (error) {
    console.error("Chat error:", error);
    return "Disculpa, estoy teniendo problemas técnicos. ¿Podemos intentar otra vez?";
  }
};