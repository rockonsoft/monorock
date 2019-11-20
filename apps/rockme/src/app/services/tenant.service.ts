import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tenant } from '@monorock/api-interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private _tenants: BehaviorSubject<Tenant[] | null> = new BehaviorSubject(null);
  public readonly tenants: Observable<Tenant[] | null> = this._tenants.asObservable();

  constructor(private http: HttpClient) {}

  load() {
    this.http.get<Tenant[]>('/api/tenants').subscribe({
      next: tenants => {
        if (tenants) {
          this._tenants.next(tenants);
        }
      }
    });
  }
}
