import { Controller, Get, UseGuards, Req, Res, Post, Request, Body, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AccessCheckResult } from '@monorock/api-interfaces';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Request() req) {
    Logger.log('Received request on api/login');
    Logger.log('got this user from local strategy');
    Logger.log(req.user);
    //should be: {
    //   token: decodedToken,
    //   user: upsertedUser
    // };
    //req.body contains the original user:pwd passed in from client
    const newToken = await this.authService.generateToken(req.user);
    Logger.log(`generated ${newToken} for user:${req.user.userId}`);
    return {
      api_token: newToken,
      user: req.user
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('tokenlogin')
  async login(@Request() req) {
    Logger.log('Received request on api/tokenlogin');
    Logger.log(req.user);
    //should be: {
    //   token: decodedToken,
    //   user: upsertedUser
    // };
    //req.body contains the original user:pwd passed in from client
    const newToken = await this.authService.loginWithToken(req.user.token, req.body);
    const display = req.user.user ? req.user.user.display : 'unknown';
    Logger.log(`generated ${newToken} for user:${display}`);
    return {
      api_token: newToken,
      user: req.user.user
    };
  }

  @Post('refresh')
  async refreshToken(@Request() req) {
    Logger.log('Received request on api/refresh');
    //req.user contains decode JWT from google
    const { token } = req.body;
    Logger.log(`refreshToken:${req.url}`);

    Logger.log(token);

    const newToken = await this.authService.refreshUserToken(token);
    Logger.log(`generated ${newToken} for user refresh`);
    return {
      api_token: newToken
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
