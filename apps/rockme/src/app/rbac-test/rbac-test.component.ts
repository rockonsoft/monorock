import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../auth/api-auth.service';
import { UserAuthService } from '../auth/user-auth.service';
import { TenantService } from '../services/tenant.service';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import {
  Tenant,
  Role,
  getFriendlyAccessName,
  ModelMeta,
  TestResult,
  SUPER_USER_NAME,
  SUPER_USER_PWD,
  AppUser
} from '@monorock/api-interfaces';
import { RbackTestService } from '../services/rback-test.service';

@Component({
  selector: 'monorock-rbac-test',
  templateUrl: './rbac-test.component.html',
  styleUrls: ['./rbac-test.component.scss']
})
export class RbacTestComponent implements OnInit {
  authUser: any = null;
  tenants: Tenant[] = null;
  tenantError: string;
  roles: Role[] = null;
  rolesError: string;
  userProperties: any[] = [];
  models: any[] = null;
  selectedModel: ModelMeta = null;
  testPhase = 1;

  //list
  listTestResult: any[];
  listTestResultText: string;

  //get
  getTestResult: any;
  getTestResultText: string;
  //create
  createTestResult: any;
  createTestResultText: string;
  //update
  updateTestResult: any;
  updateTestResultText: string;
  //update
  deleteTestResult: any;
  deleteTestResultText: string;
  selectedRole: any = null;
  superUser: AppUser = null;

  constructor(
    private apiAuthService: ApiAuthService,
    private userAuthService: UserAuthService,
    private tenantService: TenantService,
    private roleService: RoleService,
    private router: Router,
    private testService: RbackTestService
  ) {
    apiAuthService.appUser.subscribe({
      next: authUser => {
        if (authUser) {
          this.userProperties = [];
          this.userProperties.push({ key: 'Name', value: authUser.display });
          this.userProperties.push({ key: 'Id', value: authUser.userId });
          this.userProperties.push({ key: 'Tenant', value: authUser.tenantExternalId });
          authUser.roles.forEach(role => {
            this.userProperties.push({ key: 'Role', value: role });
          });
          this.tenantService.load();
          this.roleService.load();
        }
        this.authUser = authUser;
      }
    });
    tenantService.tenants.subscribe({
      next: tenants => {
        if (tenants) {
          this.tenants = tenants;
        }
      }
    });
    tenantService.error.subscribe({
      next: error => {
        if (error) {
          this.tenantError = error.statusText;
          this.tenants = [];
        }
      }
    });
    roleService.roles.subscribe({
      next: roles => {
        if (roles) {
          this.roles = roles;
        }
      }
    });
    roleService.error.subscribe({
      next: error => {
        if (error) {
          this.rolesError = error.statusText;
          this.roles = [];
        }
      }
    });
    testService.models.subscribe({
      next: (models: ModelMeta[]) => {
        console.log(models);
        if (models) {
          this.models = models;
        }
      }
    });
    apiAuthService.localUser.subscribe({
      next: user => {
        if (user) {
          this.superUser = user;
          console.log('Super user');
          console.log(this.superUser);
        }
      }
    });
  }

  getAccessString(acc, model) {
    return getFriendlyAccessName(acc, model);
  }

  ngOnInit() {
    this.apiAuthService.login(SUPER_USER_NAME, SUPER_USER_PWD);
  }

  modelSelected($event) {
    console.log($event.value);
    this.selectedModel = $event.value;
    this.listTestResult = null;
    this.getTestResult = null;
    this.createTestResult = null;
    this.updateTestResult = null;
    this.deleteTestResult = null;
  }

  async doListTest() {
    try {
      const res = await this.testService.doListTest(this.selectedModel);
      console.log(res);
      this.listTestResult = res;
      this.listTestResultText = `Found ${this.listTestResult.length}`;
      if (this.listTestResult.length > 0) this.testPhase = 2;
      else this.testPhase = 3;
    } catch (err) {
      console.error(err);
      this.listTestResultText = err;
    }
  }

  async doGetTest() {
    try {
      const res = await this.testService.doGetTest(this.selectedModel, this.listTestResult[0]);
      console.log(res);
      this.getTestResult = res;
      this.getTestResultText = `Found id:${this.getTestResult[this.selectedModel.identityProperty]}`;
      this.testPhase = 3;
    } catch (err) {
      console.error(err);
      this.getTestResultText = err;
    }
  }
  async doCreateTest() {
    try {
      const res = await this.testService.doCreateTest(this.selectedModel);
      console.log(res);
      this.createTestResult = res;
      this.createTestResultText = `created ${this.selectedModel.name}`;
      this.testPhase = 4;
    } catch (err) {
      console.error(err);
      this.createTestResultText = err;
    }
  }

  async doUpdateTest() {
    let instance = this.listTestResult[this.listTestResult.length - 1];
    try {
      const res = await this.testService.doUpdateTest(this.selectedModel, instance);
      console.log(res);
      this.updateTestResult = res;
      this.updateTestResultText = `update ${this.selectedModel.name}`;
      this.testPhase = 5;
    } catch (err) {
      console.error(err);
      this.createTestResultText = err;
    }
  }

  async doDeleteTest() {
    let instance = this.listTestResult[this.listTestResult.length - 1];
    try {
      const res = await this.testService.doDeleteTest(this.selectedModel, instance);
      console.log(res);
      this.deleteTestResult = { deleted: 'ok' };
      this.deleteTestResultText = `deleted ${this.selectedModel.name}`;
      this.testPhase = 6;
    } catch (err) {
      console.error(err);
      this.createTestResultText = err;
    }
  }
  selectedRoleChanged(role) {
    this.selectedRole = role;
  }
}
