import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DbUser } from '../dal/entities/user.entity';
import { getManager } from 'typeorm';
import { UserAccessView } from '../dal/entities/user-access.entity';
import { DbAppUserRole } from '../dal/entities/app-user-role.entity';
import { DbRole } from '../dal/entities/role.entity';
import {
  AppUser,
  GUEST_ROLE,
  HOST_APPLICATION,
  TENANT_ZERO_EXT_ID,
  TENANT_ZERO_NAME,
  TENANT_ADMIN_ROLE,
  USER_ADMIN_ROLE
} from '@monorock/api-interfaces';
import { DbApplication } from '../dal/entities/application.entity';
import { DbTenant } from '../dal/entities/tenant.entity';

export type User = any;

@Injectable()
export class UsersService extends TypeOrmCrudService<DbUser> {
  constructor(@InjectRepository(DbUser) repo) {
    super(repo);
  }

  async upsertUser(user: AppUser) {
    Logger.log('Start upsert user');

    let tenantExtId = user.isAnonymous === false ? user.userId : TENANT_ZERO_EXT_ID;
    //guess tenant name
    let tenantName = TENANT_ZERO_NAME;
    if (user.email) {
      tenantName = user.email.split('@')[1];
    }

    const entityManager = getManager();

    const tenantId = await this.upsertTenant(tenantExtId, tenantName);

    const existing = await this.repo
      .createQueryBuilder('appuser')
      .where('appuser.userId = :userId', {
        userId: user.userId
      })
      .getOne();
    if (!existing) {
      Logger.log(`Inserting user: ${user.display}: ${user.userId}`);

      user.tenantExternalId = tenantExtId;
      user.tenantId = tenantId;
      const newUser = await this.repo.save(user);
      //assign Guest role
      if (user.isAnonymous) {
        await this.assignRole(GUEST_ROLE, newUser, tenantId);
      } else {
        //original singned in user creates new tenant
        await this.assignRole(TENANT_ADMIN_ROLE, newUser, tenantId);
        await this.assignRole(USER_ADMIN_ROLE, newUser, tenantId);
        //Todo kick off more tenant initiation stuff here
      }
      return newUser;
    } else return existing;
  }

  async upsertTenant(tenantExtId: string, tenantName: string) {
    const entityManager = getManager();
    const existing = await entityManager
      .createQueryBuilder(DbTenant, 'tenant')
      .where('tenant.externalId = :extId', {
        extId: tenantExtId
      })
      .getOne();
    let id = null;
    if (!existing) {
      const newResult = await entityManager
        .createQueryBuilder()
        .insert()
        .into('tenant')
        .values({ externalId: tenantExtId, name: tenantName, description: tenantName })
        .execute();
      id = newResult.identifiers[0]['id'];
    } else {
      id = existing.id;
    }
    return id;
  }

  async assignRole(roleName: string, newUser: DbUser, tenantId: number) {
    const entityManager = getManager();

    const app0 = await entityManager
      .createQueryBuilder(DbApplication, 'application')
      .where('application.name = :appName', {
        appName: HOST_APPLICATION
      })
      .getOne();

    const role = await entityManager
      .createQueryBuilder(DbRole, 'role')
      .where('role.name = :guestRole', {
        guestRole: roleName
      })
      .getOne();

    const dbAppUserRole: DbAppUserRole = {
      appId: app0.id,
      tenantId: tenantId,
      roleId: role.id,
      userId: newUser.userId
    };

    const res = await entityManager
      .createQueryBuilder(DbAppUserRole, 'appuserrole')
      .insert()
      .into('appuserrole')
      .values(dbAppUserRole)
      .execute();
    return res;
  }

  async getFullUser(userId: string) {
    //users lives in firestore
    //tenants live in firestore
    const dbUser = await this.repo
      .createQueryBuilder('appuser')
      .where('appuser.userId = :userId', {
        userId: userId
      })
      .getOne();

    if (!dbUser) {
      throw new UnauthorizedException();
    }

    //TODO use relation to get in one query
    const entityManager = getManager();

    const tenant = await entityManager
      .createQueryBuilder(DbTenant, 'tenant')
      .where('tenant.externalId = :extId', {
        extId: dbUser.tenantExternalId ? dbUser.tenantExternalId : TENANT_ZERO_EXT_ID
      })
      .getOne();

    //check access
    const res = await entityManager
      .createQueryBuilder(UserAccessView, 'accessview')
      .where('accessview.userId =  :userId', {
        userId: userId
      })
      .getMany();
    const accessProfile = res.map(accView => {
      return {
        model: accView.modelName,
        access: accView.accessType
      };
    });

    const roles = [...new Set(res.map(accView => accView.roleName))];

    const appUser: AppUser = {
      userId: userId,
      display: dbUser.display,
      tenantId: tenant.id,
      tenantExternalId: tenant.externalId,
      email: dbUser.email,
      picture: dbUser.picture,
      isAnonymous: false,
      roles: roles,
      accessProfile: accessProfile
    };
    return appUser;
  }
}
