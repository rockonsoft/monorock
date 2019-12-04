import { Component, OnInit } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Tenant, Role, getFriendlyAccessName, TENANT_ADMIN_ROLE, AppUser } from '@monorock/api-interfaces';
import { ApiAuthService } from '../auth/api-auth.service';
import { UserAuthService } from '../auth/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'monorock-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  authUser: AppUser = null;
  tenants: Tenant[] = null;
  tenantError: string;
  roles: Role[] = null;
  rolesError: string;
  userProperties: any[] = [];
  showDetail = false;

  constructor(
    private apiAuthService: ApiAuthService,
    private userAuthService: UserAuthService,
    private tenantService: TenantService,
    private roleService: RoleService,
    private router: Router
  ) {
    apiAuthService.appUser.subscribe({
      next: authUser => {
        if (authUser) {
          this.userProperties = [];
          this.userProperties.push({ key: 'Name', value: authUser.display });
          this.userProperties.push({ key: 'Id', value: authUser.userId });
          this.userProperties.push({ key: 'Tenant', value: authUser.tenantName });
          authUser.roles.forEach(role => {
            this.userProperties.push({ key: 'Role', value: role });
          });
          this.tenantService.load();
          this.roleService.load();
        }
        this.authUser = authUser;
      }
    });
    tenantService.tenants.subscribe({
      next: tenants => {
        if (tenants) {
          this.tenants = tenants;
        }
      }
    });
    tenantService.error.subscribe({
      next: error => {
        if (error) {
          this.tenantError = error.statusText;
          this.tenants = [];
        }
      }
    });
    roleService.roles.subscribe({
      next: roles => {
        if (roles) {
          this.roles = roles;
        }
      }
    });
    roleService.error.subscribe({
      next: error => {
        if (error) {
          this.rolesError = error.statusText;
          this.roles = [];
        }
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
    if (this.authUser && this.authUser.roles.length) {
      return this.authUser.roles.find(x => x === TENANT_ADMIN_ROLE);
    }
    return false;
  }
}
