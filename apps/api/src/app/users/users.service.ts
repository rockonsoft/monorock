import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DbUser } from '../dal/entities/user.entity';
import { getManager } from 'typeorm';
import { UserAccessView } from '../dal/entities/user-access.entity';
import { DbAppUserRole } from '../dal/entities/app-user-role.entity';
import { DbRole } from '../dal/entities/role.entity';
import { AppUser, GUEST_ROLE, HOST_APPLICATION, TENANT_ZERO_EXT_ID } from '@monorock/api-interfaces';
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

    const entityManager = getManager();
    const tenant0 = await entityManager
      .createQueryBuilder(DbTenant, 'tenant')
      .where('tenant.externalId = :extId', {
        extId: TENANT_ZERO_EXT_ID
      })
      .getOne();

    const existing = await this.repo
      .createQueryBuilder('appuser')
      .where('appuser.userId = :userId', {
        userId: user.userId
      })
      .getOne();
    if (!existing) {
      Logger.log(`Inserting user: ${user.display}: ${user.userId}`);

      user.tenantExternalId = tenant0.externalId;
      user.tenantId = tenant0.id;
      const newUser = await this.repo.save(user);
      //assign Guest role
      await this.assignGuestRole(newUser);
      return newUser;
    } else return existing;
  }

  async assignGuestRole(newUser: DbUser) {
    const entityManager = getManager();

    const app0 = await entityManager
      .createQueryBuilder(DbApplication, 'application')
      .where('application.name = :appName', {
        appName: HOST_APPLICATION
      })
      .getOne();

    const tenant0 = await entityManager
      .createQueryBuilder(DbTenant, 'tenant')
      .where('tenant.externalId = :extId', {
        extId: TENANT_ZERO_EXT_ID
      })
      .getOne();

    const role = await entityManager
      .createQueryBuilder(DbRole, 'role')
      .where('role.name = :guestRole', {
        guestRole: GUEST_ROLE
      })
      .getOne();
    const dbAppUserRole: DbAppUserRole = {
      appId: app0.id,
      tenantId: tenant0.id,
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
