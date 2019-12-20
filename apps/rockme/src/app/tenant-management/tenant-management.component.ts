import { Component, OnInit } from '@angular/core';
import { TenantService } from '../services/tenant.service';
import { Tenant } from '@monorock/api-interfaces';

@Component({
  selector: 'monorock-tenant-management',
  templateUrl: './tenant-management.component.html',
  styleUrls: ['./tenant-management.component.scss']
})
export class TenantManagementComponent implements OnInit {
  tenant: Tenant = null;
  constructor(private tenantService: TenantService) {
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
