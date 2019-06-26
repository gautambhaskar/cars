import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { AuthGuardService } from './auth-guard.service';
import { F1Component } from './f1/f1.component';
import { AddComponent } from './add/add.component';
import { CarlistComponent } from './home/carlist/carlist.component';
import { CardetailComponent } from './home/cardetail/cardetail.component';
import { EditComponent } from './edit/edit.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService] },
  {path: 'home', redirectTo: '' },
  {path: 'cars', redirectTo: ''},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuardService]},
  {path: 'f1', component: F1Component, canActivate: [AuthGuardService] },
  { path: 'auth', component: AuthComponent },
  { path: 'add', component: AddComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'not-found' },
  { path: 'not-found', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    NotFoundComponent,
    HomeComponent,
    SpinnerComponent,
    F1Component,
    AddComponent,
    CarlistComponent,
    CardetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],

  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
