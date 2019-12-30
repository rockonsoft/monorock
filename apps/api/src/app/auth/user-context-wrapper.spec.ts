import { getAccessType, ActionType, ActionScope, AccessItem } from '@monorock/api-interfaces';
import { UserContextWrapper } from './user-context-wrapper';

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

describe('UserContextWrapper', () => {
  let service: UserContextWrapper = new UserContextWrapper();

  it.each`
    method      | expectedResult
    ${'GET'}    | ${ActionScope.own}
    ${'POST'}   | ${ActionScope.all}
    ${'PUT'}    | ${ActionScope.ownExcluded}
    ${'PATCH'}  | ${ActionScope.ownExcluded}
    ${'DELETE'} | ${ActionScope.none}
  `('should get access for $method', ({ method, expectedResult }) => {
    const access = service.getAccess(method, accessItem);
    expect(access).toBe(expectedResult);
  });

  it.each`
    url                               | expectedResult | instanceId
    ${'/api/users'}                   | ${'users'}     | ${-1}
    ${'/api/users/10'}                | ${'users'}     | ${10}
    ${'/api/products/10/comments/12'} | ${'comments'}  | ${12}
    ${'/api/products/10/comments'}    | ${'comments'}  | ${-1}
  `('should get model for $url', ({ url, expectedResult, instanceId }) => {
    service.setModelAndInstanceId(url);
    expect(service.model).toBe(expectedResult);
    expect(service.instanceId).toBe(instanceId);
  });
});
