import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoleService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: RoleService = TestBed.get(RoleService);
    expect(service).toBeTruthy();
  });
});
