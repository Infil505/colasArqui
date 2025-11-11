import { authorsCol, publishersCol, usersCol } from "./db";
import * as bcrypt from "bcrypt";

// Generar ID único simple
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ============= AUTORES =============

export async function applyAuthor(
  action: "create" | "update" | "delete",
  payload: any
) {
  const { redis, prefix } = await authorsCol();

  if (action === "create") {
    const { _id, ...rest } = payload;
    const newId = generateId();
    const data = { ...rest, createdAt: new Date().toISOString() };
    
    await redis.set(`${prefix}${newId}`, JSON.stringify(data));
    return;
  }

  if (action === "update") {
    const { _id, ...rest } = payload;
    
    // Leer datos existentes
    const existing = await redis.get(`${prefix}${_id}`);
    if (!existing) throw new Error("Autor no encontrado");
    
    const updated = {
      ...JSON.parse(existing),
      ...rest,
      updatedAt: new Date().toISOString()
    };
    
    await redis.set(`${prefix}${_id}`, JSON.stringify(updated));
    return;
  }

  if (action === "delete") {
    const { _id } = payload;
    await redis.del(`${prefix}${_id}`);
  }
}

// ============= EDITORIALES =============

export async function applyPublisher(
  action: "create" | "update" | "delete",
  payload: any
) {
  const { redis, prefix } = await publishersCol();

  if (action === "create") {
    const { _id, ...rest } = payload;
    const newId = generateId();
    const data = { ...rest, createdAt: new Date().toISOString() };
    
    await redis.set(`${prefix}${newId}`, JSON.stringify(data));
    return;
  }

  if (action === "update") {
    const { _id, ...rest } = payload;
    
    const existing = await redis.get(`${prefix}${_id}`);
    if (!existing) throw new Error("Editorial no encontrada");
    
    const updated = {
      ...JSON.parse(existing),
      ...rest,
      updatedAt: new Date().toISOString()
    };
    
    await redis.set(`${prefix}${_id}`, JSON.stringify(updated));
    return;
  }

  if (action === "delete") {
    const { _id } = payload;
    await redis.del(`${prefix}${_id}`);
  }
}

// ============= USUARIOS =============

/**
 * Crea un nuevo usuario con contraseña hasheada
 */
export async function createUser(userData: {
  gmail: string;
  password: string;
  name: string;
}) {
  const { redis, prefix } = await usersCol();

  // Verificar si el usuario ya existe (buscando por email)
  const emailKey = `users:email:${userData.gmail}`;
  const existingUserId = await redis.get(emailKey);
  
  if (existingUserId) {
    throw new Error("El usuario ya existe");
  }

  // Hashear la contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // Crear el nuevo usuario
  const userId = generateId();
  const user = {
    gmail: userData.gmail,
    password: hashedPassword,
    name: userData.name,
    createdAt: new Date().toISOString(),
  };

  // Guardar usuario
  await redis.set(`${prefix}${userId}`, JSON.stringify(user));
  
  // Crear índice por email para búsquedas rápidas
  await redis.set(emailKey, userId);

  return {
    _id: userId,
    gmail: userData.gmail,
    name: userData.name,
  };
}

/**
 * Autentica un usuario verificando email y contraseña
 */
export async function authenticateUser(gmail: string, password: string) {
  const { redis, prefix } = await usersCol();

  // Buscar el usuario por email usando el índice
  const emailKey = `users:email:${gmail}`;
  const userId = await redis.get(emailKey);
  
  if (!userId) {
    throw new Error("Credenciales inválidas");
  }

  // Obtener los datos del usuario
  const userData = await redis.get(`${prefix}${userId}`);
  if (!userData) {
    throw new Error("Credenciales inválidas");
  }

  const user = JSON.parse(userData);

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  // Retornar usuario sin la contraseña
  return {
    _id: userId,
    gmail: user.gmail,
    name: user.name,
  };
}

/**
 * Obtiene un usuario por su ID (sin contraseña)
 */
export async function getUserById(userId: string) {
  const { redis, prefix } = await usersCol();
  
  const userData = await redis.get(`${prefix}${userId}`);
  if (!userData) return null;

  const user = JSON.parse(userData);
  
  // Retornar sin contraseña
  const { password, ...userWithoutPassword } = user;
  return {
    _id: userId,
    ...userWithoutPassword
  };
}

/**
 * Actualiza los datos de un usuario
 */
export async function updateUser(
  userId: string,
  updates: { name?: string; gmail?: string }
) {
  const { redis, prefix } = await usersCol();

  // Obtener usuario actual
  const userData = await redis.get(`${prefix}${userId}`);
  if (!userData) {
    throw new Error("Usuario no encontrado");
  }

  const user = JSON.parse(userData);

  // Si se actualiza el email, verificar que no exista
  if (updates.gmail && updates.gmail !== user.gmail) {
    const emailKey = `users:email:${updates.gmail}`;
    const existingUserId = await redis.get(emailKey);
    
    if (existingUserId && existingUserId !== userId) {
      throw new Error("El email ya está en uso");
    }

    // Eliminar el índice anterior de email
    await redis.del(`users:email:${user.gmail}`);
    
    // Crear nuevo índice de email
    await redis.set(emailKey, userId);
  }

  // Actualizar usuario
  const updatedUser = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  await redis.set(`${prefix}${userId}`, JSON.stringify(updatedUser));

  return getUserById(userId);
}

/**
 * Cambia la contraseña de un usuario
 */
export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  const { redis, prefix } = await usersCol();

  // Obtener el usuario con contraseña
  const userData = await redis.get(`${prefix}${userId}`);
  if (!userData) {
    throw new Error("Usuario no encontrado");
  }

  const user = JSON.parse(userData);

  // Verificar la contraseña antigua
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña actual incorrecta");
  }

  // Hashear la nueva contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Actualizar la contraseña
  const updatedUser = {
    ...user,
    password: hashedPassword,
    updatedAt: new Date().toISOString()
  };

  await redis.set(`${prefix}${userId}`, JSON.stringify(updatedUser));

  return true;
}

/**
 * Elimina un usuario
 */
export async function deleteUser(userId: string) {
  const { redis, prefix } = await usersCol();
  
  // Obtener datos del usuario para eliminar índice de email
  const userData = await redis.get(`${prefix}${userId}`);
  if (userData) {
    const user = JSON.parse(userData);
    // Eliminar índice de email
    await redis.del(`users:email:${user.gmail}`);
  }
  
  // Eliminar usuario
  await redis.del(`${prefix}${userId}`);
  return true;
}

/**
 * Lista todos los usuarios (sin contraseñas)
 */
export async function listUsers() {
  const { redis, prefix } = await usersCol();
  
  // Obtener todas las keys de usuarios
  const keys = await redis.keys(`${prefix}*`);
  
  const users = [];
  for (const key of keys) {
    const userData = await redis.get(key);
    if (userData) {
      const user = JSON.parse(userData);
      const userId = key.replace(prefix, "");
      
      // Excluir contraseña
      const { password, ...userWithoutPassword } = user;
      users.push({
        _id: userId,
        ...userWithoutPassword
      });
    }
  }
  
  return users;
}