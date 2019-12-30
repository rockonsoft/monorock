import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { UserProfile, AccessItem, ActionScope, getReadAccess } from '@monorock/api-interfaces';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private profileService: ProfileService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUser(url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  getReadAccessToModel(model: string, accessProfile: AccessItem[]) {
    const modelAccess = accessProfile.find(x => x.model === model);
    if (!modelAccess) return ActionScope.none;
    return getReadAccess(modelAccess.access);
  }

  checkUser(url: string): Promise<boolean> {
    return this.profileService.userProfile.toPromise().then(profile => {
      if (!profile) return Promise.resolve(false);

      //to see admin section access profile must contain
      // - Read: ActionScope.all on user
      if (this.getReadAccessToModel('user', profile.accessProfile) === ActionScope.all) return Promise.resolve(true);
      // - Read: ActionScope.own on tenant
      if (this.getReadAccessToModel('tenant', profile.accessProfile) === ActionScope.own) return Promise.resolve(true);
      // - Read: ActionScope.all on role
      if (this.getReadAccessToModel('role', profile.accessProfile) === ActionScope.all) return Promise.resolve(true);
      return Promise.resolve(false);
    });
  }
}
