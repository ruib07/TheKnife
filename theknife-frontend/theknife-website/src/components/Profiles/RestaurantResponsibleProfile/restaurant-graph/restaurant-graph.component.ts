import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import 'chart.js/auto';

@Component({
  selector: 'app-restaurant-graph',
  templateUrl: './restaurant-graph.component.html',
  styleUrls: ['./restaurant-graph.component.css'],
})
export class RestaurantGraphComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRestaurant();
  }

  restaurant: any = {};
  restaurantId: any;

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
          this.restaurantId = filteredRestaurant.id;

          this.getReservationsFromRestaurant();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  getReservationsFromRestaurant() {
    if (!this.restaurantId) {
      console.error('ID do restaurante não disponível!');
      return;
    }

    this.http.get('http://localhost:3005/reservations').subscribe(
      (res: any) => {
        const reservations = res.filter(
          (reservation: any) => reservation.restaurant_id === this.restaurantId
        );

        if (reservations.length === 0) {
          console.error('Reservas não foram encontradas!');
          return;
        }

        const totalReservations = reservations.length;

        this.createChart(totalReservations);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createChart(totalReservations: number) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total de Reservas'],
        datasets: [
          {
            label: `Número de Reservas no ${this.restaurant.name}`,
            data: [totalReservations],
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
            barThickness: 130,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 40,
          },
        },
      },
    });
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
}
