import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './user-auth.service';
import { AnonymousGuard } from './anonymous.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [UserAuthService, AnonymousGuard],
  exports: []
})
export class AuthModule {}
