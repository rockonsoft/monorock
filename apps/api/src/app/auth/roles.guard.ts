import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { SUPER_USER_NAME, getCreateAccess, getUpdateAccess, getDeleteAccess } from '@monorock/api-interfaces';
import { getReadAccess, AccessItem, ActionScope } from '@monorock/api-interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private hasAccess(method: string, accessItem: any): boolean {
    switch (method) {
      case 'GET':
        return getReadAccess(accessItem.access) !== ActionScope.none;
      case 'POST':
        return getCreateAccess(accessItem.access) !== ActionScope.none;
      case 'PATCH':
        return getUpdateAccess(accessItem.access) !== ActionScope.none;
      case 'PUT':
        return getCreateAccess(accessItem.access) !== ActionScope.none;
      case 'DELETE':
        return getDeleteAccess(accessItem.access) !== ActionScope.none;
      default:
        break;
    }
    return false;
  }

  //this action will only check if the route can be activated.
  // the case for own / exclude own will be handled in the interceptor
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const url: string = request.url;
    if (user.userId === SUPER_USER_NAME) return true;

    const accessProfile: AccessItem[] = user.accessProfile;

    return (
      accessProfile.findIndex(ac => {
        if (url.indexOf(ac.endpoint) > -1) return this.hasAccess(request.method, ac);
        else return false;
      }) !== -1
    );
  }
}
