import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { RolesService } from './roles.service';
import { DbRole } from '../dal/entities/role.entity';
import { AuthGuard } from '@nestjs/passport';
import { getManager } from 'typeorm';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Crud({
  model: {
    type: DbRole
  }
})
@Controller('roles')
export class RolesController {
  constructor(public service: RolesService) {}
  get base(): CrudController<DbRole> {
    return this;
  }
  @Override()
  getMany(@ParsedRequest() req: CrudRequest) {
    return this.base.getManyBase(req);
  }
}
