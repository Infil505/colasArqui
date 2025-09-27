import amqplib from "amqplib";

export type QueueMessage = {
  entity: "author" | "publisher";
  action: "create" | "update" | "delete";
  payload: any;
};

export async function withChannel<T>(fn: (ch: amqplib.Channel) => Promise<T>): Promise<T> {
  const url = process.env.CLOUDAMQP_URL!;
  const queue = process.env.QUEUE_NAME || "";
  const conn = await amqplib.connect(url);
  try {
    const ch = await conn.createChannel();
    await ch.assertQueue(queue, { durable: true });
    const res = await fn(ch);
    await ch.close();
    return res;
  } finally {
    await conn.close();
  }
}

export async function enqueueMessage(msg: QueueMessage) {
  return withChannel(async (ch) => {
    const queue = process.env.QUEUE_NAME || "";
    const ok = ch.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
      contentType: "application/json",
      deliveryMode: 2,
    });
    return ok;
  });
}
