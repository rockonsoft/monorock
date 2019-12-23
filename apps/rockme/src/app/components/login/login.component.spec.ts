import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DropdownModule } from 'primeng/dropdown';
import { Component } from '@angular/core';

@Component({
  selector: 'firebase-ui',
  template: '<p>Mock ui component</p>'
})
class MockUiFirebase {
  signInSuccessWithAuthResult() {}
  signInFailure() {}
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, MockUiFirebase],
      imports: [ButtonModule, PanelModule, TableModule, DropdownModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        // {
        //   provide: 'AngularFireAuth',
        //   useValue: {
        //     // Your mock
        //   }
        // }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
