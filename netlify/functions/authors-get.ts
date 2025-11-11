import type { Handler } from "@netlify/functions";
import { authorsCol } from "./lib/db";
import { withCors, handleOptions } from "./lib/cors";

export const handler: Handler = async (event: { httpMethod: string; }) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "GET") {
    return withCors({ 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    });
  }

  const { redis, prefix } = await authorsCol();
  
  // Obtener todas las keys de autores
  const keys = await redis.keys(`${prefix}*`);
  
  // Leer todos los datos
  const authorsData = [];
  for (const key of keys) {
    const data = await redis.get(key);
    if (data) {
      const author = JSON.parse(data);
      const id = key.replace(prefix, "");
      authorsData.push({
        _id: id,
        ...author
      });
    }
  }
  
  // Ordenar por createdAt descendente (más reciente primero)
  const normalized = authorsData.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  return withCors({ body: JSON.stringify(normalized) });
};