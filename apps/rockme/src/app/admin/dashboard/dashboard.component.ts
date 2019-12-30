import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AccessItem, ActionScope, getReadAccess, UserProfile } from '@monorock/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'monorock-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showTenant: boolean = false;
  showUsers: boolean = false;
  showRoles: boolean = false;
  constructor(private profileService: ProfileService, private router: Router) {
    this.profileService.userProfile.subscribe({
      next: profile => {
        if (profile) {
          if (this.getReadAccessToModel('user', profile.accessProfile) === ActionScope.all) this.showUsers = true;
          if (this.getReadAccessToModel('tenant', profile.accessProfile) === ActionScope.own) this.showTenant = true;
          if (this.getReadAccessToModel('role', profile.accessProfile) === ActionScope.all) this.showRoles = true;
        }
      }
    });
  }

  getReadAccessToModel(model: string, accessProfile: AccessItem[]) {
    const modelAccess = accessProfile.find(x => x.model === model);
    if (!modelAccess) {
      console.info(`No access to ${model}`);
      return ActionScope.none;
    } else {
      const ra = getReadAccess(modelAccess.access);
      console.info(`${ra} access to ${model}`);
      return ra;
    }
  }

  gotoTenantManagement() {
    this.router.navigateByUrl(`/admin/tenants`);
  }
  gotoRoleManagement() {
    this.router.navigateByUrl(`/admin/roles`);
  }
  gotoUserManagement() {
    this.router.navigateByUrl(`/admin/users`);
  }
  ngOnInit() {}
}
