import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.css']
})
export class CarlistComponent implements OnInit {
  public cars = [];
  private car = null;
  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carService.fetch().subscribe(data => {
      this.cars = [];
      this.cars.push(...data);
      console.log(data);
    });
  }
  switchCar(id) {
    console.log(id);
    this.carService.carRef.next(id);
  }
  

}
