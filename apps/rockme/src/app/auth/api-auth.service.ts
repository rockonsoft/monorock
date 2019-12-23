import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser, JWT_USER, SUPER_USER_NAME, UserProfile } from '@monorock/api-interfaces';
import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from 'firebase';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private _appUser: BehaviorSubject<AppUser | null> = new BehaviorSubject(null);
  public readonly appUser: Observable<AppUser | null> = this._appUser.asObservable();

  constructor(private userAuth: UserAuthService, private http: HttpClient) {
    userAuth.oauthUser.subscribe({
      next: (oAuthUser: User) => {
        if (oAuthUser) {
          //get token from oathuser
          oAuthUser.getIdToken().then(token => {
            this.loginWithToken(oAuthUser, token);
          });
        } else {
          this._appUser.next(null);
        }
      }
    });
  }

  getUser(): AppUser {
    return this._appUser.value;
  }
  refreshToken() {
    if (!this._appUser.value) {
      console.error(`Could not request refresh token - no user set!`);
    } else {
      let headers = new HttpHeaders().set('user-id', this._appUser.value.userId);
      headers = headers.append('authorization', `Bearer ${this._appUser.value}`);
      //include the auth header so that interceptor does not try to add it again - it is expired at this point
      headers = headers.append('tenant-id', this._appUser.value.tenantExternalId);
      headers = headers.append('application-id', `${this._appUser.value.applicationId}`);

      console.debug(`Requesting new token for User:${this._appUser.value.userId}:${this._appUser.value.refreshToken}`);
      return this.http.post('/api/refresh', { token: this._appUser.value.refreshToken }, { headers });
    }
  }

  setUserToken(api_token: any) {
    const oldUser = this._appUser.value;
    oldUser.apiToken = api_token;
    this._appUser.next(oldUser);
  }

  updateUserToken(api_token: string) {
    if (this._appUser.value) {
      this._appUser.value.apiToken = api_token;
      this._appUser.next(this._appUser.value);
      console.debug(`Update token for User:${this._appUser.value.userId}:${api_token}`);
    } else {
      console.error(`Could not update user token - no user set!`);
    }
  }

  loginWithToken(authedUser: User, token: string) {
    return this.http.post('/api/tokenlogin', { username: JWT_USER, password: token }).subscribe((response: any) => {
      const user = response.user;
      user.apiToken = response.api_token;
      user.oathToken = token;
      user.isAnonymous = authedUser.isAnonymous;
      this._appUser.next(user);
    });
  }

  getToken() {
    if (!this._appUser.value) return null;
    return this._appUser.value.apiToken;
  }

  async logout() {
    await this.userAuth.logout();
  }
}

/* Notes:
Only does 'normal user authentication with the api'
The demo app has special requirement in that it has 2 signed in users
1. Normal User (could be anonymous or not)
2. Super User - elevated admin user that could do things like assign roles ect.
*/
