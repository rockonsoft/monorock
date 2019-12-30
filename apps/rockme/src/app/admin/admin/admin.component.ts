import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'monorock-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigateByUrl(`/`);
  }

  goAdminHome() {
    this.router.navigateByUrl(`/admin/dashboard`);
  }
}
