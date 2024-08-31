import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailsService {
  constructor(private configService: ConfigService) {}
  mailTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_AUTH_USER'),
        pass: this.configService.get<string>('EMAIL_AUTH_PASS'),
      },
    });
    return transporter;
  }

  async sendEmail(dto: SendEmailDto): Promise<SMTPTransport.SentMessageInfo> {
    const { from, recipient, text, subject } = dto;

    const transport = this.mailTransport();

    const options: Mail.Options = {
      from,
      to: recipient,
      subject,
      text,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
