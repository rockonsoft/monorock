import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { DbRole } from '../dal/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DbRole])],

  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
