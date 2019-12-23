import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import { ApiAuthService } from '../auth/api-auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileService,
        {
          provide: ApiAuthService,
          useValue: {
            appUser: {
              subscribe(ob: any) {}
            }
          }
        }
      ]
    });
  });

  it('should be created', () => {
    const service: ProfileService = TestBed.get(ProfileService);
    expect(service).toBeTruthy();
  });
});
