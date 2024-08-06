import { Controller } from '@nestjs/common';
import { EmailerService } from './mailer.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from 'common/src/dto/create-user.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { ConfigService } from '@nestjs/config';

@Controller()
export class MailerController {
  constructor(
    private emailerService: EmailerService,
    private configService: ConfigService,
  ) {}

  @EventPattern('user_created')
  async sendMail(@Payload() dto: CreateUserDto) {
    const emailDto: SendEmailDto = {
      from: {
        name: 'Travel-Ease',
        address: 'stanislavkravchenko17@gmail.com',
      },
      recipients: dto.email,
      subject: `Hello, ${dto.username}!. Welcome to Travel-Ease`,
      text: 'We are happy to see you in Travel-Ease',
    };
    return await this.emailerService.sendEmail(emailDto);
  }
}
