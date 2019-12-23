import { TestBed } from '@angular/core/testing';

import { RbackTestService } from './rback-test.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiTestonfig } from '@monorock/api-interfaces';
import { environment } from '../../environments/environment';

describe('RbackTestService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiTestonfig)
      ]
    })
  );

  it('should be created', () => {
    const service: RbackTestService = TestBed.get(RbackTestService);
    expect(service).toBeTruthy();
  });
});
