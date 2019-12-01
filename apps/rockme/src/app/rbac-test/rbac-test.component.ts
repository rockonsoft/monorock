import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../auth/api-auth.service';
import { UserAuthService } from '../auth/user-auth.service';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { Tenant, Role, getFriendlyAccessName } from '@monorock/api-interfaces';

@Component({
  selector: 'monorock-rbac-test',
  templateUrl: './rbac-test.component.html',
  styleUrls: ['./rbac-test.component.scss']
})
export class RbacTestComponent implements OnInit {
  authUser: any = null;
  tenants: Tenant[] = null;
  tenantError: string;
  roles: Role[] = null;
  rolesError: string;
  userProperties: any[] = [];

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
          this.userProperties.push({ key: 'Tenant', value: authUser.tenantExternalId });
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

  getAccessString(acc, model) {
    return getFriendlyAccessName(acc, model);
  }

  ngOnInit() {}
}
