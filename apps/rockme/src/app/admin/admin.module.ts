import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { TenantManagementComponent } from './tenant-management/tenant-management.component';
import { AdminComponent } from './admin/admin.component';
//prime-ng
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [DashboardComponent, RolesComponent, TenantManagementComponent, AdminComponent, UsersComponent],
  imports: [CommonModule, FormsModule, AdminRoutingModule, ButtonModule, DropdownModule, InputTextModule, TableModule]
})
export class AdminModule {}
