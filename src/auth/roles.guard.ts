import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = requiredRoles.some((role) => user.role.includes(role));

    if (!hasRole) {
      throw new ForbiddenException({
        statusCode: 403,
        message: 'Acesso negado',
        requiredRoles,
        userRoles: user.roles,
        error: 'ROLE_NOT_ALLOWED',
      });
    }

    return true;
  }
}