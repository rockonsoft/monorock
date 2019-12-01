import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'monorock-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  successCallback(logingEvent) {
    console.log(logingEvent);
  }

  errorCallback($event) {
    console.log(event);
  }
}
