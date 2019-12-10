import { Controller, Logger } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, ParsedRequest, Override } from '@nestjsx/crud';

import { UsersService } from './users.service';
import { DbUser } from '../dal/entities/user.entity';

@Crud({
  model: {
    type: DbUser
  }
})
@Controller('users')
export class UsersController implements CrudController<DbUser> {
  constructor(public service: UsersService) {}

  // get base(): CrudController<DbUser> {
  //   return this;
  // }

  // @Override('getManyBase')
  // getAll(@ParsedRequest() req: CrudRequest) {
  //   return this.base.getManyBase(req);
  // }

  // @Override('getOneBase')
  // getUser(@ParsedRequest() req: CrudRequest): Promise<DbUser> {
  //   Logger.log('Debug');
  //   Logger.log(req);
  //   return this.base.getOneBase(req);
  // }
}
