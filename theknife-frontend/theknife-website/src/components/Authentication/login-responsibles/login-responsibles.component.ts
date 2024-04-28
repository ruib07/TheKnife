import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-responsibles',
  templateUrl: './login-responsibles.component.html',
  styleUrls: ['./login-responsibles.component.css'],
})
export class LoginResponsiblesComponent {
  eyeIcon = faEye;
  eyeIconSlash = faEyeSlash;
  visible: boolean = true;
  changetype: boolean = true;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private el: ElementRef
  ) {}

  viewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

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

  sendLoginResponsible(loginResponsible: { email: string; password: string }) {
    this.http
      .post('http://localhost:3005/auths/responsiblesignin', loginResponsible, {
        observe: 'response',
      })
      .subscribe(
        (res: any) => {
          const token = res.body.token;
          if (token) {
            localStorage.setItem('token', token);
            this.setStyle('');
            this.showSuccess();
            this.router.navigate([
              '/Profiles/RestaurantResponsibleProfile/responsible-editprofile',
            ]);
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
