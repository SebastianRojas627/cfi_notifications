import { subscribe } from "src/redis/redis.pubsub";
import { CHANNELS } from "src/redis/channels";
import { NotificationService } from "src/notification/notification.service";

export async function registerInfoRequestListener() {
  await subscribe(CHANNELS.INFO_REQUEST, async (message) => {
    if(message.type === 'REQUEST_SUBMITTED') {
      const { requestId, email } = message.data;

      await NotificationService.testListener(requestId, email)
    }
  })
}