export interface AccessCheckResult {
  hasAccess: boolean;
}

export class AccessItem {
  model: string;
  access: number;
  modelId: number;
  endpoint: string;
}

export interface AppUser {
  userId: string;
  id?: number;
  display: string;
  tenantId?: number;
  applicationId?: number;
  tenantExternalId?: string;
  tenantName?: string;
  roles?: string[];
  apiToken?: string;
  oathToken?: string;
  refreshToken?: string;
  accessProfile?: AccessItem[];
  isAnonymous?: boolean;
  email?: string;
  firstname?: string;
  lastname?: string;
  picture?: string;
}

//Todo - do proper separation here
export interface UserProfile {
  userId: string;
  id?: number;
  display: string;
  tenantId?: number;
  applicationId?: number;
  tenantExternalId?: string;
  tenantName?: string;
  roles?: string[];
  apiToken?: string;
  oathToken?: string;
  refreshToken?: string;
  accessProfile?: AccessItem[];
  isAnonymous?: boolean;
  email?: string;
  firstname?: string;
  lastname?: string;
  picture?: string;
}
