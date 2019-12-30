import { ExecutionContext, Logger } from '@nestjs/common';
import {
  AppUser,
  getReadAccess,
  AccessItem,
  ActionScope,
  getCreateAccess,
  getUpdateAccess,
  getDeleteAccess
} from '@monorock/api-interfaces';

export class UserContextWrapper {
  user: AppUser;
  accessRight: ActionScope = ActionScope.own;
  method: string;
  model: string;
  modelId: number;
  instanceId: number;
  constructor(context: ExecutionContext = null) {
    if (context) {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const url: string = request.url;
      const args = context.getArgs();
      if (!args.length) return;
      const inmsg: any = args[0];
      this.method = inmsg.method;
      this.setModelAndInstanceId(url);
      Logger.log(`Model ${this.model}: Method:${inmsg.method}`);
      if (!inmsg.user) return;
      this.user = inmsg.user;
      const accessProfile: AccessItem[] = this.user && this.user.accessProfile ? this.user.accessProfile : [];
      const accessItem = accessProfile.find(x => x.endpoint.indexOf(this.model) > -1);
      this.accessRight = accessItem ? this.getAccess(inmsg.method, accessItem) : ActionScope.none;
      if (!accessItem) return;
      this.modelId = accessItem.modelId;
    }
  }

  setModelAndInstanceId(url: string) {
    const pieces = url.split('/');
    const last = pieces[pieces.length - 1];
    const secondLast = pieces[pieces.length - 2];
    const num = Number(last);
    this.model = isNaN(num) ? last : secondLast;
    this.instanceId = isNaN(num) ? -1 : num;
  }

  getAccess(method: string, access: AccessItem) {
    switch (method) {
      case 'GET':
        return getReadAccess(access.access);
      case 'POST':
        return getCreateAccess(access.access);
      case 'PUT':
      case 'PATCH':
        return getUpdateAccess(access.access);
      case 'DELETE':
        return getDeleteAccess(access.access);
      default:
        return ActionScope.none;
    }
  }
}
