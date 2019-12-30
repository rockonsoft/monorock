import { Injectable, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
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
  USER_ADMIN_ROLE,
  TENANT_MODEL_NAME,
  USER_MODEL_NAME,
  SUPER_USER_NAME
} from '@monorock/api-interfaces';
import { DbApplication } from '../dal/entities/application.entity';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';
import { DbTenant } from '../dal/entities/tenant.entity';
import * as randtoken from 'rand-token';
import { DbUserSession } from '../dal/entities/user-session.entity';
import * as moment from 'moment';
import { logger } from '../../main';
import { OwnerService } from './owner.service';

export type User = any;

@Injectable()
export class UsersService extends TypeOrmCrudService<DbUser> {
  constructor(@InjectRepository(DbUser) repo, private ownerService: OwnerService) {
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

    const application = await entityManager
      .createQueryBuilder(DbApplication, 'application')
      .where('application.name = :name', {
        name: HOST_APPLICATION
      })
      .getOne();

    const tenantId = await this.upsertTenant(tenantExtId, tenantName);
    const refreshToken = await this.getRefreshToken(user);

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
      user.applicationId = application.id;
      user.id = (await this.repo.count()) + 1;
      const newUser = await this.repo.save(user);
      newUser.refreshToken = refreshToken;

      // user owns tenant
      await this.ownerService.setOwnerByModeName(newUser, TENANT_MODEL_NAME, tenantId);

      // user owns user
      await this.ownerService.setOwnerByModeName(newUser, USER_MODEL_NAME, newUser.id);

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
    } else {
      Logger.log(`User exists`);
      const retUser: AppUser = existing as AppUser;
      retUser.refreshToken = refreshToken;
      Logger.log(retUser);

      return retUser;
    }
  }

  async getSuperUser(user: AppUser) {
    Logger.log('getting supuer user');
    let tenantExtId = TENANT_ZERO_EXT_ID;
    //guess tenant name
    let tenantName = TENANT_ZERO_NAME;
    if (user.email) {
      tenantName = user.email.split('@')[1];
    }

    const entityManager = getManager();

    const application = await entityManager
      .createQueryBuilder(DbApplication, 'application')
      .where('application.name = :name', {
        name: HOST_APPLICATION
      })
      .getOne();

    const tenantId = await this.upsertTenant(tenantExtId, tenantName);
    const refreshToken = await this.getRefreshToken(user);
    return {
      userId: user.userId,
      display: user.userId,
      picture: null,
      email: null,
      isAnonymous: false,
      id: 0,
      tenantExternalId: tenantExtId,
      tenantId: tenantId,
      applicationId: application.id,
      refreshToken: refreshToken
    };
  }

  async getRefreshToken(user: AppUser) {
    const entityManager = getManager();
    //delete stale tokens
    const delresults = await entityManager
      .createQueryBuilder(DbUserSession, 'usersession')
      .delete()
      .where('updatedAt < :halfhour', {
        halfhour: moment
          .utc()
          .subtract(30, 'minutes')
          .toDate()
      })
      .execute();
    Logger.log(delresults);

    //check if user has token
    Logger.log(`getting token for ${user.userId}`);
    const existing = await entityManager
      .createQueryBuilder(DbUserSession, 'usersession')
      .where('usersession.userId = :userId', {
        userId: user.userId
      })
      .getOne();
    const now = moment.utc().toDate();
    if (!existing) {
      //create token if not
      const token = randtoken.uid(8);
      Logger.log(`Start insert of token :${token} for user:${user.userId}`);
      const newResult = await entityManager
        .createQueryBuilder(DbUserSession, 'usersession')
        .insert()
        .into('usersession')
        .values({ userId: user.userId, refreshToken: token, createdAt: now, updatedAt: now })
        .execute();
      Logger.log(newResult);
      return token;
    } else {
      //if token exists, update and return;
      const token = existing.refreshToken;
      // const updateQuery = await entityManager
      //   .createQueryBuilder(DbUserSession, 'usersession')
      //   .update({ updatedAt: moment.utc().format() })
      //   .where({ userId: existing.userId });
      // Logger.log(updateQuery.getSql());

      // const updated = updateQuery.execute();
      // Logger.log(updated);
      return token;
    }
    //create token if not
  }
  async checkRefreshToken(token: string) {
    //find user with token
    const entityManager = getManager();
    const existing = await entityManager
      .createQueryBuilder(DbUserSession, 'usersession')
      .where('"refreshToken" = :refreshToken', {
        refreshToken: token
      })
      .getOne();
    return existing;
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

  async assignRoleByUserId(roleName: string, userId: string) {
    const dbUser = await this.repo
      .createQueryBuilder('appuser')
      .where('appuser.userId = :userId', {
        userId: userId
      })
      .getOne();

    if (!dbUser) {
      throw new BadRequestException();
    }
    await this.removeAllRoles(dbUser);

    return this.assignRole(roleName, dbUser, dbUser.tenantId);
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

  async removeAllRoles(user: DbUser) {
    const entityManager = getManager();

    const res = await entityManager
      .createQueryBuilder(DbAppUserRole, 'appuserrole')
      .delete()
      .where('userId = :id', { id: user.userId })
      .execute();
    return res;
  }

  async getFullUser(userId: string) {
    if (userId === SUPER_USER_NAME) return await this.getSuperUser({ userId: userId, display: userId });
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
    let accessProfile = [];
    res.forEach(accView => {
      const findModel = accessProfile.find(x => x.model === accView.modelName.toLocaleLowerCase());
      if (findModel) {
        findModel.access = findModel.access | accView.accessType;
      } else {
        accessProfile.push({
          model: accView.modelName.toLocaleLowerCase(),
          modelId: accView.modelId,
          access: accView.accessType,
          endpoint: accView.endpoint
        });
      }
    });

    const roles = [...new Set(res.map(accView => accView.roleName))];

    const appUser: AppUser = {
      userId: userId,
      id: dbUser.id,
      display: dbUser.display,
      tenantId: tenant.id,
      tenantExternalId: tenant.externalId,
      tenantName: tenant.name,
      email: dbUser.email,
      picture: dbUser.picture,
      isAnonymous: false,
      roles: roles,
      accessProfile: accessProfile,
      applicationId: dbUser.applicationId
    };
    return appUser;
  }
}
