import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-restaurant-registration',
  templateUrl: './restaurant-registration.component.html',
  styleUrls: ['./restaurant-registration.component.css'],
})
export class RestaurantRegistrationComponent {
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
    this.toastr.success('Registo efetuado com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }
  showError() {
    this.toastr.error('Erro ao efetuar registo!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  sendRestaurantRegistration(registerrestaurantsresponsibles: {
    flname: string;
    phone: number;
    email: string;
    password: string;
    name: string;
    category: string;
    desc: string;
    rphone: number;
    location: string;
    image: string;
    numberoftables: number;
    capacity: number;
    openingdays: string;
    averageprice: number;
    openinghours: string;
    closinghours: string;
  }) {
    this.http
      .post(
        'http://localhost:3005/restaurantregistrations',
        registerrestaurantsresponsibles
      )
      .subscribe(
        (res: any) => {
          const userDataForResponsiblesTable = {
            flname: registerrestaurantsresponsibles.flname,
            phone: registerrestaurantsresponsibles.phone,
            email: registerrestaurantsresponsibles.email,
            password: registerrestaurantsresponsibles.password,
            restaurantregistration_id: res.id,
          };

          this.http
            .post(
              'http://localhost:3005/auths/responsiblesignup',
              userDataForResponsiblesTable
            )
            .subscribe((responsibleRes: any) => {
              const userDataForRestaurants = {
                name: registerrestaurantsresponsibles.name,
                category: registerrestaurantsresponsibles.category,
                desc: registerrestaurantsresponsibles.desc,
                rphone: registerrestaurantsresponsibles.rphone,
                location: registerrestaurantsresponsibles.location,
                image: registerrestaurantsresponsibles.image,
                numberoftables: registerrestaurantsresponsibles.numberoftables,
                capacity: registerrestaurantsresponsibles.capacity,
                openingdays: registerrestaurantsresponsibles.openingdays,
                averageprice: registerrestaurantsresponsibles.averageprice,
                openinghours: registerrestaurantsresponsibles.openinghours,
                closinghours: registerrestaurantsresponsibles.closinghours,
                restaurantregistration_id: res.id,
                rresponsible_id: responsibleRes[0].id,
              };

              this.http
                .post(
                  'http://localhost:3005/restaurants',
                  userDataForRestaurants
                )
                .subscribe((restaurantRes) => {
                  this.setStyle('');
                  this.showSuccess();
                  this.router.navigate(['/Authentication/login-responsibles']);
                });
            });
        },
        (error) => {
          this.setStyle('1px solid #D00000');
          this.showError();
        }
      );
  }

  private setStyle(style: string) {
    const flnameInput = this.el.nativeElement.querySelector('[name="flname"]');
    const phoneInput = this.el.nativeElement.querySelector('[name="phone"]');
    const emailInput = this.el.nativeElement.querySelector('[name="email"]');
    const passwordInput =
      this.el.nativeElement.querySelector('[name="password"]');
    const nameInput = this.el.nativeElement.querySelector('[name="name"]');
    const categoryInput =
      this.el.nativeElement.querySelector('[name="category"]');
    const descInput = this.el.nativeElement.querySelector('[name="desc"]');
    const rphoneInput = this.el.nativeElement.querySelector('[name="rphone"]');
    const locationInput =
      this.el.nativeElement.querySelector('[name="location"]');
    const imageInput = this.el.nativeElement.querySelector('[name="image"]');
    const numberoftablesInput = this.el.nativeElement.querySelector(
      '[name="numberoftables"]'
    );
    const capacityInput =
      this.el.nativeElement.querySelector('[name="capacity"]');
    const openingdaysInput = this.el.nativeElement.querySelector(
      '[name="openingdays"]'
    );
    const averagepriceInput = this.el.nativeElement.querySelector(
      '[name="averageprice"]'
    );
    const openinghoursInput = this.el.nativeElement.querySelector(
      '[name="openinghours"]'
    );
    const closinghoursInput = this.el.nativeElement.querySelector(
      '[name="closinghours"]'
    );

    if (flnameInput) {
      flnameInput.style.border = style;
    }

    if (phoneInput) {
      phoneInput.style.border = style;
    }

    if (emailInput) {
      emailInput.style.border = style;
    }

    if (passwordInput) {
      passwordInput.style.border = style;
    }

    if (nameInput) {
      nameInput.style.border = style;
    }

    if (categoryInput) {
      categoryInput.style.border = style;
    }

    if (descInput) {
      descInput.style.border = style;
    }

    if (rphoneInput) {
      rphoneInput.style.border = style;
    }

    if (locationInput) {
      locationInput.style.border = style;
    }

    if (imageInput) {
      imageInput.style.border = style;
    }

    if (numberoftablesInput) {
      numberoftablesInput.style.border = style;
    }

    if (capacityInput) {
      capacityInput.style.border = style;
    }

    if (openingdaysInput) {
      openingdaysInput.style.border = style;
    }

    if (averagepriceInput) {
      averagepriceInput.style.border = style;
    }

    if (openinghoursInput) {
      openinghoursInput.style.border = style;
    }

    if (closinghoursInput) {
      closinghoursInput.style.border = style;
    }
  }
}
