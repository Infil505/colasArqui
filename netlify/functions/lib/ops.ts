import { authorsCol, publishersCol, usersCol } from "./db";
import { ObjectId } from "mongodb";
import * as bcrypt from "bcrypt";

function asId(id: any) {
  if (typeof id === "string" && /^[a-f0-9]{24}$/i.test(id)) {
    return new ObjectId(id);
  }
  return id;
}

// ============= AUTORES =============

export async function applyAuthor(
  action: "create" | "update" | "delete",
  payload: any
) {
  const col = await authorsCol();

  if (action === "create") {
    const { _id, ...rest } = payload;
    await col.insertOne({ ...rest, createdAt: new Date() });
    return;
  }

  if (action === "update") {
    const { _id, ...rest } = payload;
    await col.updateOne(
      { _id: asId(_id) },
      { $set: { ...rest, updatedAt: new Date() } }
    );
    return;
  }

  if (action === "delete") {
    const { _id } = payload;
    await col.deleteOne({ _id: asId(_id) });
  }
}

// ============= EDITORIALES =============

export async function applyPublisher(
  action: "create" | "update" | "delete",
  payload: any
) {
  const col = await publishersCol();

  if (action === "create") {
    const { _id, ...rest } = payload;
    await col.insertOne({ ...rest, createdAt: new Date() });
    return;
  }

  if (action === "update") {
    const { _id, ...rest } = payload;
    await col.updateOne(
      { _id: asId(_id) },
      { $set: { ...rest, updatedAt: new Date() } }
    );
    return;
  }

  if (action === "delete") {
    const { _id } = payload;
    await col.deleteOne({ _id: asId(_id) });
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
  const col = await usersCol();

  // Verificar si el usuario ya existe
  const existingUser = await col.findOne({ gmail: userData.gmail });
  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  // Hashear la contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // Insertar el nuevo usuario
  const result = await col.insertOne({
    gmail: userData.gmail,
    password: hashedPassword,
    name: userData.name,
    createdAt: new Date(),
  });

  return {
    _id: result.insertedId,
    gmail: userData.gmail,
    name: userData.name,
  };
}

/**
 * Autentica un usuario verificando email y contraseña
 */
export async function authenticateUser(gmail: string, password: string) {
  const col = await usersCol();

  // Buscar el usuario por email
  const user = await col.findOne({ gmail });
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  // Verificar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  // Retornar usuario sin la contraseña
  return {
    _id: user._id,
    gmail: user.gmail,
    name: user.name,
  };
}

/**
 * Obtiene un usuario por su ID (sin contraseña)
 */
export async function getUserById(userId: string | ObjectId) {
  const col = await usersCol();
  
  const user = await col.findOne(
    { _id: asId(userId) },
    { projection: { password: 0 } } // Excluir contraseña
  );

  return user;
}

/**
 * Actualiza los datos de un usuario
 */
export async function updateUser(
  userId: string | ObjectId,
  updates: { name?: string; gmail?: string }
) {
  const col = await usersCol();

  // Si se actualiza el email, verificar que no exista
  if (updates.gmail) {
    const existingUser = await col.findOne({
      gmail: updates.gmail,
      _id: { $ne: asId(userId) },
    });
    if (existingUser) {
      throw new Error("El email ya está en uso");
    }
  }

  await col.updateOne(
    { _id: asId(userId) },
    { $set: { ...updates, updatedAt: new Date() } }
  );

  return getUserById(userId);
}

/**
 * Cambia la contraseña de un usuario
 */
export async function changePassword(
  userId: string | ObjectId,
  oldPassword: string,
  newPassword: string
) {
  const col = await usersCol();

  // Obtener el usuario con contraseña
  const user = await col.findOne({ _id: asId(userId) });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  // Verificar la contraseña antigua
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error("Contraseña actual incorrecta");
  }

  // Hashear la nueva contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  // Actualizar la contraseña
  await col.updateOne(
    { _id: asId(userId) },
    { $set: { password: hashedPassword, updatedAt: new Date() } }
  );

  return true;
}

/**
 * Elimina un usuario
 */
export async function deleteUser(userId: string | ObjectId) {
  const col = await usersCol();
  await col.deleteOne({ _id: asId(userId) });
  return true;
}

/**
 * Lista todos los usuarios (sin contraseñas)
 */
export async function listUsers() {
  const col = await usersCol();
  const users = await col
    .find({}, { projection: { password: 0 } })
    .toArray();
  return users;
}