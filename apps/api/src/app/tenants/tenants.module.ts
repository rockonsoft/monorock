import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbTenant } from '../dal/entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DbTenant])],
  providers: [TenantsService],
  controllers: [TenantsController]
})
export class TenantsModule {}
