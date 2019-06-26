import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { NgForm, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DriverService } from '../driver.service';
import { tap } from 'rxjs/operators';
import { Driver } from '../driver.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public imgsrc = '';
  private id = 0;
  public name = '';
  public team = '';
  private token: string;
  public isLoading = false;
  constructor(private router: Router, private http: HttpClient, private driverService: DriverService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(data => {
      this.token = data.token;
    });
    this.isLoading = false;
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.http.get<Driver>('https://login-app-86ded.firebaseio.com/drivers/' + this.id +'.json?auth=' + this.token).subscribe(data => {
        this.name = data.name;
        this.imgsrc = data.img;
        this.team = data.team;
        this.isLoading = false;
      });
    });
  }
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const team = form.value.team;
    const img = form.value.img;
    const url = 'https://login-app-86ded.firebaseio.com/drivers/' + this.id +  '.json?auth=' + this.token;
    console.log(url);
    this.http.put(url, {
      img: img,
      name: name,
      team: team
    }).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['f1']);
    form.reset();
  }

}
