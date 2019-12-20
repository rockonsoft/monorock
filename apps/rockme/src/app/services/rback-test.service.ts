import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ModelMeta, TestResult, API_BASE } from '@monorock/api-interfaces';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ApiAuthService } from '../auth/api-auth.service';
import { SuperUserService } from './super-user.service';
import { catchError, retry } from 'rxjs/operators';

const sampleObject = {
  Product: {
    title: 'New-Product-Title',
    description: 'New-Product-Description'
  },
  Comment: {
    commentBody: 'new comment body',
    rating: 5
  }
};

@Injectable({
  providedIn: 'root'
})
export class RbackTestService {
  private _result: BehaviorSubject<any | null> = new BehaviorSubject(null);
  public readonly result: Observable<any | null> = this._result.asObservable();

  private _error: BehaviorSubject<any | null> = new BehaviorSubject(null);
  public readonly error: Observable<any | null> = this._error.asObservable();

  constructor(private http: HttpClient, private apiAuth: ApiAuthService, public superUser: SuperUserService) {
    apiAuth.appUser.subscribe({
      next: user => {
        if (user) {
          this.load();
        }
      }
    });
  }

  load() {}

  async getApiEndpoint(selectedModel: ModelMeta): Promise<string> {
    if (selectedModel.parentName) {
      const parentModel = this.superUser._models.value.find(x => x.name === selectedModel.parentName);

      //await this.doPListTest(parentModel);
      const url = await this.getApiEndpoint(parentModel);
      const parents = await this.http.get(url).toPromise();

      const parent = parents[0].id;
      const endpoint = selectedModel.endpoint.replace(':parentId', parent);
      console.debug(`Endpoint:${endpoint}`);
      return Promise.resolve(`/${API_BASE}/${endpoint}`);
    } else {
      console.debug(`Endpoint:${selectedModel.endpoint}`);
      return Promise.resolve(`/${API_BASE}/${selectedModel.endpoint}`);
    }
  }

  async doListTest(selectedModel: ModelMeta): Promise<any> {
    const url = await this.getApiEndpoint(selectedModel);
    await this.http.get(url).subscribe({
      next: res => {
        this._result.next(res);
      },
      error: err => {
        console.error(err);
        this._error.next(err);
      }
    });
  }

  async doGetTest(selectedModel: ModelMeta, instance: any) {
    const url = await this.getApiEndpoint(selectedModel);
    await this.http.get(`${url}/${instance.id}`).subscribe({
      next: res => {
        this._result.next(res);
      },
      error: err => {
        console.error(err);
        this._error.next(err);
      }
    });
  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  //     this._error.next(`Backend returned code ${error.status}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened; please try again later.');
  // }

  async doCreateTest(selectedModel: ModelMeta): Promise<any> {
    const instance = sampleObject[selectedModel.name];

    const url = await this.getApiEndpoint(selectedModel);
    await this.http.post(`${url}`, instance).subscribe({
      next: res => {
        this._result.next(res);
      },
      error: err => {
        console.error(err);
        this._error.next(err);
      }
    });
  }

  async doUpdateTest(selectedModel: ModelMeta, instance: any) {
    const vanilla_instance = sampleObject[selectedModel.name];
    const firstKey = Object.keys(vanilla_instance)[0];
    instance[firstKey] = instance[firstKey] + '_updated';

    const url = await this.getApiEndpoint(selectedModel);
    await this.http.patch(`${url}/${instance.id}`, instance).subscribe({
      next: res => {
        this._result.next(res);
      },
      error: err => {
        console.error(err);
        this._error.next(err);
      }
    });
  }

  async doDeleteTest(selectedModel: ModelMeta, instance: any) {
    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    const url = await this.getApiEndpoint(selectedModel);
    await this.http.delete(`${url}/${instance.id}`).subscribe({
      next: res => {
        this._result.next(res);
      },
      error: err => {
        console.error(err);
        this._error.next(err);
      }
    });
  }
}
