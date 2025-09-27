import type { Handler } from "@netlify/functions";
import { publishersCol } from "./lib/db";
import { withCors, handleOptions } from "./lib/cors";

export const handler: Handler = async (event: { httpMethod: string; }) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "GET") {
    return withCors({ statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) });
  }

  const col = await publishersCol();
  const data = await col.find({}).sort({ createdAt: -1 }).toArray();
  const normalized = data.map((d: any) => ({ ...d, _id: d._id.toString() }));

  return withCors({ body: JSON.stringify(normalized) });
};
