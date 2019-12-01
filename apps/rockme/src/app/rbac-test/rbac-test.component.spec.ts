import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RbacTestComponent } from './rbac-test.component';

describe('RbacTestComponent', () => {
  let component: RbacTestComponent;
  let fixture: ComponentFixture<RbacTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RbacTestComponent ]
    })
    .compileComponents();
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
