import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RolesService } from './roles.service';
import { DbRole } from '../dal/entities/role.entity';

@Crud({
  model: {
    type: DbRole
  }
})
@Controller('roles')
export class RolesController {
  constructor(public service: RolesService) {}
}
