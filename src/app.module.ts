import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { RedisSubscriberService } from './redis/redis-subcriber/redis-subcriber.service';
import emailConfig from './config/email.config';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [emailConfig]
    }),
    NotificationModule,
  ],
  controllers: [],
  providers: [RedisSubscriberService, NotificationService],
})
export class AppModule {}
