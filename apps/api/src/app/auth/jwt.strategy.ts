import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_JWT_TOKEN
    });
  }

  async validate(payload: any) {
    return this.users.getFullUser(payload.sub);
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
