import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
  SELECT "modelName", "modelId", "endpoint", "userId", "appId", aur."tenantId" AS "tid", "accessType", "roleName", aur."roleId" FROM (
  SELECT *,r.name as "roleName" FROM  (
   SELECT *, name as "modelName" FROM model m INNER JOIN accessright ar ON m."id" = ar."modelId"  ) 
   AS "modelrights" INNER JOIN role r ON modelrights."roleId" = r."id" ) 
   AS modelrole	INNER JOIN appuserrole aur ON  modelrole."roleId" = aur."roleId"
    `
})
export class UserAccessView {
  @ViewColumn()
  modelName: string;

  @ViewColumn()
  modelId: number;

  @ViewColumn()
  endpoint: string;

  @ViewColumn()
  userId: string;

  @ViewColumn()
  appId: number;

  @ViewColumn()
  tid: number;

  @ViewColumn()
  accessType: number;

  @ViewColumn()
  roleName: string;

  @ViewColumn()
  roleId: number;
}
