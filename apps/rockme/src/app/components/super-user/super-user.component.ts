import { Component, OnInit, Input } from '@angular/core';
import { AppUser, Role, Tenant } from '@monorock/api-interfaces';
import { SuperUserService } from '../../services/super-user.service';
import { ApiAuthService } from '../../auth/api-auth.service';

@Component({
  selector: 'monorock-super-user',
  templateUrl: './super-user.component.html',
  styleUrls: ['./super-user.component.scss']
})
export class SuperUserComponent implements OnInit {
  superUser: AppUser = null;

  roles: Role[] = null;
  tenants: Tenant[] = null;
  otherUser: AppUser = null;

  @Input() set user(_user: AppUser) {
    if (_user) {
      this.superUser = _user;
    }
  }
  constructor(private superUserService: SuperUserService, private apiAuthService: ApiAuthService) {
    superUserService.roles.subscribe({
      next: roles => {
        if (roles) {
          this.roles = roles;
        }
      }
    });
    superUserService.tenants.subscribe({
      next: tenants => {
        if (tenants) {
          this.tenants = tenants;
        }
      }
    });
    apiAuthService.appUser.subscribe({
      next: user => {
        if (user) {
          this.otherUser = user;
        }
      }
    });
  }

  ngOnInit() {}
}
