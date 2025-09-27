import type { Handler } from "@netlify/functions";
import amqplib from "amqplib";
import { handleOptions, withCors } from "./lib/cors";
import { applyAuthor, applyPublisher } from "./lib/ops";

export const handler: Handler = async (event: { httpMethod: string; }) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") {
    return withCors({
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    });
  }

  const url = process.env.CLOUDAMQP_URL!;
  const queue = process.env.QUEUE_NAME || "";
  const max = parseInt(process.env.MAX_BATCH || "50", 10);

  const conn = await amqplib.connect(url);
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });

  let processed = 0;

  while (processed < max) {
    const msg = await ch.get(queue, { noAck: false });
    if (!msg) break;

    try {
      const data = JSON.parse(msg.content.toString());
      if (data.entity === "author") {
        await applyAuthor(data.action, data.payload);
      } else if (data.entity === "publisher") {
        await applyPublisher(data.action, data.payload);
      }
      ch.ack(msg);
      processed++;
    } catch (e) {
      ch.nack(msg, false, false);
      console.error("❌ Error procesando mensaje:", e);
    }
  }

  await ch.close();
  await conn.close();

  return withCors({ body: JSON.stringify({ processed }) });
};
