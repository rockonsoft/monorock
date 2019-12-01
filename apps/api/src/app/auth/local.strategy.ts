import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JWT_USER, AppUser } from '@monorock/api-interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, private userService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    let user = null;
    if (username === JWT_USER) {
      //use firebase sdk to validate token
      const decodedToken = await this.authService.validateFirebaseToken(password);
      if (decodedToken) {
        let anonymous = false;
        if (decodedToken.provider_id === 'anonymous') {
          anonymous = true;
        }
        const savedUser: AppUser = {
          userId: decodedToken.user_id,
          display: anonymous ? decodedToken.provider_id : decodedToken.name,
          picture: anonymous ? null : decodedToken.picture,
          email: anonymous ? null : decodedToken.email,
          isAnonymous: anonymous
        };
        const upsertedUser = await this.userService.upsertUser(savedUser);
        return {
          token: decodedToken,
          user: upsertedUser
        };
      } else {
        //not authenticated - throw
      }
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

/*
In vanilla Passport, you configure a strategy by providing two things:
1) A set of options that are specific to that strategy. For example, in a JWT strategy, you might provide a secret to sign tokens.
2) A "verify callback", which is where you tell Passport how to interact with your user store (where you manage user accounts). Here, you verify whether a user exists (and/or create a new user), and whether their credentials are valid. The Passport library expects this callback to return a full user if the validation succeeds, or a null if it fails (failure is defined as either the user is not found, or, in the case of passport-local, the password does not match).

With @nestjs/passport, you configure a Passport strategy by extending the PassportStrategy class. 
You pass the strategy options (item 1 above) by calling the super() method in your subclass, optionally passing in an options object. 
You provide the verify callback (item 2 above) by implementing a validate() method in your subclass.
*/
