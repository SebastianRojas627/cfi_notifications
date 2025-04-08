import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  async sendEmail(@Body() sendNotificationDto: SendNotificationDto) {
    return this.notificationService.sendEmail(sendNotificationDto);
  }
}