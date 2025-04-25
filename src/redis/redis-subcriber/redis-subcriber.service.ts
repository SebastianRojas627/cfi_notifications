// src/redis/redis-subscriber.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { NotificationService } from 'src/notification/notification.service';
import { subscribe } from '../redis.pubsub';
import { CHANNELS } from '../channels';

@Injectable()
export class RedisSubscriberService implements OnModuleInit {
  constructor(private readonly notificationService: NotificationService) {}

  async onModuleInit() {
    // This will be called once the service is initialized
    await this.registerListeners();
  }

  async registerListeners() {
    await subscribe(CHANNELS.INFO_REQUEST, async (message) => {
      if (message.type === 'REQUEST_SUBMITTED') {
        const { requestId, email } = message.data;

        await this.notificationService.sendEmail({to: email});
      }
    });

    console.log('✅ Redis listeners registered');
  }
}
