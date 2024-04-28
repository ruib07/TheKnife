import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatars';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from 'src/components/home/home.component';
import { RestaurantsPageComponent } from 'src/components/Restaurants/restaurants-page/restaurants-page.component';
import { RestaurantsPreviewComponent } from 'src/components/Restaurants/restaurants-preview/restaurants-preview.component';
import { ReservationsComponent } from 'src/components/reservations/reservations.component';
import { LoginComponent } from 'src/components/Authentication/login/login.component';
import { RegisterComponent } from 'src/components/Authentication/register/register.component';
import { RestaurantRegistrationComponent } from 'src/components/Authentication/restaurant-registration/restaurant-registration.component';
import { FooterComponent } from 'src/components/shared/footer/footer.component';
import { ClientEditprofileComponent } from 'src/components/Profiles/ClientProfile/client-editprofile/client-editprofile.component';
import { BookingHistoryComponent } from 'src/components/Profiles/ClientProfile/booking-history/booking-history.component';
import { ClientReviewsComponent } from 'src/components/Profiles/ClientProfile/client-reviews/client-reviews.component';
import { MainNavComponent } from 'src/components/shared/navbars/main-nav/main-nav.component';
import { LoginsNavComponent } from 'src/components/shared/navbars/logins-nav/logins-nav.component';
import { LoginResponsiblesComponent } from 'src/components/Authentication/login-responsibles/login-responsibles.component';
import { UserprofileSidenavComponent } from 'src/components/shared/navbars/userprofile-sidenav/userprofile-sidenav.component';
import { ResponsiblesprofileSidenavComponent } from 'src/components/shared/navbars/responsiblesprofile-sidenav/responsiblesprofile-sidenav.component';
import { ResponsibleEditprofileComponent } from 'src/components/Profiles/RestaurantResponsibleProfile/responsible-editprofile/responsible-editprofile.component';
import { RestaurantEditprofileComponent } from 'src/components/Profiles/RestaurantResponsibleProfile/restaurant-editprofile/restaurant-editprofile.component';
import { RecoverpasswordResponsibleComponent } from 'src/components/Recover-Passwords/recoverpassword-responsible/recoverpassword-responsible.component';
import { RecoverpasswordUserComponent } from 'src/components/Recover-Passwords/recoverpassword-user/recoverpassword-user.component';
import { RecoverpasswordemailUserComponent } from 'src/components/Recover-Passwords/recoverpasswordemail-user/recoverpasswordemail-user.component';
import { RestaurantGraphComponent } from 'src/components/Profiles/RestaurantResponsibleProfile/restaurant-graph/restaurant-graph.component';
import { ProfilesNavComponent } from 'src/components/shared/navbars/profiles-nav/profiles-nav.component';
import { RecoverpasswordemailResponsavelComponent } from 'src/components/Recover-Passwords/recoverpasswordemail-responsavel/recoverpasswordemail-responsavel.component';
import { RestaurantFavouritesComponent } from 'src/components/Profiles/ClientProfile/restaurant-favourites/restaurant-favourites.component';

import { DeleteCommentModalComponent } from 'src/components/Modals/DeleteCommentModal/DeleteCommentModal.component';
import { DeleteReservationModalComponent } from 'src/components/Modals/DeleteReservationModal/DeleteReservationModal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginsNavComponent,
    ProfilesNavComponent,
    UserprofileSidenavComponent,
    ResponsiblesprofileSidenavComponent,
    HomeComponent,
    RestaurantsPageComponent,
    RestaurantsPreviewComponent,
    ReservationsComponent,
    LoginComponent,
    RegisterComponent,
    RestaurantRegistrationComponent,
    LoginResponsiblesComponent,
    RecoverpasswordResponsibleComponent,
    RecoverpasswordUserComponent,
    ClientEditprofileComponent,
    BookingHistoryComponent,
    ClientReviewsComponent,
    RestaurantFavouritesComponent,
    ResponsibleEditprofileComponent,
    RestaurantEditprofileComponent,
    RestaurantGraphComponent,
    RecoverpasswordemailUserComponent,
    RecoverpasswordemailResponsavelComponent,
    FooterComponent,
    DeleteCommentModalComponent,
    DeleteReservationModalComponent,
  ],
  imports: [
    BrowserModule,
    MdbCollapseModule,
    AppRoutingModule,
    [FontAwesomeModule],
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    AvatarModule,
    ToastrModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    FontAwesomeModule,
    NgbModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
