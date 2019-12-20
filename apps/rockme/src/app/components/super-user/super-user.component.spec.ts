import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserComponent } from './super-user.component';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuperUserService } from '../../services/super-user.service';
import { ApiAuthService } from '../../auth/api-auth.service';

describe('SuperUserComponent', () => {
  let component: SuperUserComponent;
  let fixture: ComponentFixture<SuperUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuperUserComponent],
      imports: [DropdownModule, HttpClientTestingModule],
      providers: [
        {
          provide: SuperUserService,
          useValue: {
            // Your mock
            roles: {
              subscribe(any) {}
            },
            tenants: {
              subscribe(any) {}
            }
          }
        },
        {
          provide: ApiAuthService,
          useValue: {
            // Your mock
            appUser: {
              subscribe(any) {}
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
