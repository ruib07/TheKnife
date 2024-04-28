import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-favourites',
  templateUrl: './restaurant-favourites.component.html',
  styleUrls: ['./restaurant-favourites.component.css'],
})
export class RestaurantFavouritesComponent implements OnInit {
  user: any = {};
  commentsData: any;
  restaurantsData: any;
  p: number = 1;
  pagedRestaurants: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUtilizador();
  }

  pageChanged(event: any): void {
    const startIndex = (event.page - 1) * 3;
    this.pagedRestaurants = this.restaurantsData.slice(
      startIndex,
      startIndex + 3
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
            this.getRestaurantsByUser();
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

  getRestaurantsByUser() {
    this.http.get('http://localhost:3005/comments').subscribe((res: any) => {
      const selectedComments = res.filter(
        (comments: any) => comments.user_id == this.getUtilizadorId()
      );
      if (selectedComments.length > 0) {
        this.commentsData = selectedComments;
        this.getRestaurantsByComments(selectedComments);
      } else {
        console.error('Comentários não encontrados', this.getUtilizador());
      }
    });
  }

  getRestaurantsByComments(comments: any[]) {
    const restaurantIdsWithReview10 = comments
      .filter((comment) => {
        const numericReview = parseFloat(comment.review);
        return numericReview === 10;
      })
      .map((comment) => comment.restaurant_id);

    if (restaurantIdsWithReview10.length > 0) {
      this.http
        .get('http://localhost:3005/restaurants')
        .subscribe((res: any) => {
          this.restaurantsData = res.filter((restaurant: any) =>
            restaurantIdsWithReview10.includes(restaurant.id)
          );

          this.pageChanged({ page: this.p });
        });
    } else {
      this.restaurantsData = [];
    }
  }

  goToRestaurantPreview(restaurantId: number) {
    this.router.navigate(['/Restaurants/restaurants-preview', restaurantId]);
  }
}
