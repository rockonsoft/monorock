import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { RolesService } from './roles.service';
import { DbRole } from '../dal/entities/role.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbRole
  }
})
@Controller('roles')
export class RolesController {
  constructor(public service: RolesService) {}
}
