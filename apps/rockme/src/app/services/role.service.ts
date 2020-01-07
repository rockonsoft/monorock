import { Injectable } from '@angular/core';
import {
  Role,
  AppUser,
  RoleAssignment,
  UserProfile,
  AccessRight,
  ModelMeta,
  API_BASE,
  ROLE_MODEL_ENDPOINT
} from '@monorock/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
  public readonly roles: Observable<Role[] | null> = this._roles.asObservable();

  private _error: BehaviorSubject<HttpErrorResponse | null> = new BehaviorSubject(null);
  public readonly error: Observable<HttpErrorResponse | null> = this._error.asObservable();

  public models: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  loadModelMeta() {
    this.http.get<ModelMeta[]>('/api/modelmeta').subscribe({
      next: models => {
        if (models) {
          this.models.next(models);
        }
      },
      error: err => {
        console.error(err);
      }
    });
  }

  load() {
    //GET's are cached by default by firebase, to get around that we are currently using a timestamp query parameter
    this.http.get<Role[]>(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}?${moment.now()}`).subscribe({
      next: roles => {
        if (roles) {
          this._roles.next(roles);
        }
      },
      error: err => {
        console.error(err);
        this._error.next(err);
      }
    });
  }

  loadForUser(headers: any) {
    return this.http.get<Role[]>(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}?${moment.now()}`, { headers });
  }

  addNewRole(profile: UserProfile) {
    const name = `New Role ${this._roles.value.length + 1}`;
    this.http
      .post(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}`, {
        name: name,
        description: name,
        applicationId: profile.applicationId,
        tenantId: profile.tenantId
      })
      .pipe(
        tap(x => {
          this.load();
        })
      )
      .subscribe();
  }

  assignRole(headers: any, otherUser: AppUser, selectedRole: Role) {
    const assignment: RoleAssignment = {
      roleName: selectedRole.name,
      userId: otherUser.userId
    };
    return this.http.post(`api/userrole/assign`, assignment, { headers });
  }

  getAccessRights(role: Role) {
    return this.http.get<AccessRight[]>(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}/${role.id}/accessrights`);
  }

  createAccess(role: any, ac: AccessRight): any {
    return this.http.post(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}/${role.id}/accessrights`, ac).toPromise();
  }

  updateAccess(role: any, ac: AccessRight): any {
    return this.http.patch(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}/${role.id}/accessrights/${ac.id}`, ac).toPromise();
  }

  updateRole(role: any) {
    return this.http.patch(`/${API_BASE}/${ROLE_MODEL_ENDPOINT}/${role.id}`, role).toPromise();
  }

  deleteRole(role: any): any {
    return this.http.delete(`api/roles/${role.id}`).pipe(
      tap(x => {
        this.load();
      })
    );
  }
}
