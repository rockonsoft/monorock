import { Component, OnInit } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Tenant, Role, getFriendlyAccessName, TENANT_ADMIN_ROLE, AppUser, UserProfile } from '@monorock/api-interfaces';
import { ApiAuthService } from '../auth/api-auth.service';
import { UserAuthService } from '../auth/user-auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from 'firebase';

@Component({
  selector: 'monorock-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  oAuthUser: User = null;
  apiAuthUser: AppUser = null;
  userProfile: UserProfile = null;
  tenants: Tenant[] = null;
  tenantError: string;
  roles: Role[] = null;
  rolesError: string;
  userProperties: any[] = [];
  showDetail = false;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private profileService: ProfileService,
    private apiAuthService: ApiAuthService
  ) {
    this.userAuthService.oauthUser.subscribe({
      next: user => {
        this.oAuthUser = user;
      }
    });
    this.apiAuthService.appUser.subscribe({ next: user => (this.apiAuthUser = user) });
    this.profileService.userProfile.subscribe({
      next: userProfile => {
        if (userProfile) {
          this.userProperties = [];
          this.userProperties.push({ key: 'Name', value: userProfile.display });
          this.userProperties.push({ key: 'Id', value: userProfile.userId });
          this.userProperties.push({ key: 'Tenant', value: userProfile.tenantName });
          userProfile.roles.forEach(role => {
            this.userProperties.push({ key: 'Role', value: role });
          });
        }
        this.userProfile = userProfile;
      }
    });
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
    this.router.navigateByUrl(`/tenant`);
  }

  isTenantAdim() {
    if (this.userProfile && this.userProfile.roles.length) {
      return this.userProfile.roles.find(x => x === TENANT_ADMIN_ROLE);
    }
    return false;
  }
}
