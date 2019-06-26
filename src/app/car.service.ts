import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from './car.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public cars = [];
  public carRef = new Subject<string>();
  private token: string;
  constructor(private http: HttpClient, private authService: AuthService) {
  }
  fetch() {
    this.authService.user.subscribe(data => {
      this.token = data.token;
    });
    return this.http.get<Car[]>('https://login-app-86ded.firebaseio.com/cars.json?auth=' + this.token);
  }
}
