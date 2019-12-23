import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { LandingComponent } from './landing/landing.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiTestonfig } from '@monorock/api-interfaces';
import { LoginComponent } from './components/login/login.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, LandingComponent, LoginComponent],
      imports: [
        ButtonModule,
        PanelModule,
        TableModule,
        DropdownModule,
        HttpClientModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireFunctionsModule,
        FirebaseUIModule.forRoot(firebaseUiTestonfig)
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
