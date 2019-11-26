import { Component, OnInit } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Tenant, Role, getFriendlyAccessName } from '@monorock/api-interfaces';
import { ApiAuthService } from '../auth/api-auth.service';

@Component({
  selector: 'monorock-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  authUser: any = null;
  tenants: Tenant[] = null;
  tenantError: string;
  roles: Role[] = null;
  rolesError: string;

  constructor(
    private apiAuthService: ApiAuthService,
    private tenantService: TenantService,
    private roleService: RoleService
  ) {
    apiAuthService.appUser.subscribe({
      next: authUser => {
        if (authUser) {
          this.authUser = authUser;
          this.tenantService.load();
          this.roleService.load();
        }
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
}
