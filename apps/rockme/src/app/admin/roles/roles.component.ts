import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import {
  Role,
  ActionScope,
  AccessRight,
  getFriendlyAccessName,
  getScopeText,
  getCreateAccess,
  getReadAccess,
  getUpdateAccess,
  getDeleteAccess,
  ActionType,
  getScopeFromText
} from 'libs/api-interfaces/src/lib/models';
import { map } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import { GUEST_ROLE, TENANT_ADMIN_ROLE, USER_ADMIN_ROLE, getAccessType } from '@monorock/api-interfaces';

const SCOPE_ALL = ActionScope.all;

// interface UIAccessRight {
//   id?: number;
//   modelId: number;
//   propertyId?: number;
//   roleId?: number;
//   accessType: number;
//   modelName?: string;
//   saved: boolean;
// }

export interface UiRole {
  id: number;
  name: string;
  system?: boolean;
  editing?: boolean;
  viewing?: boolean;
}

@Component({
  selector: 'monorock-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  scopes = [
    { name: 'Not Allowed', value: ActionScope.none },
    { name: 'Except Own', value: ActionScope.ownExcluded },
    { name: 'Own', value: ActionScope.own },
    { name: 'All', value: ActionScope.all }
  ];
  roles: UiRole[];
  accessProfile: AccessRight[] = [];
  editAccessProfile: AccessRight[] = [];

  editRoleName: string = '';
  editRoleDesc: string = '';
  canCreate = false;

  permissions = {
    create: ActionScope.none,
    read: ActionScope.none,
    update: ActionScope.none,
    delete: ActionScope.none
  };
  constructor(private profileService: ProfileService, private roleService: RoleService) {
    profileService.userProfile
      .pipe(
        map(p => {
          if (p) {
            if (p.permissions && p.permissions['role']) {
              this.permissions = p.permissions['role'];
              this.canCreate = this.permissions.create === ActionScope.all;
            }
            this.roleService.loadModelMeta();
            this.roleService.load();
          }
        })
      )
      .subscribe();
    this.roleService.roles.subscribe({
      next: roles => {
        if (roles) {
          this.roles = roles.map(x => {
            return { ...x, system: this.isSystemRole(x) };
          });
        }
      }
    });
  }

  isSystemRole(role: Role): boolean {
    return [GUEST_ROLE, TENANT_ADMIN_ROLE, USER_ADMIN_ROLE].findIndex(x => x === role.name) > -1;
  }

  ngOnInit() {}

  addNewRole() {
    this.roleService.addNewRole(this.profileService.getUserProfile());
  }

  editRole(role: UiRole) {
    this.roles.forEach(x => {
      x.editing = false;
    });
    role.editing = true;
    this.roleService
      .getAccessRights(role)
      .pipe(
        map(data => {
          if (data) {
            const neweditAccessProfile = data.map(ac => {
              const model = this.roleService.models.value.find(m => m.id === ac.modelId);
              return { ...ac, modelName: model ? model.name : 'not found' };
            });
            this.roleService.models.value.forEach(model => {
              const ac = neweditAccessProfile.find(x => x.modelName === model.name);
              if (!ac) {
                neweditAccessProfile.push({
                  modelName: model.name,
                  modelId: model.id,
                  accessType: getAccessType(ActionType.read, ActionScope.none)
                });
              }
            });
            this.editAccessProfile = neweditAccessProfile.sort((a, b) => {
              if (a.modelName > b.modelName) {
                return -1;
              }
              if (a.modelName < b.modelName) {
                return 1;
              }
              return 0;
            });
          }
        })
      )
      .subscribe();
  }
  getAccessString(acc, model) {
    return getFriendlyAccessName(acc, model);
  }

  getCreateAccessString(acc) {
    return getScopeText(getCreateAccess(acc));
  }
  getReadAccessString(acc) {
    return getScopeText(getReadAccess(acc));
  }
  getUpdateAccessString(acc) {
    return getScopeText(getUpdateAccess(acc));
  }
  getDeleteAccessString(acc) {
    return getScopeText(getDeleteAccess(acc));
  }

  viewRole(role: UiRole) {
    this.roles.forEach(x => {
      x.viewing = false;
    });
    role.viewing = true;
    this.roleService
      .getAccessRights(role)
      .pipe(
        map(data => {
          if (data) {
            this.accessProfile = data.map(ac => {
              const model = this.roleService.models.value.find(m => m.id === ac.modelId);
              return { ...ac, modelName: model ? model.name : 'not found' };
            });
          }
        })
      )
      .subscribe();
  }

  accessChanged(event, crud, access: AccessRight) {
    switch (crud) {
      case 'create': {
        access.accessType = access.accessType | getAccessType(ActionType.create, getScopeFromText(event.value.name));
        break;
      }
      case 'read': {
        access.accessType = access.accessType | getAccessType(ActionType.read, getScopeFromText(event.value.name));
        break;
      }
      case 'update': {
        access.accessType = access.accessType | getAccessType(ActionType.update, getScopeFromText(event.value.name));
        break;
      }
      case 'delete': {
        access.accessType = access.accessType | getAccessType(ActionType.delete, getScopeFromText(event.value.name));
        break;
      }
      default: {
      }
    }
  }

  saveEdit(role) {
    const update = this.roleService.updateRole(role);
    const ops = this.editAccessProfile.map(ac => {
      ac.roleId = role.id;
      if (ac.id > 0) {
        return this.roleService.updateAccess(role, ac);
      } else {
        return this.roleService.createAccess(role, ac);
      }
    });
    Promise.all([update, ops]).then(x => {
      this.cancelEdit(role);
    });
  }

  cancelEdit(role) {
    this.roles.forEach(x => {
      x.editing = false;
    });
  }
}
