import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private el: ElementRef
  ) {}

  eyeIcon = faEye;
  eyeIconSlash = faEyeSlash;
  visible: boolean = true;
  changetype: boolean = true;

  showSuccess() {
    this.toastr.success('Login Efetuado com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Login não foi efetuado!', 'Erro', {
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

  LoginUsers(loginusers: { email: string; password: string }) {
    this.http
      .post('http://localhost:3005/auths/usersignin', loginusers, {
        observe: 'response',
      })
      .subscribe(
        (res: any) => {
          const usertoken = res.body.usertoken;
          if (usertoken) {
            localStorage.setItem('usertoken', usertoken);
            this.showSuccess();
            this.setStyle('');
            this.router.navigate([
              '/Profiles/ClientProfile/client-editprofile',
            ]);
          } else {
            this.showError();
          }
        },
        (error) => {
          this.setStyle('1px solid #D00000');
          this.showError();
        }
      );
  }

  private setStyle(style: string) {
    const emailInput = this.el.nativeElement.querySelector('[name="email"]');
    const passwordInput =
      this.el.nativeElement.querySelector('[name="password"]');

    if (emailInput) {
      emailInput.style.border = style;
    }

    if (passwordInput) {
      passwordInput.style.border = style;
    }
  }
}
