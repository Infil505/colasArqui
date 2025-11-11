import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (client && client.isOpen) return client;
  
  // Configuración para Redis Cloud
  client = createClient({
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD || 'Rh2cokkGky1SxlRAY9PL5WpwKQwskBIp',
    socket: {
      host: process.env.REDIS_HOST || 'redis-17610.c13.us-east-1-3.ec2.redns.redis-cloud.com',
      port: parseInt(process.env.REDIS_PORT || '17610'),
      reconnectStrategy: (retries) => {
        if (retries > 10) {
          return new Error("Demasiados intentos de reconexión");
        }
        return retries * 100;
      }
    }
  });

  client.on("error", (err) => console.error("Redis Client Error", err));
  
  await client.connect();
  return client;
}

export async function authorsCol() {
  const redis = await getRedisClient();
  return {
    redis,
    prefix: "authors:"
  };
}

export async function publishersCol() {
  const redis = await getRedisClient();
  return {
    redis,
    prefix: "publishers:"
  };
}

export async function usersCol() {
  const redis = await getRedisClient();
  return {
    redis,
    prefix: "users:"
  };
}