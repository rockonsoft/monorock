import { Component, OnInit } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Tenant, Role, getFriendlyAccessName, TENANT_ADMIN_ROLE, AppUser, UserProfile } from '@monorock/api-interfaces';
import { ApiAuthService } from '../auth/api-auth.service';
import { UserAuthService } from '../auth/user-auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from 'firebase';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'monorock-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  tenants: Tenant[] = null;
  tenantError: string;
  roles: Role[] = null;
  rolesError: string;
  userProperties: any[] = [];
  showDetail = false;
  getEnv$: Observable<any> = null;
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private profileService: ProfileService,
    private apiAuthService: ApiAuthService
  ) {
    this.profileService.userProfile
      .pipe(
        tap(userProfile => {
          if (userProfile) {
            this.userProperties = [];
            this.userProperties.push({ key: 'Name', value: userProfile.display });
            this.userProperties.push({ key: 'Id', value: userProfile.userId });
            this.userProperties.push({ key: 'Tenant', value: userProfile.tenantName });
            if (userProfile.roles) {
              userProfile.roles.forEach(role => {
                this.userProperties.push({ key: 'Role', value: role });
              });
            }
            this.getEnv$ = this.profileService.getEnv();
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  getAccessString(acc, model) {
    return getFriendlyAccessName(acc, model);
  }

  logout() {
    this.userAuthService.logout();
  }

  gotoRbackTest() {
    this.router.navigateByUrl(`/rbactest`);
  }

  gotoTenantManagement() {
    this.router.navigateByUrl(`/admin/dashboard`);
  }

  isTenantAdim() {
    if (this.userProperties) {
      const pair = this.userProperties.find(x => {
        return x.key === 'Role';
      });
      return pair && pair.value === TENANT_ADMIN_ROLE;
    }
    return false;
  }
}
