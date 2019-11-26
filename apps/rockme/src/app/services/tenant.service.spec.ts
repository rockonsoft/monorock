import { TestBed } from '@angular/core/testing';

import { TenantService } from './tenant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiAuthService } from '../auth/api-auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('TenantService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule
      ],
      providers: [
        {
          provide: 'ApiAuthService',
          useValue: {
            // Your mock
          }
        }
      ]
    })
  );

  it('should be created', () => {
    const service: TenantService = TestBed.get(TenantService);
    expect(service).toBeTruthy();
  });
});
