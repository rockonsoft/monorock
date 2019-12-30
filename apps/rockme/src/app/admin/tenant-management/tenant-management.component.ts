import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { Tenant } from '@monorock/api-interfaces';
import { ProfileService } from '../../services/profile.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'monorock-tenant-management',
  templateUrl: './tenant-management.component.html',
  styleUrls: ['./tenant-management.component.scss']
})
export class TenantManagementComponent implements OnInit {
  tenant: Tenant = { name: '', description: '', externalId: '', createdAt: '' };
  constructor(private profileService: ProfileService, private tenantService: TenantService) {
    profileService.userProfile
      .pipe(
        map(p => {
          if (p) {
            this.tenantService.load();
          }
        })
      )
      .subscribe();

    tenantService.tenants.subscribe({
      next: tenants => {
        if (tenants && tenants.length) {
          this.tenant = tenants[0];
        } else {
          tenantService.load();
        }
      }
    });
  }

  ngOnInit() {}
}
