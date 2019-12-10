import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacTestComponent } from './rbac-test.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiTestonfig } from '@monorock/api-interfaces';
import { environment } from '../../environments/environment';

describe('RbacTestComponent', () => {
  let component: RbacTestComponent;
  let fixture: ComponentFixture<RbacTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RbacTestComponent],
      imports: [
        ButtonModule,
        PanelModule,
        TableModule,
        DropdownModule,
        HttpClientTestingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiTestonfig)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RbacTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
