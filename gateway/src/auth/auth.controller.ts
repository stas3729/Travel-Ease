import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import {
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ description: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: AuthDto })
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res?: Response,
  ): Promise<{ msg: string }> {
    const response: { msg: string } = await this.authService.validateUser(
      authDto,
      res,
    );
    if (!response) throw new UnauthorizedException();
    return response;
  }

  @Post('logout')
  @ApiResponse({
    description: 'User logout, required to be logged in',
    status: 200,
  })
  logout(
    @Res() res: Response,
  ): Record<string, any> | 'You are not logged in to log out' {
    if (!res.cookie) {
      return 'You are not logged in to log out';
    }
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    return res.status(200).json({ message: 'Successfully logged out' });
  }
}
