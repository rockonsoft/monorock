import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'apps/rockme/src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        TableModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
        AngularFireAuthModule
      ],

      declarations: [AdminComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
