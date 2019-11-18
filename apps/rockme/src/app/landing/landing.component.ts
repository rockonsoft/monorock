import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../auth/user-auth.service';

@Component({
  selector: 'monorock-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  authUser: any = null;
  constructor(private userAuthService: UserAuthService) {
    userAuthService.oauthUser.subscribe({
      next: authUser => {
        if (authUser) {
          this.authUser = authUser;
        }
      }
    });
  }

  ngOnInit() {}
}
