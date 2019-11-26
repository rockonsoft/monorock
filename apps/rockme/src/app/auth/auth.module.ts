import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthService } from './user-auth.service';
import { AnonymousGuard } from './anonymous.guard';
import { ApiAuthService } from './api-auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ApiAuthService, UserAuthService, AnonymousGuard],
  exports: []
})
export class AuthModule {}
