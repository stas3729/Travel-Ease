import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
