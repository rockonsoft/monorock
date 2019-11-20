import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Tenant, Role } from '@monorock/api-interfaces';

@Component({
  selector: 'monorock-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  authUser: any = null;
  tenants: Tenant[] = null;
  roles: Role[] = null;
  constructor(
    private userAuthService: UserAuthService,
    private tenantService: TenantService,
    private roleService: RoleService
  ) {
    userAuthService.oauthUser.subscribe({
      next: authUser => {
        if (authUser) {
          this.authUser = authUser;
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
    roleService.roles.subscribe({
      next: roles => {
        if (roles) {
          this.roles = roles;
        }
      }
    });
  }

  ngOnInit() {
    this.tenantService.load();
    this.roleService.load();
  }
}
