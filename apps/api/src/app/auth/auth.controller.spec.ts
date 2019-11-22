import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        LocalStrategy,
        JwtStrategy,
        {
          provide: 'AuthService',
          useValue: {
            // Your mock
          }
        },
        {
          provide: 'UsersService',
          useValue: {
            // Your mock
          }
        },
        {
          provide: 'JwtService',
          useValue: {
            // Your mock
          }
        }
      ],
      controllers: [AuthController]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
