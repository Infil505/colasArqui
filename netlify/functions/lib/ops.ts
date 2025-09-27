import { authorsCol, publishersCol } from "./db";
import { ObjectId } from "mongodb";

// Convierte a ObjectId si luce como 24 hex; si no, deja el valor tal cual.
// (Así no se rompe si algún día usas IDs custom string.)
function asId(id: any) {
  if (typeof id === "string" && /^[a-f0-9]{24}$/i.test(id)) {
    return new ObjectId(id);
  }
  return id;
}

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
