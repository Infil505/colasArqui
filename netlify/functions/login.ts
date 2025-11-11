import type { Handler } from "@netlify/functions";
import { usersCol } from "./lib/db";
import { withCors, handleOptions } from "./lib/cors";
import * as bcrypt from "bcryptjs";

// Generar ID único
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const handler: Handler = async (event: { httpMethod: string; body: any; }) => {
  // Manejar preflight
  if (event.httpMethod === "OPTIONS") return handleOptions();

  if (event.httpMethod !== "POST") {
    return withCors({
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    });
  }

  try {
    const { gmail, password, name, action } = JSON.parse(event.body || "{}");

    if (!gmail || !password) {
      return withCors({
        statusCode: 400,
        body: JSON.stringify({ error: "Email y contraseña son requeridos" }),
      });
    }

    const { redis, prefix } = await usersCol();

    // 🔹 REGISTRO DE NUEVO USUARIO
    if (action === "register") {
      // Verificar si el usuario ya existe usando el índice de email
      const emailKey = `users:email:${gmail}`;
      const existingUserId = await redis.get(emailKey);
      
      if (existingUserId) {
        return withCors({
          statusCode: 409,
          body: JSON.stringify({ error: "Este correo ya está registrado" }),
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = generateId();
      
      const userData = {
        gmail,
        password: hashedPassword,
        name: name || gmail.split("@")[0],
        createdAt: new Date().toISOString(),
      };

      // Guardar usuario
      await redis.set(`${prefix}${userId}`, JSON.stringify(userData));
      
      // Crear índice de email para búsquedas rápidas
      await redis.set(emailKey, userId);

      return withCors({
        statusCode: 201,
        body: JSON.stringify({
          message: "Usuario registrado correctamente",
          _id: userId,
          gmail,
          name: userData.name,
        }),
      });
    }

    // 🔹 LOGIN DE USUARIO EXISTENTE
    // Buscar usuario por email usando el índice
    const emailKey = `users:email:${gmail}`;
    const userId = await redis.get(emailKey);
    
    if (!userId) {
      return withCors({
        statusCode: 401,
        body: JSON.stringify({ error: "Credenciales inválidas" }),
      });
    }

    // Obtener datos del usuario
    const userData = await redis.get(`${prefix}${userId}`);
    if (!userData) {
      return withCors({
        statusCode: 401,
        body: JSON.stringify({ error: "Credenciales inválidas" }),
      });
    }

    const user = JSON.parse(userData);

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return withCors({
        statusCode: 401,
        body: JSON.stringify({ error: "Credenciales inválidas" }),
      });
    }

    return withCors({
      statusCode: 200,
      body: JSON.stringify({
        _id: userId,
        gmail: user.gmail,
        name: user.name,
      }),
    });
  } catch (error: any) {
    console.error("Error en login/registro:", error);
    return withCors({
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    });
  }
};