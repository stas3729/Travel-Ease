import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { EmailerService } from './mailer.service';

@Module({
  imports: [],
  controllers: [MailerController],
  providers: [EmailerService],
})
export class MailerModule {}
