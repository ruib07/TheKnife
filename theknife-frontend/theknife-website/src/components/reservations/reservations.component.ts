import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent implements OnInit {
  restaurantId: any = {};
  restaurantData: any;
  user: any = {};
  reservation: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.restaurantId = +params['id'];
      this.getRestaurantInfo();
      this.getUtilizador();
    });
  }

  showSuccess() {
    this.toastr.success('Reserva efetuada com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Erro a fazer a reserva', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  getRestaurantInfo() {
    this.http.get('http://localhost:3005/restaurants').subscribe(
      (res: any) => {
        const selectedRestaurant = res.find(
          (restaurant: any) => restaurant.id === this.restaurantId
        );
        if (selectedRestaurant) {
          this.restaurantData = selectedRestaurant;
        } else {
          console.error(
            'Restaurante não encontrado. Restaurant ID:',
            this.restaurantId
          );
        }
      },
      (error) => {
        console.error('Erro ao obter restaurantes: ', error);
      }
    );
  }

  sendReservation(reservation: {
    client_name: string;
    phonenumber: number;
    reservationdate: string;
    reservationtime: string;
    numberpeople: number;
  }) {
    if (
      reservation.numberpeople > this.restaurantData.capacity ||
      reservation.reservationtime < this.restaurantData.openinghours ||
      reservation.reservationtime > this.restaurantData.closinghours
    ) {
      this.showError();
      return;
    }

    const reservationToSend = {
      client_name: reservation.client_name,
      phonenumber: reservation.phonenumber,
      reservationdate: reservation.reservationdate,
      reservationtime: reservation.reservationtime,
      numberpeople: reservation.numberpeople,
      restaurant_id: this.restaurantId,
      user_id: this.getUtilizadorId(),
    };

    this.http
      .post('http://localhost:3005/reservations', reservationToSend)
      .subscribe(
        (res: any) => {
          this.showSuccess();
          this.router.navigate(['/home']);
        },
        (error) => {
          this.showError();
        }
      );
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
}
