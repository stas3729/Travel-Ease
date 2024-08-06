import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Expose()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  @Exclude({ toPlainOnly: true })
  password: string;
}
