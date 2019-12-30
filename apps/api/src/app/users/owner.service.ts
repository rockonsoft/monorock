import { Injectable } from '@nestjs/common';
import { AppUser } from '@monorock/api-interfaces';
import { getManager } from 'typeorm';
import { DbModelMeta } from '../dal/entities/model-meta-data.entity';
import { DbUserOwner } from '../dal/entities/user-owner.entity';

@Injectable()
export class OwnerService {
  constructor() {}

  async setOwner(user: AppUser, modelId: number, instanceId: number) {
    const entityManager = getManager();

    return await entityManager
      .createQueryBuilder()
      .insert()
      .into('userowned')
      .values({
        applicationId: user.applicationId,
        tenantId: user.tenantId,
        ownerId: user.userId,
        ownedId: instanceId,
        modelId: modelId
      })
      .execute();
  }

  async setOwnerByModeName(user: AppUser, modelName: string, instanceId: number) {
    const entityManager = getManager();
    const existingModel = await entityManager
      .createQueryBuilder(DbModelMeta, 'model')
      .where('model.applicationId = :appId', {
        appId: user.applicationId
      })
      .andWhere('model.name = :modelName', {
        modelName: modelName
      })
      .getOne();
    return await entityManager
      .createQueryBuilder()
      .insert()
      .into('userowned')
      .values({
        applicationId: user.applicationId,
        tenantId: user.tenantId,
        ownerId: user.userId,
        ownedId: instanceId,
        modelId: existingModel.id
      })
      .execute();
  }

  async getOwned(user: AppUser, modelId: number) {
    const entityManager = getManager();
    const userOwnedSql = await entityManager
      .createQueryBuilder(DbUserOwner, 'userowner')
      .select('userowner.ownedId')
      .where('userowner.ownerId=:userId', { userId: user.userId })
      .andWhere('userowner.modelId=:modelId', { modelId: modelId });

    return userOwnedSql.getMany();
  }
  getOwner(user: AppUser, modelId: number, id: any) {
    throw new Error('Method not implemented.');
  }
}
