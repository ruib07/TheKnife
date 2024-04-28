import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginResponsiblesComponent } from 'src/components/Authentication/login-responsibles/login-responsibles.component';
import { LoginComponent } from 'src/components/Authentication/login/login.component';
import { RegisterComponent } from 'src/components/Authentication/register/register.component';
import { RestaurantRegistrationComponent } from 'src/components/Authentication/restaurant-registration/restaurant-registration.component';
import { BookingHistoryComponent } from 'src/components/Profiles/ClientProfile/booking-history/booking-history.component';
import { ClientEditprofileComponent } from 'src/components/Profiles/ClientProfile/client-editprofile/client-editprofile.component';
import { ClientReviewsComponent } from 'src/components/Profiles/ClientProfile/client-reviews/client-reviews.component';
import { RestaurantFavouritesComponent } from 'src/components/Profiles/ClientProfile/restaurant-favourites/restaurant-favourites.component';
import { ResponsibleEditprofileComponent } from 'src/components/Profiles/RestaurantResponsibleProfile/responsible-editprofile/responsible-editprofile.component';
import { RestaurantEditprofileComponent } from 'src/components/Profiles/RestaurantResponsibleProfile/restaurant-editprofile/restaurant-editprofile.component';
import { RestaurantGraphComponent } from 'src/components/Profiles/RestaurantResponsibleProfile/restaurant-graph/restaurant-graph.component';
import { RecoverpasswordResponsibleComponent } from 'src/components/Recover-Passwords/recoverpassword-responsible/recoverpassword-responsible.component';
import { RecoverpasswordUserComponent } from 'src/components/Recover-Passwords/recoverpassword-user/recoverpassword-user.component';
import { RecoverpasswordemailResponsavelComponent } from 'src/components/Recover-Passwords/recoverpasswordemail-responsavel/recoverpasswordemail-responsavel.component';
import { RecoverpasswordemailUserComponent } from 'src/components/Recover-Passwords/recoverpasswordemail-user/recoverpasswordemail-user.component';
import { RestaurantsPageComponent } from 'src/components/Restaurants/restaurants-page/restaurants-page.component';
import { RestaurantsPreviewComponent } from 'src/components/Restaurants/restaurants-preview/restaurants-preview.component';
import { HomeComponent } from 'src/components/home/home.component';
import { ReservationsComponent } from 'src/components/reservations/reservations.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'Authentication/restaurant-registration',
    component: RestaurantRegistrationComponent,
  },
  {
    path: 'Authentication/login-responsibles',
    component: LoginResponsiblesComponent,
  },
  { path: 'Authentication/login', component: LoginComponent },
  { path: 'Authentication/register', component: RegisterComponent },
  {
    path: 'Profiles/ClientProfile/client-editprofile',
    component: ClientEditprofileComponent,
  },
  {
    path: 'Profiles/ClientProfile/booking-history',
    component: BookingHistoryComponent,
  },
  {
    path: 'Profiles/ClientProfile/client-reviews',
    component: ClientReviewsComponent,
  },
  {
    path: 'Profiles/ClientProfile/restaurant-favourites',
    component: RestaurantFavouritesComponent,
  },
  {
    path: 'Recover-Passwords/recoverpassword-responsible',
    component: RecoverpasswordResponsibleComponent,
  },
  {
    path: 'Recover-Passwords/recoverpassword-user',
    component: RecoverpasswordUserComponent,
  },
  {
    path: 'Recover-Passwords/recoverpasswordemail-user',
    component: RecoverpasswordemailUserComponent,
  },
  {
    path: 'Recover-Passwords/recoverpasswordemail-responsavel',
    component: RecoverpasswordemailResponsavelComponent,
  },
  {
    path: 'Profiles/RestaurantResponsibleProfile/responsible-editprofile',
    component: ResponsibleEditprofileComponent,
  },
  {
    path: 'Profiles/RestaurantResponsibleProfile/restaurant-editprofile',
    component: RestaurantEditprofileComponent,
  },
  {
    path: 'Profiles/RestaurantResponsibleProfile/restaurant-graph',
    component: RestaurantGraphComponent,
  },
  { path: 'reservations/:id', component: ReservationsComponent },
  { path: 'Restaurants/restaurants-page', component: RestaurantsPageComponent },
  {
    path: 'Restaurants/restaurants-preview/:id',
    component: RestaurantsPreviewComponent,
  },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
