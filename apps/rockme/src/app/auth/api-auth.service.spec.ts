import { TestBed } from '@angular/core/testing';

import { ApiAuthService } from './api-auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('ApiAuthService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule
      ],
      providers: [
        {
          provide: 'UserAuthService',
          useValue: {
            // Your mock
          }
        }
      ]
    })
  );

  it('should be created', () => {
    const service: ApiAuthService = TestBed.get(ApiAuthService);
    expect(service).toBeTruthy();
  });
});
