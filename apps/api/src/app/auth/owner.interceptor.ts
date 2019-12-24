import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, NotFoundException } from '@nestjs/common';
import { map } from 'rxjs/operators';
import {
  AppUser,
  getReadAccess,
  AccessItem,
  ActionScope,
  getCreateAccess,
  getUpdateAccess,
  getDeleteAccess
} from '@monorock/api-interfaces';
import { OwnerService } from '../users/owner.service';
import { logger } from '../../main';

interface Outcome {
  returnValue?: any;
  excludeFilter?: any;
  includeFilter?: any;
  requestIdUpdate?: any;
}

@Injectable()
export class OwnerInterceptor implements NestInterceptor {
  constructor(private ownerService: OwnerService) {}

  private getAccess(method: string, access: AccessItem) {
    switch (method) {
      case 'GET':
        return getReadAccess(access.access);
      case 'POST':
        return getCreateAccess(access.access);
      case 'PUT':
        return getUpdateAccess(access.access);
      case 'DELETE':
        return getDeleteAccess(access.access);
      default:
        return ActionScope.none;
    }
  }
  getModel(method: any, url: string) {
    const pieces = url.split('/');
    const last = pieces[pieces.length - 1];
    const secondLast = pieces[pieces.length - 2];
    const num = Number(last);
    return isNaN(num) ? last : secondLast;
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const ctx = context.switchToHttp();
    //const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const args = context.getArgs();
    const inmsg: any = args[0];

    const url: string = request.url;
    const model = this.getModel(inmsg.method, url); //pieces[pieces.length - 1]; // /api/??? /????
    const user: AppUser = inmsg.user;

    Logger.log(`Model ${model}: Method:${inmsg.method}`);

    const accessProfile: AccessItem[] = user && user.accessProfile ? user.accessProfile : [];
    const accessItem = accessProfile.find(x => x.endpoint.indexOf(model) > -1);

    const accessRight = accessItem ? this.getAccess(inmsg.method, accessItem) : ActionScope.none;
    if (inmsg.method === 'POST' && accessRight === ActionScope.own) {
      return next.handle().pipe(
        map(data => {
          return this.ownerService
            .setOwner(user, accessItem.modelId, data.id)
            .then(x => {
              Logger.log(`Updated owner on created ${model}`);
              return data;
            })
            .catch(err => {
              console.log(err);
              return data;
            });
        })
      );
    } else if (inmsg.method === 'GET' && accessRight === ActionScope.own) {
      return next.handle().pipe(
        map(data => {
          return this.ownerService
            .getOwned(user, accessItem.modelId)
            .then(owned => {
              //should just be list of ids
              const ownedIds = owned.map(x => x.ownedId);
              console.log(`filtering own ${accessItem.model}`);
              if (data instanceof Array) {
                return data.filter(x => ownedIds.indexOf(x.id) > -1);
              } else {
                if (ownedIds.indexOf(data.id) === -1) {
                  throw new NotFoundException(`User does not own ${accessItem.model}`);
                } else return data;
              }
            })
            .catch(err => {
              console.log(err);
              return data;
            });
        })
      );
    } else {
      Logger.log(`owner intercepton - nothing to do ${url}`);
      return next.handle();
    }
  }
}
