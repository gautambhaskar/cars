import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DriverService } from '../driver.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public imgsrc = '';
  constructor(private router: Router, private http: HttpClient, private driverService: DriverService) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const name = form.value.name;
    const team = form.value.team;
    const img = form.value.img;
    this.driverService.fetchDrivers().subscribe(data => {
      this.driverService.drivers = [];
      this.driverService.drivers.push(...data, {
        img: img,
        name: name,
        team: team

      },
    );
    console.log(this.driverService.drivers);
    this.driverService.postDrivers().subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['f1']);
    });
    form.reset();
  }

}
