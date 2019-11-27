import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser, JWT_USER } from '@monorock/api-interfaces';
import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'firebase';

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

  loginWithToken(authedUser: User, token: string) {
    this.http.post('/api/tokenlogin', { username: JWT_USER, password: token }).subscribe((response: any) => {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + response.api_token);
      this.http.get<AppUser>('/api/me', { headers }).subscribe({
        next: appUser => {
          if (appUser) {
            console.log(appUser);
            appUser.apiToken = response.api_token;
            appUser.oathToken = token;
            appUser.isAnonymous = authedUser.isAnonymous;
            this._appUser.next(appUser);
          }
        }
      });
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
