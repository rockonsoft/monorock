import { Controller, Get, UseGuards, Request, Logger } from '@nestjs/common';

import { Message } from '@monorock/api-interfaces';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    Logger.log('Received request on api/profile');
    return req.user;
  }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
}
