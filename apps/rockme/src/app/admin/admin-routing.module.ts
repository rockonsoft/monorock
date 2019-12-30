import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantManagementComponent } from './tenant-management/tenant-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { RolesComponent } from './roles/roles.component';
import { AdminGuard } from './admin-guard';
import { AnonymousGuard } from '../auth/anonymous.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    //canActivate: [AdminGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'dashboard', component: DashboardComponent },
          {
            path: 'tenants',
            component: TenantManagementComponent
          },
          {
            path: 'roles',
            component: RolesComponent
          },
          {
            path: 'users',
            component: UsersComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
