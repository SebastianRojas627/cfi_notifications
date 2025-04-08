import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendNotificationDto } from 'src/dto/send-notification.dto';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(
    private configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'silas.hoppe56@ethereal.email',
          pass: 'bj2uEzpbsVSZWkwdXX'
      }
  });
  
  }

  async sendEmail(sendNotificationDto: SendNotificationDto) {

    const { to, subject, text} = sendNotificationDto;

    const from = this.configService.get('email.user')

    const info = await this.transporter.sendMail({
      from: `"Notificacion Service" <${from}>`,
      to,
      subject,
      text,
    })

    console.log('Email sent:', info.messageID)
    return info;
  }
}
