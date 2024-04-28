import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  restaurants: any = {};
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  get totalPages() {
    return Math.ceil(this.restaurants.length / this.itemsPerPage);
  }

  get paginatedRestaurants() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.restaurants.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.restaurants.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

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

  goToRestaurantPreview(restaurantId: number) {
    this.router.navigate(['/Restaurants/restaurants-preview', restaurantId]);
  }

  showSuccess() {
    this.toastr.success('Contacto efetuado com sucesso!', 'Sucesso', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  showError() {
    this.toastr.error('Contacto não foi efetuado!', 'Erro', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
    });
  }

  sendContact(contact: {
    name: string;
    email: string;
    phoneNumber: number;
    subject: string;
    message: string;
  }) {
    this.http.post('http://localhost:3005/contacts', contact).subscribe(
      (res: any) => {
        this.showSuccess();
      },
      (error) => {
        this.showError();
      }
    );
  }
}
