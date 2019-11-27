import { Module, Controller, UseGuards, Logger } from '@nestjs/common';

import { Injectable } from '@nestjs/common';

import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Crud } from '@nestjsx/crud';
import { DbApplication } from '../dal/entities/application.entity';
import { AuthGuard } from '@nestjs/passport';
import { DbRole } from '../dal/entities/role.entity';
import {
  HOST_APPLICATION,
  GUEST_ROLE,
  USER_ADMIN_ROLE,
  TENANT_ADMIN_ROLE,
  GUEST_ROLE_DESC,
  TENANT_ADMIN_ROLE_DESC,
  USER_ADMIN_ROLE_DESC,
  HOST_APPLICATION_DESC,
  TENANT_ZERO_EXT_ID,
  TENANT_ZERO_NAME,
  TENANT_ZERO_DESCRIPTION,
  USER_MODEL_DESC,
  USER_MODEL_NAME,
  TENANT_MODEL_NAME,
  TENANT_MODEL_DESC,
  ROLE_MODEL_DESC,
  ROLE_MODEL_NAME,
  AccessType
} from '@monorock/api-interfaces';
import { DbTenant } from '../dal/entities/tenant.entity';
import { getManager } from 'typeorm';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';
import { DbAccessRight } from '../dal/entities/access-right.entity';

@Injectable()
export class HostedApplicationService extends TypeOrmCrudService<DbApplication> {
  rolesRepo = null;
  tenantRepo = null;
  constructor(
    @InjectRepository(DbApplication) repo,
    @InjectRepository(DbRole) rolesRepo,
    @InjectRepository(DbTenant) tenantRepo
  ) {
    super(repo);
    this.rolesRepo = rolesRepo;
    this.tenantRepo = tenantRepo;
    this.seed().then(() => {
      Logger.log('Hosted application seeding completed.');
    });
  }

  async seed() {
    const applicationId = await this.upsertApplication();

    const tenantId = await this.upsertTenant();

    const userModelId = await this.upsertModel(applicationId, USER_MODEL_NAME, USER_MODEL_DESC);
    const tenantModelId = await this.upsertModel(applicationId, TENANT_MODEL_NAME, TENANT_MODEL_DESC);
    const roleModelId = await this.upsertModel(applicationId, ROLE_MODEL_NAME, ROLE_MODEL_DESC);

    const guestRoleId = await this.upsertRole(GUEST_ROLE, GUEST_ROLE_DESC, applicationId, tenantId);
    const userAdminRoleId = await this.upsertRole(USER_ADMIN_ROLE, USER_ADMIN_ROLE_DESC, applicationId, tenantId);
    const tenantAdminRoleId = await this.upsertRole(TENANT_ADMIN_ROLE, TENANT_ADMIN_ROLE_DESC, applicationId, tenantId);

    await this.upsertAccessRight(guestRoleId, userModelId, AccessType.all_own);
    await this.upsertAccessRight(guestRoleId, tenantModelId, AccessType.read_own);
    await this.upsertAccessRight(guestRoleId, roleModelId, AccessType.read_own);

    await this.upsertAccessRight(userAdminRoleId, userModelId, AccessType.all);
    await this.upsertAccessRight(userAdminRoleId, tenantModelId, AccessType.read_own);
    await this.upsertAccessRight(userAdminRoleId, roleModelId, AccessType.all);

    await this.upsertAccessRight(tenantAdminRoleId, userModelId, AccessType.all_own);
    await this.upsertAccessRight(tenantAdminRoleId, tenantModelId, AccessType.all);
    await this.upsertAccessRight(tenantAdminRoleId, roleModelId, AccessType.all_own);
  }

  async upsertRole(roleName: string, roleDescription: string, applicationId: number, tenantId: number) {
    let id = null;
    const existing = await this.rolesRepo.findOne({
      applicationId: applicationId,
      name: roleName,
      tenantId: tenantId
    });
    if (!existing) {
      const newResult = await this.rolesRepo
        .createQueryBuilder()
        .insert()
        .into('role')
        .values({ name: roleName, applicationId: applicationId, tenantId: tenantId, description: roleDescription })
        .execute();
      id = newResult.identifiers[0]['id'];
    } else {
      id = existing.id;
    }
    return id;
  }

  async upsertApplication() {
    const existingApplication = await this.repo.findOne({ name: HOST_APPLICATION });
    let applicationId = null;
    if (!existingApplication) {
      const newAppResult = await this.repo
        .createQueryBuilder()
        .insert()
        .into('application')
        .values({ name: HOST_APPLICATION, description: HOST_APPLICATION_DESC })
        .execute();
      applicationId = newAppResult.identifiers[0]['id'];
    } else {
      applicationId = existingApplication.id;
    }
    return applicationId;
  }

  async upsertTenant() {
    const existing = await this.tenantRepo.findOne({ externalId: TENANT_ZERO_EXT_ID });
    let id = null;
    if (!existing) {
      const newResult = await this.tenantRepo
        .createQueryBuilder()
        .insert()
        .into('tenant')
        .values({ externalId: TENANT_ZERO_EXT_ID, name: TENANT_ZERO_NAME, description: TENANT_ZERO_DESCRIPTION })
        .execute();
      id = newResult.identifiers[0]['id'];
    } else {
      id = existing.id;
    }
    return id;
  }

  async upsertModel(applicationId: number, modelName: string, modelDescription: string) {
    let id = null;
    const entityManager = getManager();
    const existing = await entityManager
      .createQueryBuilder(DbModelMeta, 'model')
      .where('model.applicationId = :appId', {
        appId: applicationId
      })
      .andWhere('model.name = :modelName', {
        modelName: modelName
      })
      .getOne();

    if (!existing) {
      const newResult = await entityManager
        .createQueryBuilder(DbModelMeta, 'model')
        .insert()
        .into('model')
        .values({ name: modelName, description: modelDescription, applicationId: applicationId })
        .execute();
      id = newResult.identifiers[0]['id'];
    } else {
      id = existing.id;
    }
    return id;
  }

  async upsertAccessRight(roleId: number, modelId: number, accessType: AccessType) {
    let id = null;
    const entityManager = getManager();
    const existing = await entityManager
      .createQueryBuilder(DbAccessRight, 'accessright')
      .where('accessright.modelId = :modelId', {
        modelId: modelId
      })
      .andWhere('accessright.roleId = :roleId', {
        roleId: roleId
      })
      .getOne();

    if (!existing) {
      const newResult = await entityManager
        .createQueryBuilder(DbAccessRight, 'accessright')
        .insert()
        .into('accessright')
        .values({ modelId: modelId, roleId: roleId, accessType: accessType })
        .execute();
      id = newResult.identifiers[0]['id'];
    } else {
      id = existing.id;
    }
    return id;
  }
}

@UseGuards(AuthGuard('jwt'))
@Crud({
  model: {
    type: DbApplication
  }
})
@Controller('hostedapplication')
export class HostedApplicationController {
  constructor(public service: HostedApplicationService) {}
}

@Module({
  imports: [TypeOrmModule.forFeature([DbApplication, DbRole, DbTenant])],
  providers: [HostedApplicationService],
  controllers: [HostedApplicationController]
})
export class HostedApplicationModule {}
