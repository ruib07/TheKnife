import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-editprofile',
  templateUrl: './client-editprofile.component.html',
  styleUrls: ['./client-editprofile.component.css'],
})
export class ClientEditprofileComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  eyeIcon = faEye;
  eyeIconSlash = faEyeSlash;
  visible: boolean = true;
  changetype: boolean = true;

  user: any = {};

  ngOnInit() {
    this.getUtilizador();
  }

  showSuccess() {
    this.toastr.success('Dados atualizados com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Erro a atualizar os dados', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  viewpassworduser() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
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
            this.user = {
              username: res.username,
              email: res.email,
              password: res.password,
              image: res.image,
            };
          },
          (error) => {
            console.error('Erro ao obter dados do utilizador: ', error);
          }
        );
    }
  }

  updateUsersInfo(updateUser: {
    username: string;
    email: string;
    password: string;
    image: string;
  }) {
    const usertoken = localStorage.getItem('usertoken');

    if (usertoken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${usertoken}`
      );

      this.http
        .put(
          `http://localhost:3005/users/${this.getUtilizadorId()}`,
          updateUser,
          { headers }
        )
        .subscribe(
          (res: any) => {
            const updateForRegisterUsers = {
              username: updateUser.username,
              email: updateUser.email,
              password: updateUser.password,
            };
            this.http
              .put(
                `http://localhost:3005/registerusers/${this.getUtilizadorId()}`,
                updateForRegisterUsers
              )
              .subscribe((res: any) => {
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              });
            this.setStyle('');
            this.showSuccess();
          },
          (error) => {
            this.setStyle('1px solid #D00000');
            this.showError();
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

  private setStyle(style: string) {
    const usernameInput =
      this.el.nativeElement.querySelector('[name="username"]');
    const emailInput = this.el.nativeElement.querySelector('[name="email"]');
    const passwordInput =
      this.el.nativeElement.querySelector('[name="password"]');
    const imageInput = this.el.nativeElement.querySelector('[name="image"]');

    if (usernameInput) {
      usernameInput.style.border = style;
    }

    if (emailInput) {
      emailInput.style.border = style;
    }

    if (passwordInput) {
      passwordInput.style.border = style;
    }

    if (imageInput) {
      imageInput.style.border = style;
    }
  }
}
