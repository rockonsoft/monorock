import { Injectable } from '@angular/core';
import { AppUser, Tenant, Role, ModelMeta } from '@monorock/api-interfaces';
import { TenantService } from './tenant.service';
import { RoleService } from './role.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ngModuleJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {
  private _tenants: BehaviorSubject<Tenant[] | null> = new BehaviorSubject(null);
  public readonly tenants: Observable<Tenant[] | null> = this._tenants.asObservable();

  private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
  public readonly roles: Observable<Role[] | null> = this._roles.asObservable();

  public _models: BehaviorSubject<ModelMeta[] | null> = new BehaviorSubject(null);
  public readonly models: Observable<ModelMeta[] | null> = this._models.asObservable();

  private _localUser: BehaviorSubject<AppUser | null> = new BehaviorSubject(null);
  public readonly localUser: Observable<AppUser | null> = this._localUser.asObservable();

  superUser: AppUser;

  constructor(private tenantService: TenantService, private roleService: RoleService, private http: HttpClient) {
    this.localUser.subscribe({
      next: user => {
        if (user) {
          this.superUser = user;
          this.tenantService.loadForUser(this.getHeaders()).subscribe({
            next: tenants => {
              this._tenants.next(tenants);
            }
          });
          this.roleService.loadForUser(this.getHeaders()).subscribe({
            next: roles => {
              this._roles.next(roles);
            }
          });
          this.loadModelMeta();
        }
      }
    });
  }

  getHeaders() {
    if (!this.superUser) return null;
    let headers = new HttpHeaders().set('user-id', this.superUser.userId);
    headers = headers.append('authorization', `Bearer ${this.superUser.apiToken}`);
    headers = headers.append('tenant-id', this.superUser.tenantExternalId);
    headers = headers.append('application-id', `${this.superUser.applicationId}`);
    return headers;
  }

  private loadModelMeta() {
    this.http.get<ModelMeta[]>('/api/modelmeta', { headers: this.getHeaders() }).subscribe({
      next: models => {
        if (models) {
          this._models.next(models);
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  login(username: string, password: string) {
    // This endpoint is only used to login user with username and password
    // currently only used for super user.
    this.http.post('/api/login', { username: username, password: password }).subscribe((response: any) => {
      let appUser: AppUser = response.user;
      appUser.apiToken = response.api_token;
      this._localUser.next(appUser);
    });
  }
}
