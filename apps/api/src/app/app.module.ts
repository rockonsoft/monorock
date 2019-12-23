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

const PWD = process.env.DB_PWD;
const connectionName = process.env.CLOUD_SQL_CONNECTION_NAME;
let dbname = 'tenant0';
const isCloud = process.env.DB_ENV === 'development' ? false : true;

Logger.log(`connecting to db:${dbname} - ${process.env.DB_ENV} - ${connectionName}`);

@Module({
  imports: [
    AuthModule,
    HostedApplicationModule,
    TenantsModule,
    RolesModule,
    ModelMetaModule,
    ProductsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: PWD,
      database: dbname,
      host: isCloud ? `/cloudsql/${connectionName}` : `localhost`,
      extra: { poolSize: 10 },
      entities: [
        DbProduct,
        DbComment,
        DbUser,
        DbTenant,
        DbRole,
        DbBilling,
        DbAccessRight,
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
