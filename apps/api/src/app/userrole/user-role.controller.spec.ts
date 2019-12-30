import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user-role.controller';
import { UsersService } from '../users/users.service';

describe('User.Role Controller', () => {
  let controller: UserRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
      providers: [
        UsersService,
        {
          provide: 'UsersService',
          useValue: {
            // Your mock
          }
        }
      ]
    }).compile();

    controller = module.get<UserRoleController>(UserRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
