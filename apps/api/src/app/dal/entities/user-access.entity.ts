import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  expression: `
    SELECT "modelName","accessType", "roleName", modelrole."roleId" AS "roleId", "tid",application, "userId" FROM 
    (SELECT "modelName","accessType",application, name AS "roleName", "tenantId" AS tid, "roleId" FROM 
    (SELECT name AS "modelName", application, "roleId", "accessType" FROM model m INNER JOIN accessright ar ON m.id = ar.model) AS "modelrights" 
     INNER JOIN role r ON modelrights."roleId" = r."id" ) AS modelrole
    INNER JOIN appuserrole aur ON  modelrole."roleId" = aur."roleId"
    `
})
export class UserAccessView {
  @ViewColumn()
  modelName: string;

  @ViewColumn()
  accessType: number;

  @ViewColumn()
  roleName: string;

  @ViewColumn()
  roleId: number;

  @ViewColumn()
  tid: number;

  @ViewColumn()
  application: number;

  @ViewColumn()
  userId: string;
}
