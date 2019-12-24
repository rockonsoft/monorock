import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserProfile } from '@monorock/api-interfaces';
import { ApiAuthService } from '../auth/api-auth.service';

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
          this.getProfile();
        }
      }
    });
  }

  getProfile() {
    return this.http.get<UserProfile>('/api/profile').subscribe({
      next: profile => {
        if (profile) {
          this._userProfile.next(profile);
        }
      }
    });
  }
}
