import { Module, Controller, UseGuards } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';
import { AuthGuard } from '@nestjs/passport';
import { DbComment } from '../dal/entities/comment.entity';
import { DbAccessRight } from '../dal/entities/access-right.entity';

@Injectable()
export class AccessRightsService extends TypeOrmCrudService<DbAccessRight> {
  constructor(@InjectRepository(DbAccessRight) repo) {
    super(repo);
  }
}

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbAccessRight
  },
  params: {
    roleId: {
      field: 'roleId',
      type: 'number'
    },
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  }
})
@Controller('/roles/:roleId/accessrights')
export class AccessRightsController {
  constructor(public service: AccessRightsService) {}
}

@Module({
  imports: [TypeOrmModule.forFeature([DbAccessRight])],
  providers: [AccessRightsService],
  controllers: [AccessRightsController]
})
export class AccessRightsModule {}
