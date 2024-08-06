import { Module } from "@nestjs/common";
import { MailerController } from "./mailer.controller";
import { EmailerService } from "./mailer.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [],
    controllers: [MailerController],
    providers: [EmailerService],
})
export class MailerModule {}
