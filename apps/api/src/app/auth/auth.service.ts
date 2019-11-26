import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as admin from 'firebase-admin';
const creds = admin.credential.applicationDefault();

console.log(creds);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://monorock.firebaseio.com'
});

@Injectable()
export class AuthService {
  access_token: string;
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async loginWithToken(user: any, body: any) {
    const payload = { username: user.provider_id, sub: user.user_id, aud: user.aud };
    return this.jwtService.sign(payload);
  }

  async validateFirebaseToken(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      let uid = decodedToken.uid;
      return decodedToken;
    } catch (error) {
      console.error(error);
    }
    return null;
  }
}
