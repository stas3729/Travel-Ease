import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'shared/src/dto/create-user.dto';
import { SendEmailDto } from './mail.interface';
import { EmailsService } from './emails.service';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Controller()
export class EmailsMicroserviceController {
  constructor(
    private readonly emailsService: EmailsService,
    private configService: ConfigService,
  ) {}

  @MessagePattern({ cmd: 'signup_email' })
  async signupEMail(@Payload() createUserDto: CreateUserDto):  Promise<SMTPTransport.SentMessageInfo> {
    const sendEmailDto: SendEmailDto = {
      from: {
        name: this.configService.get<string>('FROM_NAME'),
        address: this.configService.get<string>('FROM_ADDRESS'),
      },
      recipient: {
        name: createUserDto.username,
        address: createUserDto.email,
      },
      subject: this.configService.get<string>('EMAIL_SUBJECT'),
      text: this.configService.get<string>('WELCOME_TEXT'),
    };
    return await this.emailsService.sendEmail(sendEmailDto);
  }
}
