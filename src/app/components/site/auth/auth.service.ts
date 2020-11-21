import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from './user.model';
import * as fromApp from '../../../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { AuthUserTemp } from './auth-user.temp';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private signUpEndPoint: string;
  private loginEndPoint: string;

  // user: Subject<User> = new BehaviorSubject<User>(null);

  private logoutTimer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private authUserTemp: AuthUserTemp
  ) {
    this.loginEndPoint =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      environment.API_KEY;
    this.signUpEndPoint =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      environment.API_KEY;
  }

  autoLogin() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _expirationDate: number;
      } = JSON.parse(localStorage.getItem('user'));
      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        userData._expirationDate
      );
      if (user) {
        // this.user.next(user);
        this.store.dispatch(
          new AuthActions.AutheticationSuccess({
            email: userData.email,
            userId: userData.id,
            token: userData._token,
            expirationDate: userData._expirationDate,
          })
        );
        console.log(
          new Date().getTime(),
          '   ***   ',
          userData._expirationDate,
          ' *** ',
          userData._expirationDate - new Date().getTime()
        );
        this.autoLogout(userData._expirationDate * 1000 - new Date().getTime());
      }
    }
  }

  autoLogout(expiresIn: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signUpEndPoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.loginEndPoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleError(errorRes) {
    console.log(errorRes);
    let message = 'Unknown Error Occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(message);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'Email already exists!';
        break;
      case 'INVALID_PASSWORD':
        message = 'Password is invalid!';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'Email is not registered!';
        break;
    }
    return throwError(message);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date().getTime() + expiresIn * 1000;
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('user', JSON.stringify(user));
    // this.user.next(user);
    this.store.dispatch(
      new AuthActions.AutheticationSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
      })
    );
    this.autoLogout(expiresIn * 1000);
  }

  logout() {
    localStorage.removeItem('user');
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }
}
