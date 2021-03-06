import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  //oathuser is the user from oauth provider
  private _oauthUser: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public readonly oauthUser: Observable<User | null> = this._oauthUser.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe({
      next: user => {
        if (user) {
          this.isLoggedIn = true;
          this._oauthUser.next(user);
        } else {
          //if there is no user - log in anonymously
          this.signInAnonymously().then(x => {
            console.debug('Anonymous sign in completed.');
          });
        }
      }
    });
  }

  async signInAnonymously(): Promise<boolean> {
    try {
      const credentials = await this.afAuth.auth.signInAnonymously();
      if (credentials) {
        this._oauthUser.next(credentials.user);
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  //   login(): Observable<boolean> {
  //     return of(true).pipe(
  //       delay(1000),
  //       tap(val => (this.isLoggedIn = true))
  //     );
  //   }

  async logout(): Promise<void> {
    this.isLoggedIn = false;
    const res = await this.afAuth.auth.signOut();
    this._oauthUser.next(null);
  }
}
