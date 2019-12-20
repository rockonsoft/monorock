import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ArgumentsHost,
  BadRequestException
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { AppUser, getReadAccess, AccessItem, ActionScope } from '@monorock/api-interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { DbUserOwner } from '../dal/entities/user-owner.entity';
import { Repository, getManager } from 'typeorm';

interface Outcome {
  returnValue?: any;
  excludeFilter?: any;
  includeFilter?: any;
  requestIdUpdate?: any;
}

@Injectable()
export class HeaderInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const keys = Object.keys(request.headers);
    const url = request.url;
    const isLogin = url.indexOf('login') > -1;
    if (!isLogin) {
      const findTenant = keys.find(x => x === 'tenant-id');
      const findApplication = keys.find(x => x === 'application-id');
      if (!findTenant || !findApplication) {
        throw new BadRequestException('Header must contain tenant and application data');
      }
    }

    return next.handle();
  }
}
