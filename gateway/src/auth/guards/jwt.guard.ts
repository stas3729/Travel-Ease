import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const token = this.extractTokenFromCookies(request);

      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }
      const decodedToken = this.verifyToken(token);
      if (decodedToken) return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private extractTokenFromCookies(request: Request) {
    const token = request.headers.cookie.slice(6);
    return token;
  }

  private verifyToken(token: string) {
    const decodedToken = this.jwtService.verify(token);
    if (decodedToken) return true;
    return false;
  }
}
