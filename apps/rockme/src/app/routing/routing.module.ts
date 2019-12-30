import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from '../auth/anonymous.guard';
import { LandingComponent } from '../landing/landing.component';
import { RbacTestComponent } from '../rbac-test/rbac-test.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'rbactest',
    component: RbacTestComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: false })]
})
export class AppRoutingModule {}
