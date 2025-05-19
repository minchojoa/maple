import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, 'secret');
      request.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}