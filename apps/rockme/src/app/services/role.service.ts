import { Injectable } from '@angular/core';
import { Role, AppUser, RoleAssignment, UserProfile, AccessRight, ModelMeta } from '@monorock/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
    this.http.get<Role[]>('/api/roles').subscribe({
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
    return this.http.get<Role[]>('/api/roles', { headers });
  }

  addNewRole(profile: UserProfile) {
    const name = `New Role ${this._roles.value.length + 1}`;
    this.http
      .post('/api/roles', {
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
    return this.http.get<AccessRight[]>(`api/roles/${role.id}/accessrights`);
  }

  createAccess(role: any, ac: AccessRight): any {
    return this.http.post(`api/roles/${role.id}/accessrights`, ac).toPromise();
  }

  updateAccess(role: any, ac: AccessRight): any {
    return this.http.patch(`api/roles/${role.id}/accessrights/${ac.id}`, ac).toPromise();
  }

  updateRole(role: any) {
    return this.http.patch(`api/roles/${role.id}`, role).toPromise();
  }

  deleteRole(role: any): any {
    return this.http.delete(`api/roles/${role.id}`).pipe(
      tap(x => {
        this.load();
      })
    );
  }
}
