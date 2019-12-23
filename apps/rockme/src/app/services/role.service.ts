import { Injectable } from '@angular/core';
import { Role, AppUser } from '@monorock/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
  public readonly roles: Observable<Role[] | null> = this._roles.asObservable();

  private _error: BehaviorSubject<HttpErrorResponse | null> = new BehaviorSubject(null);
  public readonly error: Observable<HttpErrorResponse | null> = this._error.asObservable();

  constructor(private http: HttpClient) {}

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
}
