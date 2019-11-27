export enum AccessType {
  create,
  create_own,
  read,
  read_own,
  update,
  update_own,
  delete,
  delete_own,
  all,
  all_own
}

export function getFriendlyAccessName(accessType: AccessType, model: string) {
  switch (accessType) {
    case AccessType.create:
      return `Allows user to create ${model} for any user`;
    case AccessType.create_own:
      return `Allows user to create own ${model}.`;
    case AccessType.read:
      return `Allows user to read ${model} for any user.`;
    case AccessType.read_own:
      return `Allows user to read own ${model}.`;
    case AccessType.update:
      return `Allows user to update ${model} for any user.`;
    case AccessType.update_own:
      return `Allows user to update own ${model}.`;
    case AccessType.delete:
      return `Allows user to delete ${model} for any user.`;
    case AccessType.delete_own:
      return `Allows user to delete own ${model}.`;
    case AccessType.all:
      return `Allows user to list, read, create, update and delete ${model} for any user.`;
    case AccessType.all_own:
      return `Allows user to list, read, create, update and delete own ${model}.`;
    default:
      return `Has no rights on model ${model}.`;
  }
}

export interface HostedApplication {}
export interface ModelMeta {}
export interface Role {}
export interface Tenant {}
