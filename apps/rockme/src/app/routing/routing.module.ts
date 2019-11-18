import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnonymousGuard } from '../auth/anonymous.guard';
import { LandingComponent } from '../landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [AnonymousGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { enableTracing: true })]
})
export class AppRoutingModule {}
