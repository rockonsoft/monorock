import { Module, Controller } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { DbApplication } from '../dal/entities/application.entity';

@Injectable()
export class HostedApplicationService extends TypeOrmCrudService<DbApplication> {
  constructor(@InjectRepository(DbApplication) repo) {
    super(repo);
  }
}

@Crud({
  model: {
    type: DbApplication
  }
})
@Controller('hostedapplication')
export class HostedApplicationController {
  constructor(public service: HostedApplicationService) {}
}

@Module({
  imports: [TypeOrmModule.forFeature([DbApplication])],

  providers: [HostedApplicationService],
  controllers: [HostedApplicationController]
})
export class HostedApplicationModule {}
