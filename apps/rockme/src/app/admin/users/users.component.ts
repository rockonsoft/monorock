import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { map } from 'rxjs/internal/operators/map';
import { UserProfile } from '@monorock/api-interfaces';

@Component({
  selector: 'monorock-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  profile: UserProfile;
  constructor(private profileService: ProfileService) {
    profileService.userProfile
      .pipe(
        map(p => {
          if (p) {
            this.profile = p;
          }
        })
      )
      .subscribe();
  }
  ngOnInit() {}
}
