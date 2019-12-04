import { Controller, UseGuards, UseInterceptors, ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { Crud } from '@nestjsx/crud';
import { DbTenant } from '../dal/entities/tenant.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbTenant
  }
})
//@UseInterceptors(RbackInterceptor)
@Controller('tenant')
export class TenantsController {
  constructor(public service: TenantsService) {}
}
