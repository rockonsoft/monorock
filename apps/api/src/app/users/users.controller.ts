import { Controller, Logger, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudRequest, ParsedRequest, Override } from '@nestjsx/crud';

import { UsersService } from './users.service';
import { DbUser } from '../dal/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Crud({
  model: {
    type: DbUser
  }
})
@Controller('users')
export class UsersController implements CrudController<DbUser> {
  constructor(public service: UsersService) {}
}
