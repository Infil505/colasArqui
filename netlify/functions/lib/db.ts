import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDB(): Promise<Db> {
  if (db) return db;
  const uri = process.env.MONGODB_URI!;
  const dbName = process.env.MONGODB_DB!;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db!;
}

export async function authorsCol() {
  const d = await getDB();
  return d.collection("authors");
}
export async function publishersCol() {
  const d = await getDB();
  return d.collection("publishers");
}
