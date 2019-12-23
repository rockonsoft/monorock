import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbUser } from '../dal/entities/user.entity';
import { UsersController } from './users.controller';
import { OwnerService } from './owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([DbUser])],
  providers: [UsersService, OwnerService],
  exports: [UsersService, OwnerService],
  controllers: [UsersController]
})
export class UsersModule {}
