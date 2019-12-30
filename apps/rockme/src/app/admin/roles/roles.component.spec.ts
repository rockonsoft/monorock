import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RolesComponent } from './roles.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'apps/rockme/src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        TableModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule
      ],
      declarations: [RolesComponent],
      providers: [
        {
          provide: 'ProfileService',
          useValue: {
            // Your mock
          }
        },
        {
          provide: 'RoleService',
          useValue: {
            // Your mock
          }
        },
        {
          provide: 'AngularFireAuth',
          useValue: {
            // Your mock
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
