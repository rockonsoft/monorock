import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbUser } from '../dal/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DbUser])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
