import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DbUser } from '../dal/entities/user.entity';
import { getManager } from 'typeorm';
import { UserAccessView } from '../dal/entities/user-access.entity';
import { DbAppUserRole } from '../dal/entities/app-user-role.entity';
import { DbRole } from '../dal/entities/role.entity';
import { AppUser, UserRoles } from '@monorock/api-interfaces';

export type User = any;

@Injectable()
export class UsersService extends TypeOrmCrudService<DbUser> {
  constructor(@InjectRepository(DbUser) repo) {
    super(repo);
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find(user => user.username === username);
  // }

  async upsertUser(user: AppUser) {
    const existing = await this.repo
      .createQueryBuilder('appuser')
      .where('appuser.userId = :userId', {
        userId: user.userId
      })
      .getOne();
    if (!existing) {
      Logger.log(`Inserting user: ${user.display}: ${user.userId}`);
      const newUser = await this.repo.save(user);
      //assign Guest role
      await this.assignGuestRole(newUser);
    } else return existing;
  }

  async assignGuestRole(newUser: DbUser) {
    const entityManager = getManager();

    const role = await entityManager
      .createQueryBuilder(DbRole, 'role')
      .where('role.name = :guestRole', {
        guestRole: 'GUESTUSER'
      })
      .getOne();
    const dbAppUserRole: DbAppUserRole = {
      appId: 1,
      tenantId: 3,
      roleId: role.id,
      userId: newUser.userId
    };
    const res = await entityManager
      .createQueryBuilder()
      .insert()
      .into('appuserrole')
      .values([dbAppUserRole])
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

    //check access
    const entityManager = getManager();
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

    const appUser: AppUser = {
      userId: userId,
      display: dbUser.display,
      tenantId: 'tenant-0',
      email: dbUser.email,
      picture: dbUser.picture,
      isAnonymous: false,
      roles: [UserRoles.Guest],
      accessProfile: accessProfile
    };
    return appUser;
  }
}
