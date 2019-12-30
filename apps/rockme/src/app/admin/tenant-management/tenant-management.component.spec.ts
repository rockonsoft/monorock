import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantManagementComponent } from './tenant-management.component';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseUIModule } from 'firebaseui-angular';
import { firebaseUiTestonfig } from '@monorock/api-interfaces';
import { DropdownModule } from 'primeng/dropdown';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';

describe('TenantManagementComponent', () => {
  let component: TenantManagementComponent;
  let fixture: ComponentFixture<TenantManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantManagementComponent],
      imports: [
        FormsModule,
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
    fixture = TestBed.createComponent(TenantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
