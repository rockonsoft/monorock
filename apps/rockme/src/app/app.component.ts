import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message, SUPER_USER_NAME, SUPER_USER_PWD } from '@monorock/api-interfaces';
import { UserAuthService } from './auth/user-auth.service';
import { ApiAuthService } from './auth/api-auth.service';
import { ProgressService } from './services/progress.service';
import { tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'monorock-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  busy = true;
  constructor(public progress: ProgressService, private router: Router) {}

  ngOnInit() {
    this.progress.busy
      .pipe(
        delay(0),
        tap(busy => {
          this.busy = busy;
        })
      )
      .subscribe();
  }
}
