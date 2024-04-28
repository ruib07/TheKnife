import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpasswordemail-user',
  templateUrl: './recoverpasswordemail-user.component.html',
  styleUrls: ['./recoverpasswordemail-user.component.css'],
})
export class RecoverpasswordemailUserComponent {
  existingEmail: string = ''; // Initialize the property

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  showSuccess() {
    this.toastr.success('Email confirmado com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('O Email não Existe!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  getRecoverPasswordemailUser() {
    const url =
      'http://localhost:3005/registerusers/confirm-email/' + this.existingEmail;

    this.http.get(url).subscribe(
      (res: any) => {
        if (res.message) {
          this.showSuccess();
          this.router.navigate(['/Recover-Passwords/recoverpassword-user'], {
            queryParams: { email: this.existingEmail },
          });
        } else {
          this.showError();
        }
      },
      (error) => {
        this.showError();
      }
    );
  }
}
