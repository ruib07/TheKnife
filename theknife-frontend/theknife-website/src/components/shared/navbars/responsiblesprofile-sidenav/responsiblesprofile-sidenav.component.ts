import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-responsiblesprofile-sidenav',
  templateUrl: './responsiblesprofile-sidenav.component.html',
  styleUrls: ['./responsiblesprofile-sidenav.component.css']
})
export class ResponsiblesprofileSidenavComponent {

  constructor(private router: Router  ) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Authentication/login-responsibles']);
  }


}
