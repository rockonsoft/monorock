import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      ],

      declarations: [UsersComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
