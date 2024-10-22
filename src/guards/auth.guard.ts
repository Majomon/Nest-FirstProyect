import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NmRkN2MzZi1hN2U2LTRiZWQtYTVkZC0wMDcwYTVlN2RmNWYiLCJpZCI6Ijg2ZGQ3YzNmLWE3ZTYtNGJlZC1hNWRkLTAwNzBhNWU3ZGY1ZiIsImVtYWlsIjoiYWxnb0BhbGdvLmNvbSIsImlhdCI6MTcyOTYwNzE5OCwiZXhwIjoxNzI5NjEwNzk4fQ.s-7pkBJtfUt2QbeK-nhnECuzywpMr8sxqhsfUzmqz1A
    // Por lo de arriba es que se usa el split
    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) {
      throw new UnauthorizedException('Bearer Token no existe');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      payload.roles = ['admin'];

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido');
    }
  }
}
