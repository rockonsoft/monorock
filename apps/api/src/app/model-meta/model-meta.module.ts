//DbModelMeta

import { Module, Controller } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';

@Injectable()
export class ModelMetaService extends TypeOrmCrudService<DbModelMeta> {
  constructor(@InjectRepository(DbModelMeta) repo) {
    super(repo);
  }
}

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
