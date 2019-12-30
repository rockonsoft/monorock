import { Test, TestingModule } from '@nestjs/testing';
import { OwnerInterceptor } from './owner.interceptor';
import { OwnerService } from '../users/owner.service';
import { getAccessType, ActionType, ActionScope, AccessItem } from '@monorock/api-interfaces';
import { UserContextWrapper } from './user-context-wrapper';
import { CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';

const testAccess =
  getAccessType(ActionType.read, ActionScope.own) |
  getAccessType(ActionType.update, ActionScope.ownExcluded) |
  getAccessType(ActionType.create, ActionScope.all) |
  getAccessType(ActionType.delete, ActionScope.none);

const accessItem: AccessItem = {
  model: 'test',
  access: testAccess,
  modelId: 999,
  endpoint: 'test'
};

class FakeHandler implements CallHandler {
  obs: Observable<any>;
  handle(): Observable<any> {
    return of(this.obs);
  }
  constructor(obs) {
    this.obs = obs;
  }
}
const testOwnedId = 9987;
describe('OwnerInterceptor', () => {
  let service: OwnerInterceptor;
  let setOwnerCalled = false;
  let getOwnerCalled = false;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OwnerInterceptor,
        OwnerService,
        {
          provide: 'OwnerService',
          useValue: {
            // Your mock
            setOwner(user: any, modelId: any, id: any) {
              setOwnerCalled = true;
              return Promise.resolve({});
            },
            getOwned(user: any, modelId: any, id: any) {
              getOwnerCalled = true;
              return Promise.resolve([{ ownedId: testOwnedId }]);
            }
          }
        }
      ]
    }).compile();

    setOwnerCalled = false;
    getOwnerCalled = false;
    service = module.get<OwnerInterceptor>(OwnerInterceptor);
  });

  it('should set owner on create', async () => {
    const context: UserContextWrapper = new UserContextWrapper();
    context.method = 'POST';
    context.accessRight = ActionScope.own;
    context.model = 'testmodel';
    const obs = [{ id: testOwnedId }];

    const fakeHandler: FakeHandler = new FakeHandler(obs);

    (await service.handleCall(context, fakeHandler)).subscribe({
      next: x => {
        expect(setOwnerCalled).toBe(true);
      }
    });
  });

  it('should set filter own on list', async () => {
    const context: UserContextWrapper = new UserContextWrapper();
    context.method = 'GET';
    context.accessRight = ActionScope.own;
    context.model = 'testmodel';
    const obs = [{ id: testOwnedId }, { id: 2 }];

    const fakeHandler: FakeHandler = new FakeHandler(obs);

    (await service.handleCall(context, fakeHandler)).subscribe({
      next: x => {
        x.then(y => expect(y[0].id).toBe(testOwnedId));
        expect(getOwnerCalled).toBe(true);
      }
    });
  });

  it('should exclude operations on own', async () => {
    const context: UserContextWrapper = new UserContextWrapper();
    context.method = 'GET';
    context.accessRight = ActionScope.ownExcluded;
    context.instanceId = testOwnedId;
    context.model = 'testmodel';
    const obs = [{ id: testOwnedId }, { id: 2 }];

    const fakeHandler: FakeHandler = new FakeHandler(obs);

    try {
      const prom = await service.handleCall(context, fakeHandler);
      prom.pipe(catchError(err => of(true))).subscribe({
        next: x => {
          expect(getOwnerCalled).toBe(true);
        },
        error: err => {}
      });
    } catch (error) {
      //needs assert here
    }
  });

  it('should allow operations on other than own', async () => {
    const context: UserContextWrapper = new UserContextWrapper();
    context.method = 'GET';
    context.accessRight = ActionScope.ownExcluded;
    context.instanceId = 2;
    context.model = 'testmodel';
    const obs = [{ id: testOwnedId }, { id: 2 }];

    const fakeHandler: FakeHandler = new FakeHandler(obs);

    try {
      const prom = await service.handleCall(context, fakeHandler);
      prom.pipe(catchError(err => of(true))).subscribe({
        next: data => {
          expect(data.length).toBe(obs.length);
          expect(getOwnerCalled).toBe(true);
        },
        error: err => {}
      });
    } catch (error) {
      //needs assert here
    }
  });
});
