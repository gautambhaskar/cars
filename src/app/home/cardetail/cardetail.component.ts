import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  carIndex = '0';
  car = {
  };
  constructor(private carService: CarService) { }
  ngOnInit() {
    this.car = this.carService.fetch().subscribe(data => {
      this.carService.cars = [];
      this.carService.cars.push(...data); 
      console.log(this.carService.cars);
      this.car = this.carService.cars[+this.carIndex];
      console.log(this.car);
      
    });
    this.fetch();
  }
  fetch() {
    this.carService.carRef.subscribe(index => {
      this.carIndex = index;
      console.log(this.carIndex);
    this.car = this.carService.fetch().subscribe(data => {
      this.carService.cars = [];
      this.carService.cars.push(...data); 
      console.log(this.carService.cars);
      this.car = this.carService.cars[+this.carIndex];
      console.log(this.car);
      
    })    });
  }

}
