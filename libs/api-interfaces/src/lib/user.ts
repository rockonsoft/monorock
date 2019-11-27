export interface AccessCheckResult {
  hasAccess: boolean;
}

export class AccessItem {
  model: string;
  access: number;
}

export interface AppUser {
  userId: string;
  display: string;
  tenantId?: number;
  tenantExternalId?: string;
  roles?: string[];
  apiToken?: string;
  oathToken?: string;
  accessProfile?: AccessItem[];
  isAnonymous?: boolean;
  email?: string;
  firstname?: string;
  lastname?: string;
  picture?: string;
}
