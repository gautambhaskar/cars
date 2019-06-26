import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  loginMode = true;
  errorMessage: string = null;
  isLoading = false;
  ngOnInit() {
  }
  authenticate() {
  }
  age() {
    return 'Age'
  }
  onSubmit(form: NgForm) {

    if (!this.loginMode) {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      setTimeout(this.age(), 3000);
      this.authService.signup(email, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['home']);
        this.isLoading = false;
      }, error => {
        this.errorMessage = error;
        this.isLoading = false;
      });
      form.reset();
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.isLoading = true;
      this.authService.login(email, password).subscribe(resData => {
        console.log(resData);
        this.router.navigate(['home']);
        this.isLoading = false;
      }, error => {
        this.errorMessage = error;
        this.isLoading = false;
      });
      form.reset();
    }
    
  }
  switchMode() {
    this.loginMode = !this.loginMode;
  }
  clearError() {
    this.errorMessage = '';
  }

}
