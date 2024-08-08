import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    @Expose()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    @Exclude({ toPlainOnly: true })
    password: string;
}
