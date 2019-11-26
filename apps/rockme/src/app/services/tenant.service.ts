import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tenant } from '@monorock/api-interfaces';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiAuthService } from '../auth/api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private _tenants: BehaviorSubject<Tenant[] | null> = new BehaviorSubject(null);
  public readonly tenants: Observable<Tenant[] | null> = this._tenants.asObservable();

  private _error: BehaviorSubject<HttpErrorResponse | null> = new BehaviorSubject(null);
  public readonly error: Observable<HttpErrorResponse | null> = this._error.asObservable();

  constructor(private http: HttpClient, private apiAuth: ApiAuthService) {}

  load() {
    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    this.http.get<Tenant[]>('/api/tenants', { headers }).subscribe({
      next: tenants => {
        console.log(tenants);
        if (tenants) {
          this._tenants.next(tenants);
        }
      },
      error: err => {
        console.log(err);
        this._error.next(err);
      }
    });
  }
}
