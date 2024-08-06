import { Address } from "nodemailer/lib/mailer";

export interface SendEmailDto {
    from: Address,
    recipients: string;
    subject: string;
    html?: string;
    text?: string;
    placeHolderReplacements?: Record<string, string>;
}
