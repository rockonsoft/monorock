import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModelMeta, TestResult, API_BASE } from '@monorock/api-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiAuthService } from '../auth/api-auth.service';

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
  private _models: BehaviorSubject<ModelMeta[] | null> = new BehaviorSubject(null);
  public readonly models: Observable<ModelMeta[] | null> = this._models.asObservable();

  constructor(private http: HttpClient, private apiAuth: ApiAuthService) {
    apiAuth.appUser.subscribe({
      next: user => {
        if (user) {
          this.load();
        }
      }
    });
  }

  load() {
    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    this.http.get<ModelMeta[]>('/api/modelmeta', { headers }).subscribe({
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

  async getApiEndpoint(selectedModel: ModelMeta): Promise<string> {
    if (selectedModel.parentName) {
      const parentModel = this._models.value.find(x => x.name === selectedModel.parentName);

      const list = await this.doListTest(parentModel);
      const parent = list[0].id;
      const endpoint = selectedModel.endpoint.replace(':parentId', parent);
      return Promise.resolve(`/${API_BASE}/${endpoint}`);
    } else {
      return Promise.resolve(`/${API_BASE}/${selectedModel.endpoint}`);
    }
  }

  async doListTest(selectedModel: ModelMeta): Promise<any> {
    console.log('doListTest');
    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    const url = await this.getApiEndpoint(selectedModel);
    return this.http.get(url, { headers }).toPromise();
  }

  async doGetTest(selectedModel: ModelMeta, instance: any) {
    console.log('doGetTest');
    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    const url = await this.getApiEndpoint(selectedModel);
    return this.http
      .get(`${url}/${instance.id}`, {
        headers
      })
      .toPromise();
  }

  async doCreateTest(selectedModel: ModelMeta) {
    console.log('doCreateTest');

    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    const instance = sampleObject[selectedModel.name];

    console.log(instance);

    const url = await this.getApiEndpoint(selectedModel);
    return this.http
      .post(`${url}`, instance, {
        headers
      })
      .toPromise();
  }

  async doUpdateTest(selectedModel: ModelMeta, instance: any) {
    console.log('doUpdateTest');

    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    const vanilla_instance = sampleObject[selectedModel.name];
    const firstKey = Object.keys(vanilla_instance)[0];
    instance[firstKey] = instance[firstKey] + '_updated';

    const url = await this.getApiEndpoint(selectedModel);
    return this.http
      .patch(`${url}/${instance.id}`, instance, {
        headers
      })
      .toPromise();
  }
  async doDeleteTest(selectedModel: ModelMeta, instance: any) {
    console.log('doDeleteTest');

    const apiToken = this.apiAuth.getToken();
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + apiToken);

    const url = await this.getApiEndpoint(selectedModel);
    return this.http
      .delete(`${url}/${instance.id}`, {
        headers
      })
      .toPromise();
  }
}
