export enum UserRoles {
  Guest
}

export class AccessItem {
  model: string;
  access: number;
}

export interface AppUser {
  userId: string;
  display: string;
  tenantId: string;
  roles?: UserRoles[];
  apiToken?: string;
  oathToken?: string;
  accessProfile?: AccessItem[];
  isAnonymous?: boolean;
  email?: string;
  firstname?: string;
  lastname?: string;
  picture?: string;
}
