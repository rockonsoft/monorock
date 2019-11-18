import { TestBed, async, inject } from '@angular/core/testing';

import { AnonymousGuard } from './anonymous.guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

describe('AnonymousGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymousGuard],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule
      ]
    });
  });

  it('should ...', inject([AnonymousGuard], (guard: AnonymousGuard) => {
    expect(guard).toBeTruthy();
  }));
});
