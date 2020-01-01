import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppUser, Role, Tenant } from '@monorock/api-interfaces';
import { SuperUserService } from '../../services/super-user.service';
import { ProfileService } from '../../services/profile.service';
import { RoleService } from '../../services/role.service';
import { map } from 'rxjs/operators';

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
  selectedRole: Role = null;
  disableRoleAssign = true;

  @Input() set user(_user: AppUser) {
    if (_user) {
      this.superUser = _user;
    }
  }

  @Input() set managedUser(_user: AppUser) {
    if (_user) {
      this.otherUser = _user;
      if (this.selectedRole) {
        const findex = this.otherUser.roles.findIndex(x => x === this.selectedRole.name);
        this.disableRoleAssign = findex > -1; //do not assign current roles
      }
    }
  }

  @Output() roleAssigned = new EventEmitter<Role>();

  constructor(
    private superUserService: SuperUserService,
    private profileService: ProfileService,
    private roleService: RoleService
  ) {
    superUserService.roles.subscribe({
      next: roles => {
        if (roles) {
          this.roles = roles;
        }
      }
    });
    // superUserService.tenants.subscribe({
    //   next: tenants => {
    //     if (tenants) {
    //       this.tenants = tenants;
    //     }
    //   }
    // });
    // profileService.userProfile.subscribe({
    //   next: user => {
    //     if (user) {
    //       console.log(`Received other user in super user component`);
    //       this.otherUser = user;
    //       if (this.otherUser.roles && this.selectedRole) {
    //         const findex = this.otherUser.roles.findIndex(x => x === this.selectedRole.name);
    //         this.disableRoleAssign = findex > -1; //do not assign current roles
    //       }
    //     }
    //   }
    // });
  }

  selectedRoleChanged(event) {
    this.selectedRole = event.value;
    if (this.otherUser) {
      const findex = this.otherUser.roles.findIndex(x => x === this.selectedRole.name);
      this.disableRoleAssign = findex > -1; //do not assign current roles
    }
  }

  assignRole() {
    this.roleAssigned.emit(this.selectedRole);
    // const headers = this.superUserService.getHeaders();
    // this.roleService
    //   .assignRole(headers, this.otherUser, this.selectedRole)
    //   .pipe(
    //     map(res => {
    //       console.log(`role-service:assignRole`, res);
    //       this.profileService.getProfile();
    //     })
    //   )
    //   .subscribe();
  }

  ngOnInit() {}
}
