import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recoverpassword-user',
  templateUrl: './recoverpassword-user.component.html',
  styleUrls: ['./recoverpassword-user.component.css'],
})
export class RecoverpasswordUserComponent implements OnInit {
  existingEmail: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  eyeIcon = faEye;
  eyeIconSlash = faEyeSlash;
  visible: boolean = true;
  changetype: boolean = true;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.existingEmail = params['email'];
    });
  }

  showSuccess() {
    this.toastr.success('Password alterada com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('A Password não foi alterada!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  viewrecovernewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  viewrecoverconfirmnewpassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  sendRecoverPasswordUser(recoverPasswordUser: {
    newPassword: string;
    confirmNewPassword: string;
  }) {
    this.http
      .put(
        `http://localhost:3005/registerusers/${this.existingEmail}/updatepassword`,
        recoverPasswordUser
      )
      .subscribe(
        (res) => {
          this.showSuccess();
          this.router.navigate(['/Authentication/login']);
        },
        (error) => {
          this.showError();
        }
      );
  }
}
