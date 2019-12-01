import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantManagementComponent } from './tenant-management.component';

describe('TenantManagementComponent', () => {
  let component: TenantManagementComponent;
  let fixture: ComponentFixture<TenantManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantManagementComponent ]
    })
    .compileComponents();
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
