export const JWT_USER = 'jwttoken';
export const SUPER_USER_NAME = 'superuser';
export const SUPER_USER_PWD = 'superuser';
export const API_BASE = 'api';

export const HOST_APPLICATION = 'Application0';
export const GUEST_ROLE = 'GUEST_ROLE';
export const USER_ADMIN_ROLE = 'USER_ADMIN_ROLE';
export const TENANT_ADMIN_ROLE = 'TENANT_ADMIN_ROLE';

export const HOST_APPLICATION_DESC = 'The first hosting application';
export const GUEST_ROLE_DESC = 'Anonymous user role.';
export const USER_ADMIN_ROLE_DESC = 'Users in this role manages other user.';
export const TENANT_ADMIN_ROLE_DESC = 'Users in this role manages tenants';

export const TENANT_ZERO_EXT_ID = 'Tenant0';
export const TENANT_ZERO_NAME = 'Tenant0';
export const TENANT_ZERO_DESCRIPTION = 'Base system tenant';

export const USER_MODEL_NAME = 'User';
export const USER_MODEL_DESC = 'Users that use the application';
export const USER_MODEL_ENDPOINT = 'users';

export const TENANT_MODEL_NAME = 'Tenant';
export const TENANT_MODEL_DESC = 'Tenants are organizations that use the application';
export const TENANT_MODEL_ENDPOINT = 'tenants';

export const ROLE_MODEL_NAME = 'Role';
export const ROLE_MODEL_DESC = 'Roles are the function a user has in the application';
export const ROLE_MODEL_ENDPOINT = 'roles';

export const PRODUCT_MODEL_NAME = 'Product';
export const PRODUCT_MODEL_DESC = 'Products and services sold by the organization';
export const PRODUCT_MODEL_ENDPOINT = 'products';

export const COMMENT_MODEL_NAME = 'Comment';
export const COMMENT_MODEL_DESC = 'User reaction and views on products';
export const COMMENT_MODEL_ENDPOINT = 'products/:parentId/comments';

export const STATUS_OK = 'OK';

export interface Message {
  message: string;
}
