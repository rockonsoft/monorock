import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymousGuard } from './anonymous.guard';

describe('AnonymousGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymousGuard]
    });
  });

  it('should ...', inject([AnonymousGuard], (guard: AnonymousGuard) => {
    expect(guard).toBeTruthy();
  }));
});
