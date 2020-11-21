import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../auth.service';
import * as AuthActions from '../store/auth.actions';
import * as RecipeActions from '../../recipe-book/store/recipe.actions';
import { User } from '../user.model';


@Injectable()
export class AuthEffects {
  private signUpEndPoint: string;
  private loginEndPoint: string;
  private logoutTimer;


  @Effect()
  authSignUpStart = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(this.signUpEndPoint, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            return new AuthActions.AutheticationSuccess({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: new Date().getTime() + +resData.expiresIn * 1000,
            });
          }),
          catchError((errorRes) => {
            return of(
              new AuthActions.AuthenticationFail(this.handleError(errorRes))
            );
          })
        );
    })
  );

  @Effect()
  authLoginStart = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(this.loginEndPoint, {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true,
        })
        .pipe(
          map((resData) => {
            console.log('Login success', resData);
            return new AuthActions.AutheticationSuccess({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: new Date().getTime() + +resData.expiresIn * 1000,
            });
          }),
          catchError((errorRes) => {
            return of(
              new AuthActions.AuthenticationFail(this.handleError(errorRes))
            );
          })
        );
    })
  );

  @Effect()
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    switchMap((authData: AuthActions.AutheticationSuccess) => {
      return of(new RecipeActions.LoadRecipesStart());
    }),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    switchMap((authData: AuthActions.AutoLogin) => {
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
          return of(
            new AuthActions.AutheticationSuccess({
              email: userData.email,
              userId: userData.id,
              token: userData._token,
              expirationDate: userData._expirationDate,
            })
          ).pipe(
            tap(() => {
              // this.autoLogout(
              //   userData._expirationDate * 1000 - new Date().getTime()
              // );
            })
          );
        }
      }
      return of();
    })
  );

  @Effect({ dispatch: false })
  authAutoLogout = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGOUT),
    tap((authData: AuthActions.AutoLogout) => {
      this.logoutTimer = setTimeout(() => {
        // dispatch logout
      }, authData.payload);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginEndPoint =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      environment.API_KEY;
    this.signUpEndPoint =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      environment.API_KEY;
  }

  private handleError(errorRes) {
    console.log(errorRes);
    let message = 'Unknown Error Occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return message;
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
    return message;
  }
}
