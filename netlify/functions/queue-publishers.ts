import type { Handler } from "@netlify/functions";
import { enqueueMessage } from "./lib/queue";
import { withCors, handleOptions } from "./lib/cors";

export const handler: Handler = async (event: { httpMethod: string; body: any }) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") {
    return withCors({
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    });
  }

  const { action, payload } = JSON.parse(event.body || "{}");
  if (!["create", "update", "delete"].includes(action)) {
    return withCors({
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid action" }),
    });
  }

  await enqueueMessage({ entity: "publisher", action, payload });
  return withCors({
    statusCode: 202,
    body: JSON.stringify({ message: "Enqueued", action }),
  });
};
