import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendNotificationDto } from 'src/dto/send-notification.dto';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'itzel.rodriguez@ethereal.email',
        pass: '3Wc6Yp6KAYSQrz7uYQ',
      },
    });
  }

  async sendEmail(sendNotificationDto: SendNotificationDto) {
    const { to} = sendNotificationDto;

    const from = this.configService.get('email.user');

    const info = await this.transporter.sendMail({
      from: `"Notificacion Service" <${from}>`,
      to,
      subject: "Nodemailer Test",
      text: "This is a test notification alert letting know the user that a new information request has been filed by a police investigator",
    });

    console.log('Email sent:', info.messageID);
    return info;
  }

  static testListener(requestId: string, email: string) {
    console.log('correo enviado a', requestId, email);
  }
}
