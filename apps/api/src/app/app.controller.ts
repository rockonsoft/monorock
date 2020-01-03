import { Controller, Get, UseGuards, Request, Logger, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile/:timestamp')
  async getProfile(@Request() req) {
    const timestamp = req.params.timestamp;
    Logger.log(`Received request on api/profile/${timestamp}`);
    //this is potentially the second call to the same function
    const fullUser = await this.usersService.getFullUser(req.user.userId);
    return fullUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('environment')
  async getEnv() {
    Logger.log(`Received request on api/environment`);
    return { build: process.env.BUILD_ID ? process.env.BUILD_ID : 'local', db_env: process.env.DB_ENV };
  }
}
