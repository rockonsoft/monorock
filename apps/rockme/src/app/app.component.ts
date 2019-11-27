import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@monorock/api-interfaces';
import { UserAuthService } from './auth/user-auth.service';

@Component({
  selector: 'monorock-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  greeting = 'Checking api...';
  constructor(private http: HttpClient) {
    this.http.get<Message>('/api/hello').subscribe(msg => {
      if (msg) {
        this.greeting = msg.message;
      }
    });
  }
}
