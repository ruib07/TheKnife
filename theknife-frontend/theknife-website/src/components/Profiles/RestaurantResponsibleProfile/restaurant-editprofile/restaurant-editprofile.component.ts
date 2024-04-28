import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurant-editprofile',
  templateUrl: './restaurant-editprofile.component.html',
  styleUrls: ['./restaurant-editprofile.component.css'],
})
export class RestaurantEditprofileComponent implements OnInit {
  restaurants: any[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  restaurant: any = {};

  ngOnInit() {
    this.getRestaurant();
  }

  showSuccess() {
    this.toastr.success('Dados Atualizados com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Os dados não foram atualizados!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  getRestaurant() {
    const token = localStorage.getItem('token');
    const responsibleId = this.getResponsibleId();

    if (token && responsibleId) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.get(`http://localhost:3005/restaurants`, { headers }).subscribe(
        (res: any) => {
          const filteredRestaurant = res.find(
            (restaurant: any) => restaurant.rresponsible_id === responsibleId
          );

          if (!filteredRestaurant) {
            console.error('Restaurante não encontrado!');
            return;
          }

          this.restaurant = filteredRestaurant;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateRestaurantInfo(restaurantRes: {
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
    const token = localStorage.getItem('token');
    const responsibleId = this.getResponsibleId();

    if (token && responsibleId) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const restaurantId = this.restaurant.id;

      if (!restaurantId) {
        console.error('ID do restaurante não encontrado.');
        return;
      }

      if (this.restaurant.rresponsible_id !== responsibleId) {
        console.error('Não tem permissão para atualizar este restaurante.');
        return;
      }

      this.http
        .put(
          `http://localhost:3005/restaurants/${restaurantId}`,
          restaurantRes,
          {
            headers,
          }
        )
        .subscribe(
          (res: any) => {
            this.setStyle('');
            this.showSuccess();

            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
          (error) => {
            this.setStyle('1px solid #D00000');
            this.showError();
          }
        );
    }
  }

  getResponsibleId() {
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

  private setStyle(style: string) {
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
