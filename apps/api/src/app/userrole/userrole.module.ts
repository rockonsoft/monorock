import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [UserRoleController]
})
export class UserroleModule {}
