/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const app_controller_1 = __webpack_require__(6);
const app_service_1 = __webpack_require__(30);
const typeorm_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(11);
const role_entity_1 = __webpack_require__(17);
const billing_entity_1 = __webpack_require__(31);
const access_right_entity_1 = __webpack_require__(32);
const application_entity_1 = __webpack_require__(23);
const model_meta_data_entity_1 = __webpack_require__(28);
const app_user_role_entity_1 = __webpack_require__(16);
const user_access_entity_1 = __webpack_require__(15);
const hosted_app_module_1 = __webpack_require__(33);
const tenants_module_1 = __webpack_require__(35);
const roles_module_1 = __webpack_require__(39);
const auth_module_1 = __webpack_require__(42);
const tenant_entity_1 = __webpack_require__(13);
const comment_entity_1 = __webpack_require__(57);
const product_entity_1 = __webpack_require__(58);
const comments_module_1 = __webpack_require__(60);
const model_meta_module_1 = __webpack_require__(61);
const products_module_1 = __webpack_require__(62);
const user_session_entity_1 = __webpack_require__(25);
const user_owner_entity_1 = __webpack_require__(29);
const users_module_1 = __webpack_require__(47);
const userrole_module_1 = __webpack_require__(63);
const accessrights_module_1 = __webpack_require__(65);
const environment_1 = __webpack_require__(66);
let PWD = process.env.DB_PWD;
const connectionName = process.env.CLOUD_SQL_CONNECTION_NAME;
let dbname = 'testapi';
let isCloud = false;
if (environment_1.environment.production === true) {
    isCloud = true;
}
else {
    PWD = environment_1.environment.DB_PWD;
}
common_1.Logger.log(`connecting to db:${dbname} - ${PWD} - ${connectionName}`);
common_1.Logger.log(`connecting to db:${dbname} - ${process.env.DB_ENV} - ${connectionName}`);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            hosted_app_module_1.HostedApplicationModule,
            tenants_module_1.TenantsModule,
            roles_module_1.RolesModule,
            model_meta_module_1.ModelMetaModule,
            products_module_1.ProductsModule,
            comments_module_1.CommentsModule,
            users_module_1.UsersModule,
            userrole_module_1.UserroleModule,
            accessrights_module_1.AccessRightsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                username: 'postgres',
                password: PWD,
                database: dbname,
                host: isCloud ? `/cloudsql/${connectionName}` : `localhost`,
                extra: { poolSize: 10 },
                entities: [
                    product_entity_1.DbProduct,
                    comment_entity_1.DbComment,
                    role_entity_1.DbRole,
                    access_right_entity_1.DbAccessRight,
                    user_entity_1.DbUser,
                    tenant_entity_1.DbTenant,
                    billing_entity_1.DbBilling,
                    application_entity_1.DbApplication,
                    model_meta_data_entity_1.DbModelMeta,
                    app_user_role_entity_1.DbAppUserRole,
                    user_access_entity_1.UserAccessView,
                    user_session_entity_1.DbUserSession,
                    user_owner_entity_1.DbUserOwner
                ],
                synchronize: true
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(7);
const users_service_1 = __webpack_require__(8);
let AppController = class AppController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(req) {
        const timestamp = req.params.timestamp;
        common_1.Logger.log(`Received request on api/profile/${timestamp}`);
        //this is potentially the second call to the same function
        const fullUser = await this.usersService.getFullUser(req.user.userId);
        return fullUser;
    }
    async getEnv() {
        common_1.Logger.log(`Received request on api/environment`);
        return { build: process.env.BUILD_ID ? process.env.BUILD_ID : 'local', db_env: process.env.DB_ENV };
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('profile/:timestamp'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('environment'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], AppController.prototype, "getEnv", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const crud_typeorm_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(11);
const typeorm_2 = __webpack_require__(12);
const user_access_entity_1 = __webpack_require__(15);
const app_user_role_entity_1 = __webpack_require__(16);
const role_entity_1 = __webpack_require__(17);
const api_interfaces_1 = __webpack_require__(18);
const application_entity_1 = __webpack_require__(23);
const tenant_entity_1 = __webpack_require__(13);
const randtoken = tslib_1.__importStar(__webpack_require__(24));
const user_session_entity_1 = __webpack_require__(25);
const moment = tslib_1.__importStar(__webpack_require__(26));
const owner_service_1 = __webpack_require__(27);
let UsersService = class UsersService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, ownerService) {
        super(repo);
        this.ownerService = ownerService;
    }
    async upsertUser(user) {
        common_1.Logger.log('Start upsert user');
        let tenantExtId = user.isAnonymous === false ? user.userId : api_interfaces_1.TENANT_ZERO_EXT_ID;
        //guess tenant name
        let tenantName = api_interfaces_1.TENANT_ZERO_NAME;
        if (user.email) {
            tenantName = user.email.split('@')[1];
        }
        const entityManager = (0, typeorm_2.getManager)();
        const application = await entityManager
            .createQueryBuilder(application_entity_1.DbApplication, 'application')
            .where('application.name = :name', {
            name: api_interfaces_1.HOST_APPLICATION
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
            common_1.Logger.log(`Inserting user: ${user.display}: ${user.userId}`);
            user.tenantExternalId = tenantExtId;
            user.tenantId = tenantId;
            user.applicationId = application.id;
            user.id = (await this.repo.count()) + 1;
            const newUser = await this.repo.save(user);
            newUser.refreshToken = refreshToken;
            // user owns tenant
            await this.ownerService.setOwnerByModeName(newUser, api_interfaces_1.TENANT_MODEL_NAME, tenantId);
            // user owns user
            await this.ownerService.setOwnerByModeName(newUser, api_interfaces_1.USER_MODEL_NAME, newUser.id);
            //assign Guest role
            if (user.isAnonymous) {
                await this.assignRole(api_interfaces_1.GUEST_ROLE, newUser, tenantId);
            }
            else {
                //original singned in user creates new tenant
                await this.assignRole(api_interfaces_1.TENANT_ADMIN_ROLE, newUser, tenantId);
                await this.assignRole(api_interfaces_1.USER_ADMIN_ROLE, newUser, tenantId);
                //Todo kick off more tenant initiation stuff here
            }
            return newUser;
        }
        else {
            common_1.Logger.log(`User exists`);
            const retUser = existing;
            retUser.refreshToken = refreshToken;
            return retUser;
        }
    }
    async getSuperUser(user) {
        common_1.Logger.log('getting supuer user');
        let tenantExtId = api_interfaces_1.TENANT_ZERO_EXT_ID;
        //guess tenant name
        let tenantName = api_interfaces_1.TENANT_ZERO_NAME;
        if (user.email) {
            tenantName = user.email.split('@')[1];
        }
        const entityManager = (0, typeorm_2.getManager)();
        const application = await entityManager
            .createQueryBuilder(application_entity_1.DbApplication, 'application')
            .where('application.name = :name', {
            name: api_interfaces_1.HOST_APPLICATION
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
    async getRefreshToken(user) {
        const entityManager = (0, typeorm_2.getManager)();
        //delete stale tokens
        const delresults = await entityManager
            .createQueryBuilder(user_session_entity_1.DbUserSession, 'usersession')
            .delete()
            .where('updatedAt < :halfhour', {
            halfhour: moment
                .utc()
                .subtract(30, 'minutes')
                .toDate()
        })
            .execute();
        //check if user has token
        common_1.Logger.log(`getting token for ${user.userId}`);
        const existing = await entityManager
            .createQueryBuilder(user_session_entity_1.DbUserSession, 'usersession')
            .where('usersession.userId = :userId', {
            userId: user.userId
        })
            .getOne();
        const now = moment.utc().toDate();
        if (!existing) {
            //create token if not
            const token = randtoken.uid(8);
            common_1.Logger.log(`Start insert of token :${token} for user:${user.userId}`);
            const newResult = await entityManager
                .createQueryBuilder(user_session_entity_1.DbUserSession, 'usersession')
                .insert()
                .into('usersession')
                .values({ userId: user.userId, refreshToken: token, createdAt: now, updatedAt: now })
                .execute();
            return token;
        }
        else {
            const token = existing.refreshToken;
            return token;
        }
        //create token if not
    }
    async checkRefreshToken(token) {
        //find user with token
        const entityManager = (0, typeorm_2.getManager)();
        const existing = await entityManager
            .createQueryBuilder(user_session_entity_1.DbUserSession, 'usersession')
            .where('"refreshToken" = :refreshToken', {
            refreshToken: token
        })
            .getOne();
        return existing;
    }
    async upsertTenant(tenantExtId, tenantName) {
        const entityManager = (0, typeorm_2.getManager)();
        const existing = await entityManager
            .createQueryBuilder(tenant_entity_1.DbTenant, 'tenant')
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
        }
        else {
            id = existing.id;
        }
        return id;
    }
    async assignRoleByUserId(roleName, userId) {
        common_1.Logger.log(`Assign role:${roleName} to user:${userId}`);
        const dbUser = await this.repo
            .createQueryBuilder('appuser')
            .where('appuser.userId = :userId', {
            userId: userId
        })
            .getOne();
        if (!dbUser) {
            throw new common_1.BadRequestException();
        }
        await this.removeAllRoles(dbUser);
        await this.assignRole(roleName, dbUser, dbUser.tenantId);
    }
    async assignRole(roleName, newUser, tenantId) {
        const entityManager = (0, typeorm_2.getManager)();
        const app0 = await entityManager
            .createQueryBuilder(application_entity_1.DbApplication, 'application')
            .where('application.name = :appName', {
            appName: api_interfaces_1.HOST_APPLICATION
        })
            .getOne();
        const role = await entityManager
            .createQueryBuilder(role_entity_1.DbRole, 'role')
            .where('role.name = :guestRole', {
            guestRole: roleName
        })
            .getOne();
        const dbAppUserRole = {
            appId: app0.id,
            tenantId: tenantId,
            roleId: role.id,
            userId: newUser.userId
        };
        const res = await entityManager
            .createQueryBuilder(app_user_role_entity_1.DbAppUserRole, 'appuserrole')
            .insert()
            .into('appuserrole')
            .values(dbAppUserRole)
            .execute();
        return res;
    }
    async removeAllRoles(user) {
        const entityManager = (0, typeorm_2.getManager)();
        const res = await entityManager
            .createQueryBuilder(app_user_role_entity_1.DbAppUserRole, 'appuserrole')
            .delete()
            .where('userId = :id', { id: user.userId })
            .execute();
        return res;
    }
    async getFullUser(userId) {
        if (userId === api_interfaces_1.SUPER_USER_NAME)
            return await this.getSuperUser({ userId: userId, display: userId });
        const dbUser = await this.repo
            .createQueryBuilder('appuser')
            .where('appuser.userId = :userId', {
            userId: userId
        })
            .getOne();
        if (!dbUser) {
            throw new common_1.UnauthorizedException();
        }
        //TODO use relation to get in one query
        const entityManager = (0, typeorm_2.getManager)();
        const tenant = await entityManager
            .createQueryBuilder(tenant_entity_1.DbTenant, 'tenant')
            .where('tenant.externalId = :extId', {
            extId: dbUser.tenantExternalId ? dbUser.tenantExternalId : api_interfaces_1.TENANT_ZERO_EXT_ID
        })
            .getOne();
        //check access
        const res = await entityManager
            .createQueryBuilder(user_access_entity_1.UserAccessView, 'accessview')
            .where('accessview.userId =  :userId', {
            userId: userId
        })
            .getMany();
        let accessProfile = [];
        res.forEach(accView => {
            const findModel = accessProfile.find(x => x.model === accView.modelName.toLocaleLowerCase());
            if (findModel) {
                findModel.access = findModel.access | accView.accessType;
            }
            else {
                accessProfile.push({
                    model: accView.modelName.toLocaleLowerCase(),
                    modelId: accView.modelId,
                    access: accView.accessType,
                    endpoint: accView.endpoint
                });
            }
        });
        //const roles = [...new Set(res.map(accView => accView.roleName))];
        const userrolesq = entityManager
            .createQueryBuilder(app_user_role_entity_1.DbAppUserRole, 'appuserrole')
            .leftJoinAndSelect(role_entity_1.DbRole, 'role', 'appuserrole.roleId = role.id')
            .where('appuserrole.userId =  :userId', {
            userId: userId
        });
        const userroles = await userrolesq.getRawMany();
        const appUser = {
            userId: userId,
            id: dbUser.id,
            display: dbUser.display,
            tenantId: tenant.id,
            tenantExternalId: tenant.externalId,
            tenantName: tenant.name,
            email: dbUser.email,
            picture: dbUser.picture,
            isAnonymous: false,
            roles: userroles.map(x => x.role_name),
            accessProfile: accessProfile,
            applicationId: dbUser.applicationId
        };
        return appUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.DbUser)),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjsx/crud-typeorm");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbUser = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
const tenant_entity_1 = __webpack_require__(13);
let DbUser = class DbUser {
};
exports.DbUser = DbUser;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbUser.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "display", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", Number)
], DbUser.prototype, "tenantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", Number)
], DbUser.prototype, "applicationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "tenantExternalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "lastname", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], DbUser.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        default: () => 'LOCALTIMESTAMP'
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DbUser.prototype, "created", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => tenant_entity_1.DbTenant, c => c.users),
    tslib_1.__metadata("design:type", typeof (_b = typeof tenant_entity_1.DbTenant !== "undefined" && tenant_entity_1.DbTenant) === "function" ? _b : Object)
], DbUser.prototype, "tenant", void 0);
exports.DbUser = DbUser = tslib_1.__decorate([
    (0, typeorm_1.Entity)('appuser'),
    (0, typeorm_1.Index)(['userId', 'display', 'tenantId'])
], DbUser);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbTenant = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(14);
let DbTenant = class DbTenant extends base_entity_1.DbBaseEntity {
};
exports.DbTenant = DbTenant;
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbTenant.prototype, "externalId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbTenant.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbTenant.prototype, "description", void 0);
exports.DbTenant = DbTenant = tslib_1.__decorate([
    (0, typeorm_1.Entity)('tenant')
], DbTenant);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbBaseEntity = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
class DbBaseEntity {
}
exports.DbBaseEntity = DbBaseEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbBaseEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', nullable: true, default: () => 'LOCALTIMESTAMP' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DbBaseEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', nullable: true, default: () => 'LOCALTIMESTAMP' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DbBaseEntity.prototype, "updatedAt", void 0);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAccessView = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
let UserAccessView = class UserAccessView {
};
exports.UserAccessView = UserAccessView;
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], UserAccessView.prototype, "modelName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserAccessView.prototype, "modelId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], UserAccessView.prototype, "endpoint", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], UserAccessView.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserAccessView.prototype, "appId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserAccessView.prototype, "tid", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserAccessView.prototype, "accessType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], UserAccessView.prototype, "roleName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserAccessView.prototype, "roleId", void 0);
exports.UserAccessView = UserAccessView = tslib_1.__decorate([
    (0, typeorm_1.ViewEntity)({
        expression: `
  SELECT "modelName", "modelId", "endpoint", "userId", "appId", aur."tenantId" AS "tid", "accessType", "roleName", aur."roleId" FROM (
  SELECT *,r.name as "roleName" FROM  (
   SELECT *, name as "modelName" FROM model m INNER JOIN accessright ar ON m."id" = ar."modelId"  ) 
   AS "modelrights" INNER JOIN role r ON modelrights."roleId" = r."id" ) 
   AS modelrole	INNER JOIN appuserrole aur ON  modelrole."roleId" = aur."roleId"
    `
    })
], UserAccessView);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbAppUserRole = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
//defines what roles user are in
let DbAppUserRole = class DbAppUserRole {
};
exports.DbAppUserRole = DbAppUserRole;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbAppUserRole.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], DbAppUserRole.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DbAppUserRole.prototype, "appId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbAppUserRole.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DbAppUserRole.prototype, "tenantId", void 0);
exports.DbAppUserRole = DbAppUserRole = tslib_1.__decorate([
    (0, typeorm_1.Entity)('appuserrole')
], DbAppUserRole);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbRole = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
let DbRole = class DbRole {
};
exports.DbRole = DbRole;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbRole.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbRole.prototype, "applicationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DbRole.prototype, "tenantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbRole.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbRole.prototype, "description", void 0);
exports.DbRole = DbRole = tslib_1.__decorate([
    (0, typeorm_1.Entity)('role')
], DbRole);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STATUS_OK = exports.COMMENT_MODEL_ENDPOINT = exports.COMMENT_MODEL_DESC = exports.COMMENT_MODEL_NAME = exports.PRODUCT_MODEL_ENDPOINT = exports.PRODUCT_MODEL_DESC = exports.PRODUCT_MODEL_NAME = exports.ROLE_MODEL_ENDPOINT = exports.ROLE_MODEL_DESC = exports.ROLE_MODEL_NAME = exports.TENANT_MODEL_ENDPOINT = exports.TENANT_MODEL_DESC = exports.TENANT_MODEL_NAME = exports.USER_MODEL_ENDPOINT = exports.USER_MODEL_DESC = exports.USER_MODEL_NAME = exports.TENANT_ZERO_DESCRIPTION = exports.TENANT_ZERO_NAME = exports.TENANT_ZERO_EXT_ID = exports.TENANT_ADMIN_ROLE_DESC = exports.USER_ADMIN_ROLE_DESC = exports.GUEST_ROLE_DESC = exports.HOST_APPLICATION_DESC = exports.TENANT_ADMIN_ROLE = exports.USER_ADMIN_ROLE = exports.GUEST_ROLE = exports.HOST_APPLICATION = exports.API_BASE = exports.SUPER_USER_PWD = exports.SUPER_USER_NAME = exports.JWT_USER = void 0;
exports.JWT_USER = 'jwttoken';
exports.SUPER_USER_NAME = 'superuser';
exports.SUPER_USER_PWD = 'superuser';
exports.API_BASE = 'api';
exports.HOST_APPLICATION = 'Application0';
exports.GUEST_ROLE = 'GUEST_ROLE';
exports.USER_ADMIN_ROLE = 'USER_ADMIN_ROLE';
exports.TENANT_ADMIN_ROLE = 'TENANT_ADMIN_ROLE';
exports.HOST_APPLICATION_DESC = 'The first hosting application';
exports.GUEST_ROLE_DESC = 'Anonymous user role.';
exports.USER_ADMIN_ROLE_DESC = 'Users in this role manages other user.';
exports.TENANT_ADMIN_ROLE_DESC = 'Users in this role manages tenants';
exports.TENANT_ZERO_EXT_ID = 'Tenant0';
exports.TENANT_ZERO_NAME = 'Tenant0';
exports.TENANT_ZERO_DESCRIPTION = 'Base system tenant';
exports.USER_MODEL_NAME = 'User';
exports.USER_MODEL_DESC = 'Users that use the application';
exports.USER_MODEL_ENDPOINT = 'users';
exports.TENANT_MODEL_NAME = 'Tenant';
exports.TENANT_MODEL_DESC = 'Tenants are organizations that use the application';
exports.TENANT_MODEL_ENDPOINT = 'tenants';
exports.ROLE_MODEL_NAME = 'Role';
exports.ROLE_MODEL_DESC = 'Roles are the function a user has in the application';
exports.ROLE_MODEL_ENDPOINT = 'roles';
exports.PRODUCT_MODEL_NAME = 'Product';
exports.PRODUCT_MODEL_DESC = 'Products and services sold by the organization';
exports.PRODUCT_MODEL_ENDPOINT = 'products';
exports.COMMENT_MODEL_NAME = 'Comment';
exports.COMMENT_MODEL_DESC = 'User reaction and views on products';
exports.COMMENT_MODEL_ENDPOINT = 'products/:parentId/comments';
exports.STATUS_OK = 'OK';


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessItem = void 0;
class AccessItem {
}
exports.AccessItem = AccessItem;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


//ACCESS NUM  |DELETE|CREATE|UPDATE  |READ|
//ACCESS QUAD |ALL   |None |EXCL.OWN|OWN |
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFriendlyAccessName = exports.getScopeFromText = exports.getScopeText = exports.getDeleteAccess = exports.getUpdateAccess = exports.getCreateAccess = exports.getReadAccess = exports.getAccessType = exports.ActionScope = exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType[ActionType["read"] = 0] = "read";
    ActionType[ActionType["update"] = 4] = "update";
    ActionType[ActionType["create"] = 8] = "create";
    ActionType[ActionType["delete"] = 12] = "delete";
})(ActionType || (exports.ActionType = ActionType = {}));
var ActionScope;
(function (ActionScope) {
    ActionScope[ActionScope["own"] = 1] = "own";
    ActionScope[ActionScope["ownExcluded"] = 2] = "ownExcluded";
    ActionScope[ActionScope["none"] = 4] = "none";
    ActionScope[ActionScope["all"] = 8] = "all";
})(ActionScope || (exports.ActionScope = ActionScope = {}));
function getAccessType(actionType, actionScope) {
    return actionScope << actionType;
}
exports.getAccessType = getAccessType;
function getReadAccess(access) {
    const readRights = access & 0x000f;
    if (readRights & ActionScope.all)
        return ActionScope.all;
    if (readRights & ActionScope.none)
        return ActionScope.none;
    if (readRights & ActionScope.ownExcluded)
        return ActionScope.ownExcluded;
    if (readRights & ActionScope.own)
        return ActionScope.own;
    return ActionScope.none;
}
exports.getReadAccess = getReadAccess;
function getCreateAccess(access) {
    const createRights = (access & 0x0f00) >> ActionType.create;
    if (createRights & ActionScope.all)
        return ActionScope.all;
    if (createRights & ActionScope.none)
        return ActionScope.none;
    if (createRights & ActionScope.ownExcluded)
        return ActionScope.ownExcluded;
    if (createRights & ActionScope.own)
        return ActionScope.own;
    return ActionScope.none;
}
exports.getCreateAccess = getCreateAccess;
function getUpdateAccess(access) {
    const updateRights = (access & 0x00f0) >> ActionType.update;
    if (updateRights & ActionScope.all)
        return ActionScope.all;
    if (updateRights & ActionScope.none)
        return ActionScope.none;
    if (updateRights & ActionScope.ownExcluded)
        return ActionScope.ownExcluded;
    if (updateRights & ActionScope.own)
        return ActionScope.own;
    return ActionScope.none;
}
exports.getUpdateAccess = getUpdateAccess;
function getDeleteAccess(access) {
    const deleteRights = (access & 0xf000) >> ActionType.delete;
    if (deleteRights & ActionScope.all)
        return ActionScope.all;
    if (deleteRights & ActionScope.none)
        return ActionScope.none;
    if (deleteRights & ActionScope.ownExcluded)
        return ActionScope.ownExcluded;
    if (deleteRights & ActionScope.own)
        return ActionScope.own;
    return ActionScope.none;
}
exports.getDeleteAccess = getDeleteAccess;
function getScopeText(scope) {
    if (scope & ActionScope.all)
        return 'All';
    if (scope & ActionScope.none)
        return 'Not Allowed';
    if (scope & ActionScope.ownExcluded)
        return 'Except Own';
    if (scope & ActionScope.own)
        return 'Own';
    return 'Not allowed';
}
exports.getScopeText = getScopeText;
function getScopeFromText(scopeText) {
    switch (scopeText) {
        case 'All': {
            return ActionScope.all;
        }
        case 'Not Allowed': {
            return ActionScope.none;
        }
        case 'Except Own': {
            return ActionScope.ownExcluded;
        }
        case 'Own': {
            return ActionScope.own;
        }
        default: {
            return ActionScope.none;
        }
    }
}
exports.getScopeFromText = getScopeFromText;
function getFriendlyAccessName(accessType, model) {
    const readRights = accessType & 0x000f;
    const updateRights = (accessType & 0x00f0) >> ActionType.update;
    const createRights = (accessType & 0x0f00) >> ActionType.create;
    const deleteRights = (accessType & 0xf000) >> ActionType.delete;
    const readTxt = `Read:${getScopeText(readRights)}`;
    const updateTxt = `Update:${getScopeText(updateRights)}`;
    const createTxt = `Create:${getScopeText(createRights)}`;
    const DeleteTxt = `Delete:${getScopeText(deleteRights)}`;
    return `User is allowed: ${readTxt},${updateTxt},${createTxt},${DeleteTxt} on ${model}`;
}
exports.getFriendlyAccessName = getFriendlyAccessName;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.firebaseUiTestonfig = void 0;
exports.firebaseUiTestonfig = {
    signInFlow: 'popup',
    signInOptions: [],
    tosUrl: '/',
    privacyPolicyUrl: '/privacy',
    credentialHelper: ''
};


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbApplication = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
var RoleType;
(function (RoleType) {
    RoleType[RoleType["create"] = 0] = "create";
    RoleType[RoleType["read"] = 1] = "read";
    RoleType[RoleType["update"] = 2] = "update";
    RoleType[RoleType["delete"] = 3] = "delete";
})(RoleType || (RoleType = {}));
let DbApplication = class DbApplication {
};
exports.DbApplication = DbApplication;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbApplication.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbApplication.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbApplication.prototype, "description", void 0);
exports.DbApplication = DbApplication = tslib_1.__decorate([
    (0, typeorm_1.Entity)('application')
], DbApplication);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("rand-token");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbUserSession = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(14);
let DbUserSession = class DbUserSession extends base_entity_1.DbBaseEntity {
};
exports.DbUserSession = DbUserSession;
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbUserSession.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbUserSession.prototype, "refreshToken", void 0);
exports.DbUserSession = DbUserSession = tslib_1.__decorate([
    (0, typeorm_1.Entity)('usersession')
], DbUserSession);


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("moment");

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(12);
const model_meta_data_entity_1 = __webpack_require__(28);
const user_owner_entity_1 = __webpack_require__(29);
let OwnerService = class OwnerService {
    constructor() { }
    async setOwner(user, modelId, instanceId) {
        const entityManager = (0, typeorm_1.getManager)();
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
    async setOwnerByModeName(user, modelName, instanceId) {
        const entityManager = (0, typeorm_1.getManager)();
        const existingModel = await entityManager
            .createQueryBuilder(model_meta_data_entity_1.DbModelMeta, 'model')
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
    async getOwned(user, modelId) {
        const entityManager = (0, typeorm_1.getManager)();
        const userOwnedSql = await entityManager
            .createQueryBuilder(user_owner_entity_1.DbUserOwner, 'userowner')
            .select('userowner.ownedId')
            .where('userowner.ownerId=:userId', { userId: user.userId })
            .andWhere('userowner.modelId=:modelId', { modelId: modelId });
        return userOwnedSql.getMany();
    }
    getOwner(user, modelId, id) {
        throw new Error('Method not implemented.');
    }
};
exports.OwnerService = OwnerService;
exports.OwnerService = OwnerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], OwnerService);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbModelMeta = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
let DbModelMeta = class DbModelMeta {
};
exports.DbModelMeta = DbModelMeta;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbModelMeta.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbModelMeta.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbModelMeta.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbModelMeta.prototype, "applicationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbModelMeta.prototype, "endpoint", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbModelMeta.prototype, "identityProperty", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], DbModelMeta.prototype, "parentName", void 0);
exports.DbModelMeta = DbModelMeta = tslib_1.__decorate([
    (0, typeorm_1.Entity)('model')
], DbModelMeta);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbUserOwner = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
let DbUserOwner = class DbUserOwner {
};
exports.DbUserOwner = DbUserOwner;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbUserOwner.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbUserOwner.prototype, "applicationId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbUserOwner.prototype, "tenantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbUserOwner.prototype, "modelId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbUserOwner.prototype, "ownerId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbUserOwner.prototype, "ownedId", void 0);
exports.DbUserOwner = DbUserOwner = tslib_1.__decorate([
    (0, typeorm_1.Entity)('userowned')
], DbUserOwner);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
let AppService = class AppService {
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbBilling = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
let DbBilling = class DbBilling {
};
exports.DbBilling = DbBilling;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbBilling.prototype, "id", void 0);
exports.DbBilling = DbBilling = tslib_1.__decorate([
    (0, typeorm_1.Entity)('billing')
], DbBilling);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbAccessRight = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
const role_entity_1 = __webpack_require__(17);
// export class LikeDBRole implements DbRole {
//   id: number;
//   applicationId: number;
//   tenantId: number;
//   name: string;
//   description: string;
//   accessRights: DbAccessRight[];
// }
let DbAccessRight = class DbAccessRight {
};
exports.DbAccessRight = DbAccessRight;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], DbAccessRight.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbAccessRight.prototype, "modelId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DbAccessRight.prototype, "propertyId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbAccessRight.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    tslib_1.__metadata("design:type", Number)
], DbAccessRight.prototype, "accessType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => role_entity_1.DbRole, r => r.accessRights, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof role_entity_1.DbRole !== "undefined" && role_entity_1.DbRole) === "function" ? _a : Object)
], DbAccessRight.prototype, "role", void 0);
exports.DbAccessRight = DbAccessRight = tslib_1.__decorate([
    (0, typeorm_1.Entity)('accessright')
], DbAccessRight);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HostedApplicationModule = exports.HostedApplicationController = exports.HostedApplicationService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const crud_1 = __webpack_require__(34);
const application_entity_1 = __webpack_require__(23);
const passport_1 = __webpack_require__(7);
const role_entity_1 = __webpack_require__(17);
const api_interfaces_1 = __webpack_require__(18);
const tenant_entity_1 = __webpack_require__(13);
const typeorm_2 = __webpack_require__(12);
const model_meta_data_entity_1 = __webpack_require__(28);
const access_right_entity_1 = __webpack_require__(32);
let HostedApplicationService = class HostedApplicationService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, rolesRepo, tenantRepo) {
        super(repo);
        this.rolesRepo = null;
        this.tenantRepo = null;
        this.rolesRepo = rolesRepo;
        this.tenantRepo = tenantRepo;
        this.seed().then(() => {
            common_1.Logger.log('Hosted application seeding completed.');
        });
    }
    async seed() {
        const applicationId = await this.upsertApplication();
        const tenantId = await this.upsertTenant();
        const userModelId = await this.upsertModel(applicationId, api_interfaces_1.USER_MODEL_NAME, api_interfaces_1.USER_MODEL_DESC, api_interfaces_1.USER_MODEL_ENDPOINT, 'userId');
        const tenantModelId = await this.upsertModel(applicationId, api_interfaces_1.TENANT_MODEL_NAME, api_interfaces_1.TENANT_MODEL_DESC, api_interfaces_1.TENANT_MODEL_ENDPOINT);
        const roleModelId = await this.upsertModel(applicationId, api_interfaces_1.ROLE_MODEL_NAME, api_interfaces_1.ROLE_MODEL_DESC, api_interfaces_1.ROLE_MODEL_ENDPOINT);
        const productModelId = await this.upsertModel(applicationId, api_interfaces_1.PRODUCT_MODEL_NAME, api_interfaces_1.PRODUCT_MODEL_DESC, api_interfaces_1.PRODUCT_MODEL_ENDPOINT);
        const commentModelId = await this.upsertModel(applicationId, api_interfaces_1.COMMENT_MODEL_NAME, api_interfaces_1.COMMENT_MODEL_DESC, api_interfaces_1.COMMENT_MODEL_ENDPOINT, 'id', api_interfaces_1.PRODUCT_MODEL_NAME);
        const guestRoleId = await this.upsertRole(api_interfaces_1.GUEST_ROLE, api_interfaces_1.GUEST_ROLE_DESC, applicationId, tenantId);
        const userAdminRoleId = await this.upsertRole(api_interfaces_1.USER_ADMIN_ROLE, api_interfaces_1.USER_ADMIN_ROLE_DESC, applicationId, tenantId);
        const tenantAdminRoleId = await this.upsertRole(api_interfaces_1.TENANT_ADMIN_ROLE, api_interfaces_1.TENANT_ADMIN_ROLE_DESC, applicationId, tenantId);
        //guest user
        await this.upsertAccessRight(guestRoleId, userModelId, (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.own));
        await this.upsertAccessRight(guestRoleId, tenantModelId, (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.own));
        await this.upsertAccessRight(guestRoleId, productModelId, (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all));
        const userCommentAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.own) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.own) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.own);
        await this.upsertAccessRight(guestRoleId, commentModelId, userCommentAccess);
        //user admin
        const userAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.ownExcluded) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.ownExcluded);
        await this.upsertAccessRight(userAdminRoleId, userModelId, userAccess);
        const tenantAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.own) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.none) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.none) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.none);
        await this.upsertAccessRight(userAdminRoleId, tenantModelId, tenantAccess);
        const roleAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.none) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.none) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.none);
        await this.upsertAccessRight(userAdminRoleId, roleModelId, roleAccess);
        //tenant admin
        const userAccessTenantAdmin = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.ownExcluded) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.ownExcluded);
        await this.upsertAccessRight(tenantAdminRoleId, userModelId, userAccessTenantAdmin);
        const tenantAccessTenantAdmin = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.own) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.own) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.none) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.none);
        await this.upsertAccessRight(tenantAdminRoleId, tenantModelId, tenantAccessTenantAdmin);
        //tenant admins can create new roles
        const tenantAdmiRoleAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.ownExcluded) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.ownExcluded);
        await this.upsertAccessRight(tenantAdminRoleId, roleModelId, tenantAdmiRoleAccess);
        const tenantAdmiProductAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.all);
        await this.upsertAccessRight(tenantAdminRoleId, productModelId, tenantAdmiProductAccess);
        const tenantAdmiCommentAccess = (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.read, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.update, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.create, api_interfaces_1.ActionScope.all) |
            (0, api_interfaces_1.getAccessType)(api_interfaces_1.ActionType.delete, api_interfaces_1.ActionScope.all);
        await this.upsertAccessRight(tenantAdminRoleId, commentModelId, tenantAdmiCommentAccess);
    }
    async upsertRole(roleName, roleDescription, applicationId, tenantId) {
        let id = null;
        const existing = await this.rolesRepo.findOne({
            applicationId: applicationId,
            name: roleName,
            tenantId: tenantId,
        });
        if (!existing) {
            const newResult = await this.rolesRepo
                .createQueryBuilder()
                .insert()
                .into('role')
                .values({
                name: roleName,
                applicationId: applicationId,
                tenantId: tenantId,
                description: roleDescription,
            })
                .execute();
            id = newResult.identifiers[0]['id'];
        }
        else {
            id = existing.id;
        }
        return id;
    }
    async upsertApplication() {
        const existingApplication = await this.repo.findOne({});
        let applicationId = null;
        if (!existingApplication) {
            const newAppResult = await this.repo
                .createQueryBuilder()
                .insert()
                .into('application')
                .values({ name: api_interfaces_1.HOST_APPLICATION, description: api_interfaces_1.HOST_APPLICATION_DESC })
                .execute();
            applicationId = newAppResult.identifiers[0]['id'];
        }
        else {
            applicationId = existingApplication.id;
        }
        return applicationId;
    }
    async upsertTenant() {
        const existing = await this.tenantRepo.findOne({
            externalId: api_interfaces_1.TENANT_ZERO_EXT_ID,
        });
        let id = null;
        if (!existing) {
            const newResult = await this.tenantRepo
                .createQueryBuilder()
                .insert()
                .into('tenant')
                .values({
                externalId: api_interfaces_1.TENANT_ZERO_EXT_ID,
                name: api_interfaces_1.TENANT_ZERO_NAME,
                description: api_interfaces_1.TENANT_ZERO_DESCRIPTION,
            })
                .execute();
            id = newResult.identifiers[0]['id'];
        }
        else {
            id = existing.id;
        }
        return id;
    }
    async upsertModel(applicationId, modelName, modelDescription, endpoint, identityKey = 'id', parent = null) {
        let id = null;
        const entityManager = (0, typeorm_2.getManager)();
        const existing = await entityManager
            .createQueryBuilder(model_meta_data_entity_1.DbModelMeta, 'model')
            .where('model.applicationId = :appId', {
            appId: applicationId,
        })
            .andWhere('model.name = :modelName', {
            modelName: modelName,
        })
            .getOne();
        if (!existing) {
            const newResult = await entityManager
                .createQueryBuilder(model_meta_data_entity_1.DbModelMeta, 'model')
                .insert()
                .into('model')
                .values({
                name: modelName,
                description: modelDescription,
                applicationId: applicationId,
                endpoint: endpoint,
                identityProperty: identityKey,
                parentName: parent,
            })
                .execute();
            id = newResult.identifiers[0]['id'];
        }
        else {
            id = existing.id;
        }
        return id;
    }
    async upsertAccessRight(roleId, modelId, accessType) {
        let id = null;
        const entityManager = (0, typeorm_2.getManager)();
        const existing = await entityManager
            .createQueryBuilder(access_right_entity_1.DbAccessRight, 'accessright')
            .where('accessright.modelId = :modelId', {
            modelId: modelId,
        })
            .andWhere('accessright.roleId = :roleId', {
            roleId: roleId,
        })
            .getOne();
        if (!existing) {
            const newResult = await entityManager
                .createQueryBuilder(access_right_entity_1.DbAccessRight, 'accessright')
                .insert()
                .into('accessright')
                .values({ modelId: modelId, roleId: roleId, accessType: accessType })
                .execute();
            id = newResult.identifiers[0]['id'];
        }
        else {
            id = existing.id;
        }
        return id;
    }
};
exports.HostedApplicationService = HostedApplicationService;
exports.HostedApplicationService = HostedApplicationService = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(application_entity_1.DbApplication)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(role_entity_1.DbRole)),
    tslib_1.__param(2, (0, typeorm_1.InjectRepository)(tenant_entity_1.DbTenant)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], HostedApplicationService);
let HostedApplicationController = class HostedApplicationController {
    constructor(service) {
        this.service = service;
    }
};
exports.HostedApplicationController = HostedApplicationController;
exports.HostedApplicationController = HostedApplicationController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, crud_1.Crud)({
        model: {
            type: application_entity_1.DbApplication,
        },
    }),
    (0, common_1.Controller)('application'),
    tslib_1.__metadata("design:paramtypes", [HostedApplicationService])
], HostedApplicationController);
let HostedApplicationModule = class HostedApplicationModule {
};
exports.HostedApplicationModule = HostedApplicationModule;
exports.HostedApplicationModule = HostedApplicationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([application_entity_1.DbApplication, role_entity_1.DbRole, tenant_entity_1.DbTenant])],
        providers: [HostedApplicationService],
        controllers: [HostedApplicationController],
    })
], HostedApplicationModule);


/***/ }),
/* 34 */
/***/ ((module) => {

module.exports = require("@nestjsx/crud");

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const tenants_service_1 = __webpack_require__(36);
const tenants_controller_1 = __webpack_require__(37);
const typeorm_1 = __webpack_require__(10);
const tenant_entity_1 = __webpack_require__(13);
let TenantsModule = class TenantsModule {
};
exports.TenantsModule = TenantsModule;
exports.TenantsModule = TenantsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([tenant_entity_1.DbTenant])],
        providers: [tenants_service_1.TenantsService],
        controllers: [tenants_controller_1.TenantsController]
    })
], TenantsModule);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const tenant_entity_1 = __webpack_require__(13);
let TenantsService = class TenantsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
};
exports.TenantsService = TenantsService;
exports.TenantsService = TenantsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(tenant_entity_1.DbTenant)),
    tslib_1.__metadata("design:paramtypes", [Object])
], TenantsService);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TenantsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const tenants_service_1 = __webpack_require__(36);
const crud_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(7);
const tenant_entity_1 = __webpack_require__(13);
const roles_guard_1 = __webpack_require__(38);
let TenantsController = class TenantsController {
    constructor(service) {
        this.service = service;
    }
};
exports.TenantsController = TenantsController;
exports.TenantsController = TenantsController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, crud_1.Crud)({
        model: {
            type: tenant_entity_1.DbTenant
        },
        routes: {
            exclude: ['createOneBase', 'createManyBase', 'replaceOneBase', 'deleteOneBase']
        },
        query: {
            join: {
                users: {}
            }
        }
    }),
    (0, common_1.Controller)('tenants'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof tenants_service_1.TenantsService !== "undefined" && tenants_service_1.TenantsService) === "function" ? _a : Object])
], TenantsController);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const core_1 = __webpack_require__(1);
const api_interfaces_1 = __webpack_require__(18);
const api_interfaces_2 = __webpack_require__(18);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    hasAccess(method, accessItem) {
        switch (method) {
            case 'GET':
                return (0, api_interfaces_2.getReadAccess)(accessItem.access) !== api_interfaces_2.ActionScope.none;
            case 'POST':
                return (0, api_interfaces_1.getCreateAccess)(accessItem.access) !== api_interfaces_2.ActionScope.none;
            case 'PATCH':
                return (0, api_interfaces_1.getUpdateAccess)(accessItem.access) !== api_interfaces_2.ActionScope.none;
            case 'PUT':
                return (0, api_interfaces_1.getCreateAccess)(accessItem.access) !== api_interfaces_2.ActionScope.none;
            case 'DELETE':
                return (0, api_interfaces_1.getDeleteAccess)(accessItem.access) !== api_interfaces_2.ActionScope.none;
            default:
                break;
        }
        return false;
    }
    //this action will only check if the route can be activated.
    // the case for own / exclude own will be handled in the interceptor
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const url = request.url;
        if (user.userId === api_interfaces_1.SUPER_USER_NAME)
            return true;
        const accessProfile = user.accessProfile;
        return (accessProfile.findIndex(ac => {
            if (url.indexOf(ac.endpoint) > -1)
                return this.hasAccess(request.method, ac);
            else
                return false;
        }) !== -1);
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const roles_service_1 = __webpack_require__(40);
const roles_controller_1 = __webpack_require__(41);
const role_entity_1 = __webpack_require__(17);
const typeorm_1 = __webpack_require__(10);
let RolesModule = class RolesModule {
};
exports.RolesModule = RolesModule;
exports.RolesModule = RolesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.DbRole])],
        providers: [roles_service_1.RolesService],
        controllers: [roles_controller_1.RolesController]
    })
], RolesModule);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const role_entity_1 = __webpack_require__(17);
let RolesService = class RolesService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(role_entity_1.DbRole)),
    tslib_1.__metadata("design:paramtypes", [Object])
], RolesService);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const crud_1 = __webpack_require__(34);
const roles_service_1 = __webpack_require__(40);
const role_entity_1 = __webpack_require__(17);
const passport_1 = __webpack_require__(7);
const roles_guard_1 = __webpack_require__(38);
let RolesController = class RolesController {
    constructor(service) {
        this.service = service;
    }
    get base() {
        return this;
    }
    getMany(req) {
        return this.base.getManyBase(req);
    }
};
exports.RolesController = RolesController;
tslib_1.__decorate([
    (0, crud_1.Override)(),
    tslib_1.__param(0, (0, crud_1.ParsedRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof crud_1.CrudRequest !== "undefined" && crud_1.CrudRequest) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RolesController.prototype, "getMany", null);
exports.RolesController = RolesController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, crud_1.Crud)({
        model: {
            type: role_entity_1.DbRole
        }
    }),
    (0, common_1.Controller)('roles'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _a : Object])
], RolesController);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const auth_controller_1 = __webpack_require__(43);
const auth_service_1 = __webpack_require__(44);
const users_module_1 = __webpack_require__(47);
const passport_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(45);
const local_strategy_1 = __webpack_require__(49);
const jwt_strategy_1 = __webpack_require__(51);
const core_1 = __webpack_require__(1);
const required_header_interceptor_1 = __webpack_require__(53);
const roles_guard_1 = __webpack_require__(38);
const owner_interceptor_1 = __webpack_require__(54);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.API_JWT_TOKEN ? process.env.API_JWT_TOKEN : 'TEST_TOKEN',
                signOptions: { expiresIn: '900s' }
            })
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            roles_guard_1.RolesGuard,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: required_header_interceptor_1.HeaderInterceptor
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: owner_interceptor_1.OwnerInterceptor
            }
        ]
    })
], AuthModule);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(7);
const auth_service_1 = __webpack_require__(44);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async loginUser(req) {
        common_1.Logger.log('Received request on api/login');
        common_1.Logger.log('got this user from local strategy');
        //should be: {
        //   token: decodedToken,
        //   user: upsertedUser
        // };
        //req.body contains the original user:pwd passed in from client
        const newToken = await this.authService.generateToken(req.user);
        common_1.Logger.log(`generated ${newToken} for user:${req.user.userId}`);
        return {
            api_token: newToken,
            user: req.user
        };
    }
    async login(req) {
        common_1.Logger.log('Received request on api/tokenlogin');
        //should be: {
        //   token: decodedToken,
        //   user: upsertedUser
        // };
        //req.body contains the original user:pwd passed in from client
        const newToken = await this.authService.loginWithToken(req.user.token, req.body);
        const display = req.user.user ? req.user.user.display : 'unknown';
        common_1.Logger.log(`generated ${newToken} for user:${display}`);
        return {
            api_token: newToken,
            user: req.user.user
        };
    }
    async refreshToken(req) {
        common_1.Logger.log('Received request on api/refresh');
        //req.user contains decode JWT from google
        const { token } = req.body;
        common_1.Logger.log(`refreshToken:${req.url}`);
        const newToken = await this.authService.refreshUserToken(token);
        common_1.Logger.log(`generated ${newToken} for user refresh`);
        return {
            api_token: newToken
        };
    }
    async checkAccess(req) {
        common_1.Logger.log(`Check access for user:${req.user.userId}`);
        const res = {
            hasAccess: true
        };
        return res;
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('local')),
    (0, common_1.Post)('tokenlogin'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('refresh'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('checkaccess'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "checkAccess", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const users_service_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(45);
const admin = tslib_1.__importStar(__webpack_require__(46));
admin.initializeApp({
    credential: admin.credential.applicationDefault()
});
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async loginWithToken(user, body) {
        const payload = { username: user.provider_id, sub: user.user_id, aud: user.aud };
        return this.jwtService.sign(payload);
    }
    async generateToken(user) {
        const payload = { username: user.userId, sub: user.userId };
        return this.jwtService.sign(payload);
    }
    async validateFirebaseToken(token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            let uid = decodedToken.uid;
            return decodedToken;
        }
        catch (error) {
            console.error(error);
        }
        return null;
    }
    async refreshUserToken(token) {
        const session = await this.usersService.checkRefreshToken(token);
        if (session) {
            return this.generateToken({ userId: session.userId });
        }
        return Promise.resolve(null);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = require("firebase-admin");

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const users_service_1 = __webpack_require__(8);
const typeorm_1 = __webpack_require__(10);
const user_entity_1 = __webpack_require__(11);
const users_controller_1 = __webpack_require__(48);
const owner_service_1 = __webpack_require__(27);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.DbUser])],
        providers: [users_service_1.UsersService, owner_service_1.OwnerService],
        exports: [users_service_1.UsersService, owner_service_1.OwnerService],
        controllers: [users_controller_1.UsersController]
    })
], UsersModule);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const crud_1 = __webpack_require__(34);
const users_service_1 = __webpack_require__(8);
const user_entity_1 = __webpack_require__(11);
const passport_1 = __webpack_require__(7);
const roles_guard_1 = __webpack_require__(38);
let UsersController = class UsersController {
    constructor(service) {
        this.service = service;
    }
};
exports.UsersController = UsersController;
exports.UsersController = UsersController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, crud_1.Crud)({
        model: {
            type: user_entity_1.DbUser
        }
    }),
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const passport_local_1 = __webpack_require__(50);
const passport_1 = __webpack_require__(7);
const common_1 = __webpack_require__(5);
const auth_service_1 = __webpack_require__(44);
const users_service_1 = __webpack_require__(8);
const api_interfaces_1 = __webpack_require__(18);
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService, userService) {
        super();
        this.authService = authService;
        this.userService = userService;
    }
    async validate(username, password) {
        let user = null;
        if (username === api_interfaces_1.JWT_USER) {
            //use firebase sdk to validate token
            const decodedToken = await this.authService.validateFirebaseToken(password);
            if (decodedToken) {
                let anonymous = false;
                if (decodedToken.provider_id === 'anonymous') {
                    anonymous = true;
                }
                const savedUser = {
                    userId: decodedToken.user_id,
                    display: anonymous ? decodedToken.provider_id : decodedToken.name,
                    picture: anonymous ? null : decodedToken.picture,
                    email: anonymous ? null : decodedToken.email,
                    isAnonymous: anonymous,
                    id: 0
                };
                const upsertedUser = await this.userService.upsertUser(savedUser);
                return {
                    token: decodedToken,
                    user: upsertedUser
                };
            }
            else {
                //not authenticated - throw
            }
        }
        else if (username === api_interfaces_1.SUPER_USER_NAME && password === api_interfaces_1.SUPER_USER_PWD) {
            user = this.userService.getSuperUser({
                userId: username,
                display: username,
                picture: null,
                email: null,
                isAnonymous: false,
                id: 0
            });
        }
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object])
], LocalStrategy);
/*
In vanilla Passport, you configure a strategy by providing two things:
1) A set of options that are specific to that strategy. For example, in a JWT strategy, you might provide a secret to sign tokens.
2) A "verify callback", which is where you tell Passport how to interact with your user store (where you manage user accounts). Here, you verify whether a user exists (and/or create a new user), and whether their credentials are valid. The Passport library expects this callback to return a full user if the validation succeeds, or a null if it fails (failure is defined as either the user is not found, or, in the case of passport-local, the password does not match).

With @nestjs/passport, you configure a Passport strategy by extending the PassportStrategy class.
You pass the strategy options (item 1 above) by calling the super() method in your subclass, optionally passing in an options object.
You provide the verify callback (item 2 above) by implementing a validate() method in your subclass.
*/


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const passport_jwt_1 = __webpack_require__(52);
const passport_1 = __webpack_require__(7);
const common_1 = __webpack_require__(5);
const users_service_1 = __webpack_require__(8);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(users) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.API_JWT_TOKEN ? process.env.API_JWT_TOKEN : 'TEST_TOKEN'
        });
        this.users = users;
    }
    async validate(payload) {
        return this.users.getFullUser(payload.sub);
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], JwtStrategy);
/*
In vanilla Passport, you configure a strategy by providing two things:
1) A set of options that are specific to that strategy. For example, in a JWT strategy, you might provide a secret to sign tokens.
2) A "verify callback", which is where you tell Passport how to interact with your user store (where you manage user accounts). Here, you verify whether a user exists (and/or create a new user), and whether their credentials are valid. The Passport library expects this callback to return a full user if the validation succeeds, or a null if it fails (failure is defined as either the user is not found, or, in the case of passport-local, the password does not match).

With @nestjs/passport, you configure a Passport strategy by extending the PassportStrategy class.
You pass the strategy options (item 1 above) by calling the super() method in your subclass, optionally passing in an options object.
You provide the verify callback (item 2 above) by implementing a validate() method in your subclass.
*/


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HeaderInterceptor = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
let HeaderInterceptor = class HeaderInterceptor {
    async intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const keys = Object.keys(request.headers);
        const url = request.url;
        const isLogin = url.indexOf('login') > -1;
        if (!isLogin) {
            const findTenant = keys.find(x => x === 'tenant-id');
            const findApplication = keys.find(x => x === 'application-id');
            if (!findTenant || !findApplication) {
                throw new common_1.BadRequestException('Header must contain tenant and application data');
            }
        }
        return next.handle();
    }
};
exports.HeaderInterceptor = HeaderInterceptor;
exports.HeaderInterceptor = HeaderInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], HeaderInterceptor);


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerInterceptor = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const operators_1 = __webpack_require__(55);
const api_interfaces_1 = __webpack_require__(18);
const owner_service_1 = __webpack_require__(27);
const user_context_wrapper_1 = __webpack_require__(56);
let OwnerInterceptor = class OwnerInterceptor {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    async intercept(context, next) {
        const wrapper = new user_context_wrapper_1.UserContextWrapper(context);
        //return Promise.resolve(next.handle());
        return this.handleCall(wrapper, next);
    }
    async handleCall(wrapper, next) {
        common_1.Logger.log(`handleCall:${wrapper.model}:${wrapper.accessRight}:${wrapper.instanceId}`);
        if (wrapper.accessRight === api_interfaces_1.ActionScope.ownExcluded && wrapper.instanceId) {
            const owned = await this.ownerService.getOwned(wrapper.user, wrapper.modelId);
            const targetedAtOwn = owned.find(x => x.ownedId === wrapper.instanceId);
            common_1.Logger.log(`excluding own ${wrapper.model}`);
            if (targetedAtOwn) {
                //this action is on the user's own instance
                throw new common_1.BadRequestException(`Not allowed to ${wrapper.method} on own ${wrapper.model}`);
            }
            else
                return next.handle();
        }
        else if (wrapper.method === 'POST' && wrapper.accessRight === api_interfaces_1.ActionScope.own) {
            return next.handle().pipe((0, operators_1.map)(data => {
                return this.ownerService
                    .setOwner(wrapper.user, wrapper.modelId, data.id)
                    .then(x => {
                    common_1.Logger.log(`Updated owner on created ${wrapper.model}`);
                    return data;
                })
                    .catch(err => {
                    common_1.Logger.error(err);
                    return data;
                });
            }));
        }
        else if (wrapper.method === 'GET' && wrapper.accessRight === api_interfaces_1.ActionScope.own) {
            return next.handle().pipe((0, operators_1.map)(data => {
                return this.ownerService
                    .getOwned(wrapper.user, wrapper.modelId)
                    .then(owned => {
                    //should just be list of ids
                    const idsOfObjectsOwnedByUser = owned.map(x => x.ownedId);
                    common_1.Logger.log(`filtering own ${wrapper.model}`);
                    if (data instanceof Array) {
                        return data.filter(x => idsOfObjectsOwnedByUser.indexOf(x.id) > -1);
                    }
                    else {
                        if (idsOfObjectsOwnedByUser.indexOf(data.id) === -1) {
                            throw new common_1.NotFoundException(`User does not own ${wrapper.model}`);
                        }
                        else
                            return data;
                    }
                })
                    .catch(err => {
                    common_1.Logger.error(err);
                    return data;
                });
            }));
        }
        else {
            return next.handle();
        }
    }
};
exports.OwnerInterceptor = OwnerInterceptor;
exports.OwnerInterceptor = OwnerInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _a : Object])
], OwnerInterceptor);


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserContextWrapper = void 0;
const common_1 = __webpack_require__(5);
const api_interfaces_1 = __webpack_require__(18);
class UserContextWrapper {
    constructor(context = null) {
        this.accessRight = api_interfaces_1.ActionScope.own;
        if (context) {
            const ctx = context.switchToHttp();
            const request = ctx.getRequest();
            const url = request.url;
            const args = context.getArgs();
            if (!args.length)
                return;
            const inmsg = args[0];
            this.method = inmsg.method;
            this.setModelAndInstanceId(url);
            common_1.Logger.log(`Model ${this.model}: Method:${inmsg.method}`);
            if (!inmsg.user)
                return;
            this.user = inmsg.user;
            const accessProfile = this.user && this.user.accessProfile ? this.user.accessProfile : [];
            const accessItem = accessProfile.find(x => x.endpoint.indexOf(this.model) > -1);
            this.accessRight = accessItem ? this.getAccess(inmsg.method, accessItem) : api_interfaces_1.ActionScope.none;
            if (!accessItem)
                return;
            this.modelId = accessItem.modelId;
        }
    }
    setModelAndInstanceId(url) {
        url = url.indexOf('?') > -1 ? url.split('?')[0] : url;
        const pieces = url.split('/');
        const last = pieces[pieces.length - 1];
        const secondLast = pieces[pieces.length - 2];
        const num = Number(last);
        this.model = isNaN(num) ? last : secondLast;
        this.instanceId = isNaN(num) ? -1 : num;
    }
    getAccess(method, access) {
        switch (method) {
            case 'GET':
                return (0, api_interfaces_1.getReadAccess)(access.access);
            case 'POST':
                return (0, api_interfaces_1.getCreateAccess)(access.access);
            case 'PUT':
            case 'PATCH':
                return (0, api_interfaces_1.getUpdateAccess)(access.access);
            case 'DELETE':
                return (0, api_interfaces_1.getDeleteAccess)(access.access);
            default:
                return api_interfaces_1.ActionScope.none;
        }
    }
}
exports.UserContextWrapper = UserContextWrapper;


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbComment = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(14);
const user_entity_1 = __webpack_require__(11);
const product_entity_1 = __webpack_require__(58);
let DbComment = class DbComment extends base_entity_1.DbBaseEntity {
};
exports.DbComment = DbComment;
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbComment.prototype, "commentBody", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], DbComment.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], DbComment.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.DbUser, c => c.comments, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.DbUser !== "undefined" && user_entity_1.DbUser) === "function" ? _a : Object)
], DbComment.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => product_entity_1.DbProduct, c => c.comments, { onDelete: 'CASCADE' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof product_entity_1.DbProduct !== "undefined" && product_entity_1.DbProduct) === "function" ? _b : Object)
], DbComment.prototype, "product", void 0);
exports.DbComment = DbComment = tslib_1.__decorate([
    (0, typeorm_1.Entity)('comment')
], DbComment);


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DbProduct = void 0;
const tslib_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(14);
const class_transformer_1 = __webpack_require__(59);
const tenant_entity_1 = __webpack_require__(13);
const comment_entity_1 = __webpack_require__(57);
let DbProduct = class DbProduct extends base_entity_1.DbBaseEntity {
};
exports.DbProduct = DbProduct;
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbProduct.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], DbProduct.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(type => comment_entity_1.DbComment, u => u.product, { onDelete: 'CASCADE' }),
    (0, class_transformer_1.Type)(t => comment_entity_1.DbComment),
    tslib_1.__metadata("design:type", Array)
], DbProduct.prototype, "comments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(type => tenant_entity_1.DbTenant, tenant => tenant.products),
    tslib_1.__metadata("design:type", typeof (_a = typeof tenant_entity_1.DbTenant !== "undefined" && tenant_entity_1.DbTenant) === "function" ? _a : Object)
], DbProduct.prototype, "tenant", void 0);
exports.DbProduct = DbProduct = tslib_1.__decorate([
    (0, typeorm_1.Entity)('product')
], DbProduct);


/***/ }),
/* 59 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsModule = exports.CommentsController = exports.CommentsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const crud_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(7);
const comment_entity_1 = __webpack_require__(57);
let CommentsService = class CommentsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.DbComment)),
    tslib_1.__metadata("design:paramtypes", [Object])
], CommentsService);
let CommentsController = class CommentsController {
    constructor(service) {
        this.service = service;
    }
};
exports.CommentsController = CommentsController;
exports.CommentsController = CommentsController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, crud_1.Crud)({
        model: {
            type: comment_entity_1.DbComment
        },
        params: {
            productId: {
                field: 'productId',
                type: 'number'
            },
            id: {
                field: 'id',
                type: 'number',
                primary: true
            }
        }
    }),
    (0, common_1.Controller)('/products/:productId/comments'),
    tslib_1.__metadata("design:paramtypes", [CommentsService])
], CommentsController);
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.DbComment])],
        providers: [CommentsService],
        controllers: [CommentsController]
    })
], CommentsModule);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


//DbModelMeta
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelMetaModule = exports.ModelMetaController = exports.ModelMetaService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const crud_1 = __webpack_require__(34);
const model_meta_data_entity_1 = __webpack_require__(28);
const passport_1 = __webpack_require__(7);
let ModelMetaService = class ModelMetaService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
};
exports.ModelMetaService = ModelMetaService;
exports.ModelMetaService = ModelMetaService = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(model_meta_data_entity_1.DbModelMeta)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ModelMetaService);
let ModelMetaController = class ModelMetaController {
    constructor(service) {
        this.service = service;
    }
};
exports.ModelMetaController = ModelMetaController;
exports.ModelMetaController = ModelMetaController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, crud_1.Crud)({
        model: {
            type: model_meta_data_entity_1.DbModelMeta
        }
    }),
    (0, common_1.Controller)('modelmeta'),
    tslib_1.__metadata("design:paramtypes", [ModelMetaService])
], ModelMetaController);
let ModelMetaModule = class ModelMetaModule {
};
exports.ModelMetaModule = ModelMetaModule;
exports.ModelMetaModule = ModelMetaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([model_meta_data_entity_1.DbModelMeta])],
        providers: [ModelMetaService],
        controllers: [ModelMetaController]
    })
], ModelMetaModule);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductsModule = exports.ProductsController = exports.ProductsService = exports.Model = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const crud_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(7);
const product_entity_1 = __webpack_require__(58);
const roles_guard_1 = __webpack_require__(38);
const Model = (model) => (0, common_1.SetMetadata)('model', model);
exports.Model = Model;
let ProductsService = class ProductsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(product_entity_1.DbProduct)),
    tslib_1.__metadata("design:paramtypes", [Object])
], ProductsService);
let ProductsController = class ProductsController {
    constructor(service) {
        this.service = service;
    }
};
exports.ProductsController = ProductsController;
exports.ProductsController = ProductsController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, crud_1.Crud)({
        model: {
            type: product_entity_1.DbProduct,
        },
    }),
    (0, exports.Model)('product'),
    (0, common_1.Controller)('products'),
    tslib_1.__metadata("design:paramtypes", [ProductsService])
], ProductsController);
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.DbProduct])],
        providers: [ProductsService],
        controllers: [ProductsController],
    })
], ProductsModule);


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserroleModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const user_role_controller_1 = __webpack_require__(64);
const users_module_1 = __webpack_require__(47);
let UserroleModule = class UserroleModule {
};
exports.UserroleModule = UserroleModule;
exports.UserroleModule = UserroleModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule],
        controllers: [user_role_controller_1.UserRoleController]
    })
], UserroleModule);


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRoleController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const passport_1 = __webpack_require__(7);
const roles_guard_1 = __webpack_require__(38);
const api_interfaces_1 = __webpack_require__(18);
const users_service_1 = __webpack_require__(8);
let UserRoleController = class UserRoleController {
    constructor(userService) {
        this.userService = userService;
    }
    async assignRole(req) {
        common_1.Logger.log('Received request on api/userrole/assign');
        const roleAssignment = req.body;
        await this.userService.assignRoleByUserId(roleAssignment.roleName, roleAssignment.userId);
        roleAssignment.status = api_interfaces_1.STATUS_OK;
        common_1.Logger.log(`assignRole::completed`);
        return roleAssignment;
    }
};
exports.UserRoleController = UserRoleController;
tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Post)('assign'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserRoleController.prototype, "assignRole", null);
exports.UserRoleController = UserRoleController = tslib_1.__decorate([
    (0, common_1.Controller)('userrole'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UserRoleController);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccessRightsModule = exports.AccessRightsController = exports.AccessRightsService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(5);
const typeorm_1 = __webpack_require__(10);
const crud_typeorm_1 = __webpack_require__(9);
const crud_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(7);
const access_right_entity_1 = __webpack_require__(32);
let AccessRightsService = class AccessRightsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo) {
        super(repo);
    }
};
exports.AccessRightsService = AccessRightsService;
exports.AccessRightsService = AccessRightsService = tslib_1.__decorate([
    (0, common_2.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(access_right_entity_1.DbAccessRight)),
    tslib_1.__metadata("design:paramtypes", [Object])
], AccessRightsService);
let AccessRightsController = class AccessRightsController {
    constructor(service) {
        this.service = service;
    }
};
exports.AccessRightsController = AccessRightsController;
exports.AccessRightsController = AccessRightsController = tslib_1.__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, crud_1.Crud)({
        model: {
            type: access_right_entity_1.DbAccessRight
        },
        params: {
            roleId: {
                field: 'roleId',
                type: 'number'
            },
            id: {
                field: 'id',
                type: 'number',
                primary: true
            }
        }
    }),
    (0, common_1.Controller)('/roles/:roleId/accessrights'),
    tslib_1.__metadata("design:paramtypes", [AccessRightsService])
], AccessRightsController);
let AccessRightsModule = class AccessRightsModule {
};
exports.AccessRightsModule = AccessRightsModule;
exports.AccessRightsModule = AccessRightsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([access_right_entity_1.DbAccessRight])],
        providers: [AccessRightsService],
        controllers: [AccessRightsController]
    })
], AccessRightsModule);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
exports.environment = {
    production: false,
    DB_PWD: 'changeme',
    DB_ENV: 'development'
};


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(5);
const common_2 = __webpack_require__(5);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const { status, json } = this.prepareException(exception);
        response.status(status).send(json);
    }
    prepareException(exc) {
        const error = exc instanceof common_2.HttpException ? exc : new common_2.InternalServerErrorException(exc.message);
        const status = error.getStatus();
        const response = error.getResponse();
        const json = typeof response === 'string' ? { error: response } : response;
        return { status, json };
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = tslib_1.__decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
const core_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const https_exception_filter_1 = __webpack_require__(67);
const common_1 = __webpack_require__(5);
const api_interfaces_1 = __webpack_require__(18);
const required_header_interceptor_1 = __webpack_require__(53);
function logger(req, res, next) {
    common_1.Logger.log(`API - request:${req.url}`);
    next();
}
exports.logger = logger;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = api_interfaces_1.API_BASE;
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new https_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new required_header_interceptor_1.HeaderInterceptor());
    app.use(logger);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Monorock API')
        .setDescription('The deployable monorepo by Rockonsoft ')
        .setVersion('1.0')
        .setBasePath(globalPrefix)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const port = process.env.PORT || 3333;
    await app.listen(port, () => {
        common_1.Logger.log('Listening on :' + port + '/' + globalPrefix);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;