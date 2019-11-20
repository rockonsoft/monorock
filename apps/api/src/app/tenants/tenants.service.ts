import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DbTenant } from '../dal/entities/tenant.entity';

@Injectable()
export class TenantsService extends TypeOrmCrudService<DbTenant> {
  constructor(@InjectRepository(DbTenant) repo) {
    super(repo);
  }
}
