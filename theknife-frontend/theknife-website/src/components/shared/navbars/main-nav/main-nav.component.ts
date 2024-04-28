import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  isScrolled: boolean = false;
  responsavel: any = {};

  user: any = {};

  ngOnInit() {
    this.onWindowScroll();
    this.getResponsavel();
    this.getUtilizador();
  }

  getResponsavel() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http
        .get(
          `http://localhost:3005/restaurantresponsibles/${this.getUserId()}`,
          { headers }
        )
        .subscribe(
          (res: any) => {
            this.responsavel = res;
          },
          (error) => {
            console.error('Erro ao obter dados do responsável: ', error);
          }
        );
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Authentication/login-responsibles']);
  }

  getUtilizador() {
    const usertoken = localStorage.getItem('usertoken');

    if (usertoken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${usertoken}`
      );

      this.http
        .get(`http://localhost:3005/users/${this.getUtilizadorId()}`, {
          headers,
        })
        .subscribe(
          (res: any) => {
            this.user = res;
          },
          (error) => {
            console.error('Erro ao obter dados do utilizador: ', error);
          }
        );
    }
  }

  getUtilizadorId() {
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
