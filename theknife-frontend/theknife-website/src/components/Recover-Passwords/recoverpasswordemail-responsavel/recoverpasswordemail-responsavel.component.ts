import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recoverpasswordemail-responsavel',
  templateUrl: './recoverpasswordemail-responsavel.component.html',
  styleUrls: ['./recoverpasswordemail-responsavel.component.css'],
})
export class RecoverpasswordemailResponsavelComponent {
  existingEmail: string = '';

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
    this.toastr.error('O Email não existe!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  getRecoverPasswordemailResponsavel() {
    const url =
      'http://localhost:3005/restaurantregistrations/confirm-email/' +
      this.existingEmail;

    this.http.get(url).subscribe(
      (res: any) => {
        if (res.message) {
          this.showSuccess();
          this.router.navigate(
            ['/Recover-Passwords/recoverpassword-responsible'],
            {
              queryParams: { email: this.existingEmail },
            }
          );
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
