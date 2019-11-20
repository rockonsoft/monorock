import { Controller } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Crud } from '@nestjsx/crud';
import { DbTenant } from '../dal/entities/tenant.entity';

@Crud({
  model: {
    type: DbTenant
  }
})
@Controller('tenants')
export class TenantsController {
  constructor(public service: TenantsService) {}
}
