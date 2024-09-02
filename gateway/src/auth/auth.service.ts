import { Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}
  async validateUser(
    { email, password }: AuthDto,
    res: Response,
  ): Promise<{ msg: string }> {
    const findUser = await lastValueFrom(
      this.natsClient.send({ cmd: 'findUser' }, email),
    );
    if (!findUser) return null;
    const isPasswordCorrect: boolean = await verify(
      findUser.password,
      password,
    );
    if (isPasswordCorrect) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = findUser;
      const token: string = this.jwtService.sign(rest);
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
      });
      return {
        msg: 'You signed in successfully!',
      };
    }
    return null;
  }
}
