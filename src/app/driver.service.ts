import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from './driver.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  public drivers: Driver[] = [];
  private token: string;
  constructor(private http: HttpClient, private authService: AuthService) { }

  postDrivers(): Observable<any> | Promise<any> | any  {
    this.authService.user.subscribe(data => {
      this.token = data.token;
    });
    return this.http.put<Driver>(('https://login-app-86ded.firebaseio.com/drivers.json?auth=' + this.token), this.drivers);
  }
  fetchDrivers() {
    this.authService.user.subscribe(data => {
      this.token = data.token;
    });
    return this.http.get<Driver[]>(('https://login-app-86ded.firebaseio.com/drivers.json?auth=' + this.token));
  }
}
