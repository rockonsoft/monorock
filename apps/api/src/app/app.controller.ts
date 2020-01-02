import { Controller, Get, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    Logger.log('Received request on api/profile');
    Logger.log(req.user);
    //this is potentially the second call to the same function
    const fullUser = await this.usersService.getFullUser(req.user.userId);
    return fullUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('environment')
  async getEnv(@Request() req) {
    Logger.log('Received request on api/environment');
    return process.env;
  }
}
