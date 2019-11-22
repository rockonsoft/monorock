import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbUser } from './dal/entities/user.entity';
import { DbTenant } from './dal/entities/tenant.entity';
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

const PWD = process.env.DB_PWD;
const connectionName = process.env.CLOUD_SQL_CONNECTION_NAME;
let dbname = 'tenant0';
const isCloud = process.env.DB_ENV === 'development' ? false : true;

console.log(`connecting to db:${dbname} - ${process.env.DB_ENV} - ${connectionName}`);

@Module({
  imports: [
    AuthModule,
    HostedApplicationModule,
    TenantsModule,
    RolesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: PWD,
      database: dbname,
      host: isCloud ? `/cloudsql/${connectionName}` : `localhost`,
      extra: { poolSize: 10 },
      entities: [
        DbUser,
        DbTenant,
        DbRole,
        DbBilling,
        DbAccessRight,
        DbApplication,
        DbModelMeta,
        DbAppUserRole,
        UserAccessView
      ],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
