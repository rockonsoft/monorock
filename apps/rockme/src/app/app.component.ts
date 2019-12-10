import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message, SUPER_USER_NAME, SUPER_USER_PWD } from '@monorock/api-interfaces';
import { UserAuthService } from './auth/user-auth.service';
import { ApiAuthService } from './auth/api-auth.service';

@Component({
  selector: 'monorock-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}
}
