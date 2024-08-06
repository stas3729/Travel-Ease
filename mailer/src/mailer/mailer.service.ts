import { Injectable } from "@nestjs/common";
import { createTransport, Transporter } from 'nodemailer';
import { SendEmailDto } from "./dto/send-email.dto";
import Mail from "nodemailer/lib/mailer";
import { ConfigService } from "@nestjs/config";
import { log } from "console";
import SMTPTransport from "nodemailer/lib/smtp-transport";

@Injectable()
export class EmailerService {
    constructor(private configService: ConfigService) {}
    
    mailTransport(): Transporter {
        const transporter = createTransport({
            service: 'gmail',
            port: 465,
            secure: false,
            auth: {
                user: 'stanislavkravchenko17@gmail.com',
                pass: 'eqdt mbwk cokn piiy ',
            },
        });
        return transporter;
    }

    async sendEmail(dto: SendEmailDto): Promise<SMTPTransport.SentMessageInfo> {
        const { from, recipients, subject, html, text, placeHolderReplacements } = dto;

        const transport = this.mailTransport();

        const options: Mail.Options = {
            from: from ?? {
                name: 'Travel-Ease',
                address: 'stanislavkravcheno17@gmail.com',
            },
            to: recipients,
            subject,
            html,
            text
        }
        try {
            const result = await transport.sendMail(options);
            return result;
        } catch (error) {
            throw error;
        }
    }
}
