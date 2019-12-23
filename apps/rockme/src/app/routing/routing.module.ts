import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from '../auth/anonymous.guard';
import { LandingComponent } from '../landing/landing.component';
import { RbacTestComponent } from '../rbac-test/rbac-test.component';
import { TenantManagementComponent } from '../tenant-management/tenant-management.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'rbactest',
    component: RbacTestComponent
  },
  {
    path: 'tenant',
    component: TenantManagementComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: false })]
})
export class AppRoutingModule {}
