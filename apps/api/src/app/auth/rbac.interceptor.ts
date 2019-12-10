import { Injectable, NestInterceptor, ExecutionContext, CallHandler, ArgumentsHost } from '@nestjs/common';
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
    console.log(controllerClass);

    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log('Before...');
    const args = context.getArgs();
    console.log(`args have -  ${args.length}`);
    const inmsg: any = args[0];

    console.log(`${inmsg.method} -  ${inmsg.url}`);

    const url: string = request.url;
    const pieces = url.split('/');
    const model = pieces[2]; // /api/??? /????
    const user: AppUser = inmsg.user;
    console.log(pieces);
    console.log(model);
    console.log(user);

    const accessItem = user.accessProfile.find(x => {
      return x.model === model;
    });
    console.log(accessItem);
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
          console.log('########### Data ########');
          console.log(data);
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
        console.log(`No access to list/get ${accessItem.model}`);
        if (specificGet) return { returnValue: null };
        else return { returnValue: [] };
      }
      case ActionScope.all:
        console.log(`No restrictions to list/get to ${accessItem.model}`);
        break;
      case ActionScope.own:
      case ActionScope.ownExcluded: {
        const entityManager = getManager();
        const userOwned = await entityManager
          .createQueryBuilder(DbUserOwner, 'userowner')
          .where('userowner.ownerId=:userId', { userId: user.userId })
          .andWhere('userowner.modelId=:modelId', { modelId: accessItem.modelId })
          .getOne();

        console.log(userOwned);
        if (readAccess === ActionScope.own) {
          console.log(`result filtered for own ${accessItem.model}`);
          return { requestIdUpdate: userOwned.id };
        } else {
          console.log(`result to exclude own ${accessItem.model}`);
          return { excludeFilter: userOwned.id };
        }
      }
      default:
        return { returnValue: null };
    }
  }
}
