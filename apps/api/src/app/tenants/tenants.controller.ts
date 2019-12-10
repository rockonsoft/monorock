import { Controller, UseGuards, UseInterceptors, ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Crud } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { DbTenant } from '../dal/entities/tenant.entity';

//@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbTenant
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'replaceOneBase', 'deleteOneBase']
  },
  query: {
    join: {
      users: {}
    }
  }
})
//@UseInterceptors(RbackInterceptor)
@Controller('tenants')
export class TenantsController {
  constructor(public service: TenantsService) {}
}
