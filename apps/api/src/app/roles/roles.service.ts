import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DbRole } from '../dal/entities/role.entity';

@Injectable()
export class RolesService extends TypeOrmCrudService<DbRole> {
  constructor(@InjectRepository(DbRole) repo) {
    super(repo);
  }
}
