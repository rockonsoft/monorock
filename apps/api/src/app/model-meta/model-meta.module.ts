//DbModelMeta

import { Module, Controller, UseGuards } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Injectable()
export class ModelMetaService extends TypeOrmCrudService<DbModelMeta> {
  constructor(@InjectRepository(DbModelMeta) repo) {
    super(repo);
  }
}

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbModelMeta
  }
})
@Controller('modelmeta')
export class ModelMetaController {
  constructor(public service: ModelMetaService) {}
}

@Module({
  imports: [TypeOrmModule.forFeature([DbModelMeta])],

  providers: [ModelMetaService],
  controllers: [ModelMetaController]
})
export class ModelMetaModule {}
