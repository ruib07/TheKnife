import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants-page',
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent implements OnInit {
  restaurants: any = {};
  numberOfPeople: number = 0;
  selectedTime: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getRestaurants();
  }

  getRestaurants() {
    this.http.get('http://localhost:3005/restaurants').subscribe(
      (res) => {
        this.restaurants = res;
      },
      (error) => {
        console.error('Erro ao obter restaurantes: ', error);
      }
    );
  }

  filterByHour() {
    if (this.selectedTime && this.restaurants.length > 0) {
      const selectedHour = new Date(`2000-01-01T${this.selectedTime}`);

      const validRestaurants = this.restaurants.filter((restaurant: any) => {
        const openingHour = new Date(`2000-01-01T${restaurant.openinghours}`);
        const closingHour = new Date(`2000-01-01T${restaurant.closinghours}`);

        return selectedHour >= openingHour && selectedHour <= closingHour;
      });

      if (validRestaurants.length > 0) {
        this.restaurants = validRestaurants;
      } else {
        this.restaurants = [];
      }
    } else {
      window.location.reload();
    }
  }

  filterByCapacity() {
    if (this.numberOfPeople > 0) {
      this.restaurants = this.restaurants.filter(
        (a: any) => a.capacity >= this.numberOfPeople
      );
    } else {
      window.location.reload();
    }
  }

  pesquisar(event: any) {
    const nomeRestaurante: string = event.target.value;

    if (nomeRestaurante) {
      const nome = nomeRestaurante.toUpperCase();

      this.restaurants = this.restaurants.filter(
        (a: any) => a.name.toUpperCase().indexOf(nome) >= 0
      );
    } else {
      window.location.reload();
    }
  }

  clearFilters() {
    window.location.reload();
  }

  sortRestaurantsPriceAsc(): void {
    this.restaurants.sort((a: any, b: any) => a.averageprice - b.averageprice);
  }

  sortRestaurantsPriceDesc(): void {
    this.restaurants.sort((a: any, b: any) => b.averageprice - a.averageprice);
  }

  sortRestaurantsNameAZ(): void {
    this.restaurants.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  sortRestaurantsNameZA(): void {
    this.restaurants.sort((a: any, b: any) => b.name.localeCompare(a.name));
  }

  goToRestaurantPreview(restaurantId: number) {
    this.router.navigate(['/Restaurants/restaurants-preview', restaurantId]);
  }
}
