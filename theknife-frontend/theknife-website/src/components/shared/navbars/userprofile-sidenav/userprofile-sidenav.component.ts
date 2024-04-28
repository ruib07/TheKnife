import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile-sidenav',
  templateUrl: './userprofile-sidenav.component.html',
  styleUrls: ['./userprofile-sidenav.component.css']
})
export class UserprofileSidenavComponent {

  constructor(private router: Router  ) { }


  logoutuser() {
    localStorage.removeItem('usertoken');
    this.router.navigate(['/Authentication/login']);
  }
}
