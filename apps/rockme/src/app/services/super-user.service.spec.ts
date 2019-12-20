import { TestBed } from '@angular/core/testing';

import { SuperUserService } from './super-user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SuperUserService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: 'TenantService',
          useValue: {
            // Your mock
          }
        },
        {
          provide: 'RoleService',
          useValue: {
            // Your mock
          }
        }
      ]
    })
  );

  it('should be created', () => {
    const service: SuperUserService = TestBed.get(SuperUserService);
    expect(service).toBeTruthy();
  });
});
