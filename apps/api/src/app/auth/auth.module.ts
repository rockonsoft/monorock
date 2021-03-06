import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HeaderInterceptor } from './required-header.interceptor';
import { RolesGuard } from './roles.guard';
import { OwnerInterceptor } from './owner.interceptor';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.API_JWT_TOKEN ? process.env.API_JWT_TOKEN : 'TEST_TOKEN',
      signOptions: { expiresIn: '900s' }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: HeaderInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: OwnerInterceptor
    }
  ]
})
export class AuthModule {}
