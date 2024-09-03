import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Expose()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Exclude({ toPlainOnly: true })
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
