import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from 'src/notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
