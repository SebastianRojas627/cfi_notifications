import { redis } from "./redis.client";

export async function subscribe(channel: string, handler: (msg: any) => void) {
  await redis.subscribe(channel, (raw) => {
    try {
      const data = JSON.parse(raw);
      handler(data);
    } catch (e) {
      console.error('Failed to parse pub/sub message:', raw);
    }
  });
}