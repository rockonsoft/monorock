import { Module, Controller, UseGuards } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';
import { AuthGuard } from '@nestjs/passport';
import { DbComment } from '../dal/entities/comment.entity';

@Injectable()
export class CommentsService extends TypeOrmCrudService<DbComment> {
  constructor(@InjectRepository(DbComment) repo) {
    super(repo);
  }
}

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbComment
  },
  params: {
    productId: {
      field: 'productId',
      type: 'number'
    },
    id: {
      field: 'id',
      type: 'number',
      primary: true
    }
  }
})
@Controller('/products/:productId/comments')
export class CommentsController {
  constructor(public service: CommentsService) {}
  // get base(): CrudController<DbComment> {
  //   return this;
  // }

  // @Override('getManyBase')
  // getAll(@ParsedRequest() req: CrudRequest) {
  //   return this.base.getManyBase(req);
  // }
}

@Module({
  imports: [TypeOrmModule.forFeature([DbComment])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
