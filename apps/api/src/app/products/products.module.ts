import { Module, Controller, UseGuards } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { DbProduct } from '../dal/entities/product.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<DbProduct> {
  constructor(@InjectRepository(DbProduct) repo) {
    super(repo);
  }
}

//@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbProduct
  }
})
@Controller('products')
export class ProductsController {
  constructor(public service: ProductsService) {}
}

@Module({
  imports: [TypeOrmModule.forFeature([DbProduct])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
