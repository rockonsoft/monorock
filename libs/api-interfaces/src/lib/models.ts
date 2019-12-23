//ACCESS NUM  |DELETE|CREATE|UPDATE  |READ|
//ACCESS QUAD |ALL   |None |EXCL.OWN|OWN |

export enum ActionType {
  read = 0,
  update = 4,
  create = 8,
  delete = 12
}

export enum ActionScope {
  own = 0x0001,
  ownExcluded = 0x0002,
  none = 0x0004,
  all = 0x0008
}

export function getAccessType(actionType: ActionType, actionScope): number {
  return actionScope << actionType;
}

export function getReadAccess(access: number): ActionScope {
  const readRights = access & 0x000f;

  if (readRights & ActionScope.all) return ActionScope.all;
  if (readRights & ActionScope.none) return ActionScope.none;
  if (readRights & ActionScope.ownExcluded) return ActionScope.ownExcluded;
  if (readRights & ActionScope.own) return ActionScope.own;
  return ActionScope.none;
}

export function getCreateAccess(access: number): ActionScope {
  const createRights = (access & 0x0f00) >> ActionType.create;
  if (createRights & ActionScope.all) return ActionScope.all;
  if (createRights & ActionScope.none) return ActionScope.none;
  if (createRights & ActionScope.ownExcluded) return ActionScope.ownExcluded;
  if (createRights & ActionScope.own) return ActionScope.own;
  return ActionScope.none;
}

export function getUpdateAccess(access: number): ActionScope {
  const updateRights = (access & 0x00f0) >> ActionType.update;
  if (updateRights & ActionScope.all) return ActionScope.all;
  if (updateRights & ActionScope.none) return ActionScope.none;
  if (updateRights & ActionScope.ownExcluded) return ActionScope.ownExcluded;
  if (updateRights & ActionScope.own) return ActionScope.own;
  return ActionScope.none;
}

export function getDeleteAccess(access: number): ActionScope {
  const deleteRights = (access & 0xf000) >> ActionType.delete;
  if (deleteRights & ActionScope.all) return ActionScope.all;
  if (deleteRights & ActionScope.none) return ActionScope.none;
  if (deleteRights & ActionScope.ownExcluded) return ActionScope.ownExcluded;
  if (deleteRights & ActionScope.own) return ActionScope.own;
  return ActionScope.none;
}

function getScopeText(scope: number) {
  if (scope & ActionScope.all) return 'All';
  if (scope & ActionScope.none) return 'Not Allowed';
  if (scope & ActionScope.ownExcluded) return 'Except Own';
  if (scope & ActionScope.own) return 'Own';

  return 'Not allowed';
}

export function getFriendlyAccessName(accessType: number, model: string) {
  const readRights = accessType & 0x000f;
  const updateRights = (accessType & 0x00f0) >> ActionType.update;
  const createRights = (accessType & 0x0f00) >> ActionType.create;
  const deleteRights = (accessType & 0xf000) >> ActionType.delete;

  const readTxt = `Read:${getScopeText(readRights)}`;
  const updateTxt = `Update:${getScopeText(updateRights)}`;
  const createTxt = `Create:${getScopeText(createRights)}`;
  const DeleteTxt = `Delete:${getScopeText(deleteRights)}`;

  return `User is allowed: ${readTxt},${updateTxt},${createTxt},${DeleteTxt} on ${model}`;
}

export interface HostedApplication {}
export interface ModelMeta {
  id: number;
  name: string;
  description: string;
  endpoint: string;
  identityProperty: string;
  parentName?: string;
}
export interface Role {}
export interface Tenant {}
export interface Product {}
export interface UserComment {}

export interface TestResult {
  statusCode: string;
  error: string;
}
