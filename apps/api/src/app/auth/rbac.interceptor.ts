import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ArgumentsHost, Logger } from '@nestjs/common';
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
export class RbackInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const controllerClass = context.getClass();

    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const args = context.getArgs();
    const inmsg: any = args[0];

    const url: string = request.url;
    const pieces = url.split('/');
    const model = pieces[2]; // /api/??? /????
    const user: AppUser = inmsg.user;

    const accessItem = user.accessProfile.find(x => {
      return x.model === model;
    });
    if (!accessItem) return of(null);

    let filterId = -1;
    let outcome: Outcome = null;
    switch (inmsg.method) {
      case 'GET':
        outcome = await this.handleGet(url, accessItem, user);
        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
      default:
        break;
    }
    if (outcome) {
      if (outcome.returnValue) return of(outcome.returnValue);
      if (outcome.requestIdUpdate) {
        inmsg.url = request.url + '/' + outcome.requestIdUpdate;
      }
    }

    return next.handle().pipe(
      map(data => {
        if (filterId) {
          const dataArray = data as any[];
          const filteredData = dataArray.filter(x => x.id === filterId);
          return of(filteredData);
        }
        return { data };
      })
    );
  }

  async handleGet(url: string, accessItem: AccessItem, user: AppUser): Promise<Outcome> {
    const pieces = url.split('/');
    const specificGet = pieces.length > 3; //pieces contains empty''
    const readAccess = getReadAccess(accessItem.access);
    switch (readAccess) {
      case ActionScope.none: {
        Logger.log(`No access to list/get ${accessItem.model}`);
        if (specificGet) return { returnValue: null };
        else return { returnValue: [] };
      }
      case ActionScope.all:
        Logger.log(`No restrictions to list/get to ${accessItem.model}`);
        break;
      case ActionScope.own:
      case ActionScope.ownExcluded: {
        const entityManager = getManager();
        const userOwned = await entityManager
          .createQueryBuilder(DbUserOwner, 'userowner')
          .where('userowner.ownerId=:userId', { userId: user.userId })
          .andWhere('userowner.modelId=:modelId', { modelId: accessItem.modelId })
          .getOne();

        if (readAccess === ActionScope.own) {
          Logger.log(`result filtered for own ${accessItem.model}`);
          return { requestIdUpdate: userOwned.id };
        } else {
          Logger.log(`result to exclude own ${accessItem.model}`);
          return { excludeFilter: userOwned.id };
        }
      }
      default:
        return { returnValue: null };
    }
  }
}
