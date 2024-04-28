import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

@Component({
  selector: 'app-restaurants-preview',
  templateUrl: './restaurants-preview.component.html',
  styleUrls: ['./restaurants-preview.component.css'],
})
export class RestaurantsPreviewComponent implements OnInit {
  selectedDate: any;
  restaurantId: any = {};
  restaurantData: any;
  minDate: any;
  user: any = {};
  comments: any = {};
  restaurantComments: any[] = [];

  private datePipe = new DatePipe('en-US');

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private el: ElementRef,
    private toastr: ToastrService
  ) {
    registerLocaleData(localePt, 'pt-BR'),
      (this.minDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.restaurantId = +params['id'];
      this.getRestaurantInfo();
      this.getUtilizador();
    });
  }

  redirectToReservations() {
    this.router.navigate(['/reservations']);
  }

  showSuccess() {
    this.toastr.success('Comentário enviado com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Comentário não enviado!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showErrorPont() {
    this.toastr.error(
      'Pontuação inválida. A pontuação deve estar entre 0 e 10.',
      'Erro',
      {
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
      }
    );
  }

  getRestaurantInfo() {
    this.http.get('http://localhost:3005/restaurants').subscribe(
      (res: any) => {
        const selectedRestaurant = res.find(
          (restaurant: any) => restaurant.id === this.restaurantId
        );

        if (selectedRestaurant) {
          this.restaurantData = selectedRestaurant;
          this.getRestaurantComments();
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

  sendComments(comments: { review: number; comment: string }) {
    if (comments.review < 0 || comments.review > 10) {
      this.showErrorPont();
      return;
    }

    const commentDate = new Date();

    const commentsToSend = {
      review: comments.review,
      comment: comments.comment,
      username: this.user?.username || 'Username Não Disponível',
      commentdate: commentDate,
      user_id: this.getUtilizadorId(),
      restaurant_id: this.restaurantId,
    };

    this.http.post('http://localhost:3005/comments', commentsToSend).subscribe(
      (res: any) => {
        this.showSuccess();
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (error) => {
        this.showError();
      }
    );
  }

  getRestaurantComments() {
    this.http
      .get(`http://localhost:3005/comments?restaurant_id=${this.restaurantId}`)
      .subscribe(
        (res: any) => {
          this.restaurantComments = res.filter(
            (comment: any) => comment.restaurant_id === this.restaurantId
          );
        },
        (error) => {
          console.error('Erro ao obter comentários do restaurante: ', error);
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

  goToReservation(restaurantId: number) {
    this.router.navigate(['reservations', restaurantId]);
  }

  visibleComments = 3;

  verComentarios() {
    this.visibleComments += 3;
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return this.datePipe.transform(parsedDate, 'dd-MM-yyyy') || '';
  }
}
