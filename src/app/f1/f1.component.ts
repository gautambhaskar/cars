import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { registerLocaleData } from '@angular/common';
import { map, tap } from 'rxjs/operators';
import { Driver } from '../driver.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-f1',
  templateUrl: './f1.component.html',
  styleUrls: ['./f1.component.css']
})
export class F1Component implements OnInit {
  public isLoading = false;
  public drivers = [];
  public message = '';
  private token: string;
  public query = false;
  private index = '';
  private choice = false;
  constructor(private driverService: DriverService, private router: Router, private http: HttpClient, private authService: AuthService) { }
  onPost() {
    this.driverService.postDrivers().subscribe(data => {
      console.log(data);
    })
  }
  onFetch() {
    this.isLoading = true;
    this.driverService.fetchDrivers().subscribe(resData => {
      this.driverService.drivers = [];
      this.driverService.drivers.push(...resData);
      this.drivers = this.driverService.drivers;
      this.isLoading = false;
    }
    );
  }
  onEdit(id) {
    this.router.navigate(['edit', id]);
  }
  onAdd() {
    this.router.navigate(['add']);
  }
  ngOnInit() {
  }
  onLog() {
    console.log(this.driverService.drivers);
  }
  displayMessage(message) {
    this.message = message;
    this.query = true;
  }
  closeMessage(choice) {
    this.query = false;
    if(choice) {
      this.http.delete('https://login-app-86ded.firebaseio.com/drivers/' + this.index + '.json?auth=' + this.token).subscribe(data => {
    console.log(data);
      this.drivers.splice(+this.index, 1);
    });
    }
  }
  delete(index) {
    this.authService.user.subscribe(data => {
      this.token = data.token;
      this.index = index;
    });
    this.displayMessage('Are you sure you want to delete this driver?');
// tslint:disable-next-line: max-line-length

    
  }
    
}
