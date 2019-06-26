import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}
@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    constructor(private http: HttpClient, private router: Router) {

    }
    signup(email1: string, password1: string)  {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDyc2fBqmm2haQl85hVgHoqsO0uK0lBwyw',
            {
                email: email1,
                password: password1,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError1), tap(resData => {
            const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expDate );
            this.user.next(user);
        }));
    }
    login(email1: string, password1: string)  {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDyc2fBqmm2haQl85hVgHoqsO0uK0lBwyw',
            {
                email: email1,
                password: password1,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError2), tap(resData => {
            const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expDate );
            this.user.next(user);
        }));
    }
    logout() {
        this.user.next(null);
        this.router.navigate(['auth'])
    }
    private handleError1(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email is already registered!';
// tslint:disable-next-line: no-switch-case-fall-through
        }
        return throwError(errorMessage);
    }
    private handleError2(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'INVALID_PASSWORD':
                errorMessage = 'Your email and password do not match!';
// tslint:disable-next-line: no-switch-case-fall-through
            case 'EMAIL_NOT_FOUND' :
                errorMessage = 'Your email and password do not match!';

                    }
        return throwError(errorMessage);
    }
}
