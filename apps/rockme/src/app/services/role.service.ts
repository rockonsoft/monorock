import { Injectable } from '@angular/core';
import { Role } from '@monorock/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiAuthService } from '../auth/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _roles: BehaviorSubject<Role[] | null> = new BehaviorSubject(null);
  public readonly roles: Observable<Role[] | null> = this._roles.asObservable();

  private _error: BehaviorSubject<HttpErrorResponse | null> = new BehaviorSubject(null);
  public readonly error: Observable<HttpErrorResponse | null> = this._error.asObservable();

  constructor(private http: HttpClient, private apiAuth: ApiAuthService) {}

  load() {
    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    this.http.get<Role[]>('/api/roles', { headers }).subscribe({
      next: roles => {
        if (roles) {
          this._roles.next(roles);
        }
      },
      error: err => {
        console.log(err);
        this._error.next(err);
      }
    });
  }
}
