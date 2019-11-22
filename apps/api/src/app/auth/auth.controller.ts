import { Controller, Get, UseGuards, Req, Res, Post, Request, Body, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccessCheckResult } from '@monorock/api-interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('tokenlogin')
  async login(@Request() req) {
    Logger.log('Received request on api/tokenlogin');
    //req.user contains decode JWT from google
    Logger.log('got this user from hacked local strategy', req.user);
    //should be: {
    //   token: decodedToken,
    //   user: upsertedUser
    // };
    //req.body contains the original user:pwd passed in from client
    const newToken = await this.authService.loginWithToken(req.user.token, req.body);
    Logger.log(`generated ${newToken} for user:${req.user.user.display}`);
    return {
      api_token: newToken,
      user: req.user.user
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('checkaccess')
  async checkAccess(@Request() req): Promise<AccessCheckResult> {
    Logger.log(`Check access for user:${req.user.userId}`);
    const res: AccessCheckResult = {
      hasAccess: true
    };
    return res;
  }
}
