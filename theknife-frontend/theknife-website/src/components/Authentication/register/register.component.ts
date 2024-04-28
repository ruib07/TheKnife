import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  eyeIcon = faEye;
  eyeIconSlash = faEyeSlash;
  visible: boolean = true;
  changetype: boolean = true;

  showSuccess() {
    this.toastr.success('Registo Efetuado com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Registo não foi efetuado!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  viewpasswordregister() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  RegisterUsers(registerusers: {
    username: string;
    email: string;
    password: string;
  }) {
    this.http
      .post('http://localhost:3005/registerusers', registerusers)
      .subscribe(
        (res: any) => {
          const userDataForUsersTable = {
            username: registerusers.username,
            email: registerusers.email,
            password: registerusers.password,
            image: null,
            registeruser_id: res.id,
          };

          this.http
            .post(
              'http://localhost:3005/auths/usersignup',
              userDataForUsersTable
            )
            .subscribe((userRes) => {
              this.showSuccess();
              this.router.navigate(['/Authentication/login/']);
            });
        },
        (error) => {
          this.showError();
        }
      );
  }
}
