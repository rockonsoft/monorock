import { Module, Logger } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbUser } from './dal/entities/user.entity';
import { DbRole } from './dal/entities/role.entity';
import { DbBilling } from './dal/entities/billing.entity';
import { DbAccessRight } from './dal/entities/access-right.entity';
import { DbApplication } from './dal/entities/application.entity';
import { DbModelMeta } from './dal/entities/model-meta-data.entity';
import { DbAppUserRole } from './dal/entities/app-user-role.entity';
import { UserAccessView } from './dal/entities/user-access.entity';
import { HostedApplicationModule } from './hosted-app/hosted-app.module';
import { TenantsModule } from './tenants/tenants.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { DbTenant } from './dal/entities/tenant.entity';
import { DbComment } from './dal/entities/comment.entity';
import { DbProduct } from './dal/entities/product.entity';
import { CommentsModule } from './comments/comments.module';
import { ModelMetaModule } from './model-meta/model-meta.module';
import { ProductsModule } from './products/products.module';
import { DbUserSession } from './dal/entities/user-session.entity';
import { DbUserOwner } from './dal/entities/user-owner.entity';
import { UsersModule } from './users/users.module';
import { UserroleModule } from './userrole/userrole.module';
import { AccessRightsModule } from './accessrights/accessrights.module';
import { environment } from '../environments/environment';

let PWD = process.env.DB_PWD;
const connectionName = process.env.CLOUD_SQL_CONNECTION_NAME;
let dbname = 'testapi';
console.log(process.env);
let isCloud = false;

if (environment.production === true) {
  isCloud = true;
} else {
  PWD = environment.DB_PWD;
}

Logger.log(`connecting to db:${dbname} - ${PWD} - ${connectionName}`);

@Module({
  imports: [
    AuthModule,
    HostedApplicationModule,
    TenantsModule,
    RolesModule,
    ModelMetaModule,
    ProductsModule,
    CommentsModule,
    UsersModule,
    UserroleModule,
    AccessRightsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'changeme',
      database: dbname,
      host: `localhost`,
      port: 5432,
      extra: { poolSize: 10 },
      entities: [
        DbProduct,
        DbComment,
        DbRole,
        DbAccessRight,
        DbUser,
        DbTenant,
        DbBilling,
        DbApplication,
        DbModelMeta,
        DbAppUserRole,
        UserAccessView,
        DbUserSession,
        DbUserOwner
      ],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
