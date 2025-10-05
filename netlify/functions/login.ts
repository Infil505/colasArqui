import type { Handler } from "@netlify/functions";
import { usersCol } from "./lib/db";
import { withCors, handleOptions } from "./lib/cors";
import * as bcrypt from "bcryptjs";

export const handler: Handler = async (event: { httpMethod: string; body: any }) => {
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

    const col = await usersCol();

    // 🔹 REGISTRO DE NUEVO USUARIO
    if (action === "register") {
      const existingUser = await col.findOne({ gmail });
      if (existingUser) {
        return withCors({
          statusCode: 409,
          body: JSON.stringify({ error: "Este correo ya está registrado" }),
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await col.insertOne({
        gmail,
        password: hashedPassword,
        name: name || gmail.split("@")[0], // usa el correo como nombre si no se envía
        createdAt: new Date(),
      });

      return withCors({
        statusCode: 201,
        body: JSON.stringify({
          message: "Usuario registrado correctamente",
          _id: result.insertedId.toString(),
          gmail,
          name: name || gmail.split("@")[0],
        }),
      });
    }

    // 🔹 LOGIN DE USUARIO EXISTENTE
    const user = await col.findOne({ gmail });
    if (!user) {
      return withCors({
        statusCode: 401,
        body: JSON.stringify({ error: "Credenciales inválidas" }),
      });
    }

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
        _id: user._id.toString(),
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
