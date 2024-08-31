import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res?: Response,
  ) {
    const response = await this.authService.validateUser(authDto, res);
    if (!response) throw new UnauthorizedException();
    return response;
  }
}
