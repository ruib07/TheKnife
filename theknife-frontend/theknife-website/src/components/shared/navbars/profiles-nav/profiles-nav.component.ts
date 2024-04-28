import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-nav',
  templateUrl: './profiles-nav.component.html',
  styleUrls: ['./profiles-nav.component.css']
})
export class ProfilesNavComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  responsavel: any = {};

  user: any = {};

  ngOnInit() {
    this.getResponsavel();
    this.getUtilizador();
  }

  getResponsavel() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get(`http://localhost:3005/restaurantresponsibles/${this.getUserId()}`, { headers })
        .subscribe((res: any) => {
          this.responsavel = res;
        }, (error) => {
          console.error('Erro ao obter dados do responsável: ', error);
        });
    }
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const decodedToken = atob(tokenParts[1]);
        const tokenInfo = JSON.parse(decodedToken);
        return tokenInfo.id;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Authentication/login-responsibles']);
  }

  getUtilizador() {
    const usertoken = localStorage.getItem('usertoken');

    if (usertoken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${usertoken}`);

      this.http.get(`http://localhost:3005/users/${this.getutilizadorId()}`, { headers })
        .subscribe((res: any) => {
          this.user = res;
        }, (error) => {
          console.error('Erro ao obter dados do utilizador: ', error);
        });
    }
  }

  getutilizadorId() {
    const usertoken = localStorage.getItem('usertoken');
    if (usertoken) {
      const usertokenParts = usertoken.split('.');
      if (usertokenParts.length === 3) {
        const userdecodedToken = atob(usertokenParts[1]);
        const usertokenInfo = JSON.parse(userdecodedToken);
        return usertokenInfo.id;
      }
    }
    return null;
  }

  logoutuser() {
    localStorage.removeItem('usertoken');
    this.router.navigate(['/Authentication/login']);
  }

}
