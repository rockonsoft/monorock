import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  UserProfile,
  AccessItem,
  ActionScope,
  getReadAccess,
  getCreateAccess,
  getUpdateAccess,
  getDeleteAccess
} from '@monorock/api-interfaces';
import { ApiAuthService } from '../auth/api-auth.service';
import { map, tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private _userProfile: BehaviorSubject<UserProfile | null> = new BehaviorSubject(null);
  public readonly userProfile: Observable<UserProfile | null> = this._userProfile.asObservable();

  constructor(private http: HttpClient, apiAuthService: ApiAuthService) {
    apiAuthService.appUser.subscribe({
      next: user => {
        if (user) {
          this.getProfile().subscribe({
            next: p => {
              console.log('getProfile observable returned:', p);
            }
          });
          this.getEnv().subscribe();
        }
      }
    });
  }

  getProfile(): Observable<any> {
    this._userProfile.next(null);
    // await this.http.get<UserProfile>('/api/profile').subscribe({
    //   next: profile => {
    //     if (profile) {
    //       profile.permissions = this.getPermissions(profile);
    //     }
    //     console.log(profile);
    //     this._userProfile.next(profile);
    //   }
    // });
    moment.now();
    return this.http.get(`/api/profile?${moment.now()}`).pipe(
      tap(profile => {
        if (profile) {
          profile.permissions = this.getPermissions(profile);
        }
        console.log(profile);
        this._userProfile.next(profile);
      })
    );
    //   .subscribe();
  }

  getUserProfile() {
    return this._userProfile.value;
  }

  getPermissions(profile: UserProfile): any {
    if (!profile.accessProfile) return {};
    let ret = {};
    profile.accessProfile.forEach(x => {
      ret[x.model] = {
        create: getCreateAccess(x.access),
        read: getReadAccess(x.access),
        update: getUpdateAccess(x.access),
        delete: getDeleteAccess(x.access)
      };
    });
    return ret;
  }

  getEnv() {
    return this.http.get<UserProfile>('/api/environment').pipe(
      tap(profile => {
        if (profile) {
          profile.permissions = this.getPermissions(profile);
        }
        console.log(profile);
        this._userProfile.next(profile);
      })
    );
  }
}
