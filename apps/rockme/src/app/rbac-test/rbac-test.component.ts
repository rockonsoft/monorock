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
  AppUser,
  getScopeText,
  getCreateAccess,
  getReadAccess,
  getUpdateAccess,
  getDeleteAccess
} from '@monorock/api-interfaces';
import { RbackTestService } from '../services/rback-test.service';
import { SuperUserService } from '../services/super-user.service';
import { ProfileService } from '../services/profile.service';
import { findIndex, first, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface ResultOfTest {
  result?: any;
  text: string;
  error?: string;
  op: string;
}

const listOp = 'LIST';
const getOp = 'GET';
const createOp = 'CREATE';
const updateOp = 'UPDATE';
const deleteOp = 'DELETE';

const testSequence: ('LIST' | 'GET' | 'CREATE' | 'UPDATE' | 'DELETE')[] = [listOp, getOp, createOp, updateOp, deleteOp];

@Component({
  selector: 'monorock-rbac-test',
  templateUrl: './rbac-test.component.html',
  styleUrls: ['./rbac-test.component.scss']
})
export class RbacTestComponent implements OnInit {
  roles: Role[] = null;
  rolesError: string;
  models: any[] = null;
  selectedModel: ModelMeta = null;
  testPhase = 1;

  resultsMap = new Map<string, ResultOfTest>();
  history = new Array<ResultOfTest>();

  selectedRole: any = null;
  superUser: AppUser = null;
  currentTest: 'LIST' | 'GET' | 'CREATE' | 'UPDATE' | 'DELETE' = listOp;
  $roleAssign: Observable<any> = null;
  $profileGet: Observable<any> = null;

  $currentOp: Observable<any> = null;

  constructor(
    private apiAuthService: ApiAuthService,
    private userAuthService: UserAuthService,
    private tenantService: TenantService,
    private roleService: RoleService,
    private router: Router,
    private testService: RbackTestService,
    private superUserService: SuperUserService,
    private profileService: ProfileService
  ) {
    testService.superUser.models.subscribe({
      next: (models: ModelMeta[]) => {
        if (models) {
          this.models = models;
        }
      }
    });

    superUserService.localUser.subscribe({
      next: user => {
        if (user) {
          this.superUser = user;
        }
      }
    });
    this.testService.result.subscribe({
      next: res => {
        if (res) {
          let resText = `Success`;
          if (this.currentTest === listOp) resText = `Success, Found ${res.length}`;
          if (this.currentTest === getOp) resText = `Success, Found Id: ${res.id}`;

          const opres = { op: this.currentTest, result: res, text: resText, error: null };

          this.resultsMap.set(this.currentTest, opres);
          const find = this.history.find(x => x.op == opres.op);
          if (!find) {
            this.history.push(opres);
          } else {
            find.result = opres.result;
            find.text = opres.text;
          }
          if (this.currentTest === listOp && res.length === 0) this.moveNextOnError();
          else this.moveNext();
        }
      }
    });
    this.testService.error.subscribe({
      next: err => {
        if (err) {
          const opres = {
            op: this.currentTest,
            result: null,
            text: err.message,
            error: err
          };
          this.resultsMap.set(this.currentTest, opres);
          const find = this.history.find(x => x.op == opres.op);
          if (!find) {
            this.history.push(opres);
          } else {
            find.result = opres.result;
            find.text = opres.text;
          }
          this.moveNextOnError();
        }
      }
    });
  }

  getHistory() {
    return this.resultsMap.values();
  }

  moveNext() {
    const index = testSequence.indexOf(this.currentTest);
    this.currentTest = testSequence[index + 1];
    this.testPhase = index + 1;
  }

  moveNextOnError() {
    if (this.currentTest === listOp || this.currentTest === getOp) {
      //failure on list - no instances
      //goto create
      const index = testSequence.indexOf(createOp);
      this.currentTest = testSequence[index];
      this.testPhase = index;
    } else if (this.currentTest === createOp) {
      //failure on create
      //goto create
      const index = testSequence.indexOf(updateOp);
      this.currentTest = testSequence[index];
      this.testPhase = index;
    } else if (this.currentTest === updateOp) {
      //failure on list - no instances
      //goto create
      const index = testSequence.indexOf(deleteOp);
      this.currentTest = testSequence[index];
      this.testPhase = index;
    } else if (this.currentTest === deleteOp) {
      //failure on list - no instances
      //goto create
      const index = testSequence.indexOf(listOp);
      this.currentTest = testSequence[index];
      this.testPhase = index;
    }
  }

  getAccessString(acc, model) {
    return getFriendlyAccessName(acc, model);
  }

  getCreateAccessString(acc, model) {
    return getScopeText(getCreateAccess(acc));
  }
  getReadAccessString(acc, model) {
    return getScopeText(getReadAccess(acc));
  }
  getUpdateAccessString(acc, model) {
    return getScopeText(getUpdateAccess(acc));
  }
  getDeleteAccessString(acc, model) {
    return getScopeText(getDeleteAccess(acc));
  }

  ngOnInit() {
    this.superUserService.login(SUPER_USER_NAME, SUPER_USER_PWD);
  }

  modelSelected($event) {
    this.selectedModel = $event.value;
    this.resultsMap.clear();
    this.history = [];
    this.currentTest = testSequence[0];
  }

  async doTest() {
    const instances = this.resultsMap.has(listOp) ? this.resultsMap.get(listOp).result : null;
    switch (this.currentTest) {
      case listOp:
        this.$currentOp = await this.testService.doListTest(this.selectedModel);
        break;
      case getOp:
        this.$currentOp = await this.testService.doGetTest(this.selectedModel, instances[0]);
        break;
      case updateOp:
        this.$currentOp = await this.testService.doUpdateTest(this.selectedModel, instances[0]);
        break;
      case createOp:
        this.$currentOp = await this.testService.doCreateTest(this.selectedModel);
        break;
      case deleteOp:
        this.$currentOp = await this.testService.doDeleteTest(this.selectedModel, instances[0]);
        break;
    }
  }

  getResult() {
    return this.resultsMap.has(this.currentTest) ? this.resultsMap.get(this.currentTest) : null;
  }

  selectedRoleChanged(role) {
    this.selectedRole = role;
  }

  async retryTest(op) {
    this.currentTest = op.op;
    await this.doTest();
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  async onRoleAssigned(event) {
    const headers = this.superUserService.getHeaders();
    this.$roleAssign = this.roleService.assignRole(headers, this.profileService.getUserProfile(), event).pipe(
      tap(x => {
        this.$profileGet = this.profileService.getProfile();
      })
    );
  }

  async refresh() {
    this.$profileGet = this.profileService.getProfile();
  }
}
