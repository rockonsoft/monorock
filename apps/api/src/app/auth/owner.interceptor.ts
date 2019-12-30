import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
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
import { UserContextWrapper } from './user-context-wrapper';
import { Observable, of } from 'rxjs';

@Injectable()
export class OwnerInterceptor implements NestInterceptor {
  constructor(private ownerService: OwnerService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const wrapper = new UserContextWrapper(context);
    //return Promise.resolve(next.handle());
    return this.handleCall(wrapper, next);
  }

  async handleCall(wrapper: UserContextWrapper, next: CallHandler<any>): Promise<Observable<any>> {
    Logger.log(`handleCall:${wrapper.model}:${wrapper.accessRight}:${wrapper.instanceId}`);
    if (wrapper.accessRight === ActionScope.ownExcluded && wrapper.instanceId) {
      const owned = await this.ownerService.getOwned(wrapper.user, wrapper.modelId);
      const targetedAtOwn = owned.find(x => x.ownedId === wrapper.instanceId);
      Logger.log(`excluding own ${wrapper.model}`);
      if (targetedAtOwn) {
        //this action is on the user's own instance
        throw new BadRequestException(`Not allowed to ${wrapper.method} on own ${wrapper.model}`);
      } else return next.handle();
    } else if (wrapper.method === 'POST' && wrapper.accessRight === ActionScope.own) {
      return next.handle().pipe(
        map(data => {
          return this.ownerService
            .setOwner(wrapper.user, wrapper.modelId, data.id)
            .then(x => {
              Logger.log(`Updated owner on created ${wrapper.model}`);
              return data;
            })
            .catch(err => {
              Logger.error(err);
              return data;
            });
        })
      );
    } else if (wrapper.method === 'GET' && wrapper.accessRight === ActionScope.own) {
      return next.handle().pipe(
        map(data => {
          return this.ownerService
            .getOwned(wrapper.user, wrapper.modelId)
            .then(owned => {
              //should just be list of ids
              const idsOfObjectsOwnedByUser = owned.map(x => x.ownedId);
              Logger.log(`filtering own ${wrapper.model}`);
              if (data instanceof Array) {
                return data.filter(x => idsOfObjectsOwnedByUser.indexOf(x.id) > -1);
              } else {
                if (idsOfObjectsOwnedByUser.indexOf(data.id) === -1) {
                  throw new NotFoundException(`User does not own ${wrapper.model}`);
                } else return data;
              }
            })
            .catch(err => {
              Logger.error(err);
              return data;
            });
        })
      );
    } else {
      return next.handle();
    }
  }
}
