import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AuthActions from '../store/auth.actions';
import * as RecipeActions from '../../recipe-book/store/recipe.actions';
import { User } from '../user.model';
import { UIService } from '../../shared/ui.service';
import { title } from 'process';

export interface AuthResponseData {
  email: string;
  localId: string;
  idToken: string;
  expiresIn: string;
  refreshToken: string;
  registered: boolean;
}

@Injectable()
export class AuthEffects {
  // private signUpEndPoint: string;
  // private loginEndPoint: string;
  private logoutTimer;

  private users: [];

  private signUpUser(
    email: string,
    password: string,
    returnSecureToken: boolean
  ): Observable<AuthResponseData> {
    const observable = new Observable<AuthResponseData>((observer) => {
      setTimeout(() => {
        observer.next({
          email: email,
          localId: new Date().toISOString(),
          idToken: new Date().toISOString(),
          expiresIn: '3600',
          refreshToken: new Date().toISOString(),
          registered: false,
        });
      }, 1500);
    });
    return observable;
  }

  private loginUser(
    email: string,
    password: string,
    returnSecureToken: boolean
  ): Observable<AuthResponseData> {
    const observable = new Observable<AuthResponseData>((observer) => {
      setTimeout(() => {
        observer.next({
          email: email,
          localId: new Date().toISOString(),
          idToken: new Date().toISOString(),
          expiresIn: '3600',
          refreshToken: new Date().toISOString(),
          registered: false,
        });
      }, 1500);
    });
    return observable;
  }

  @Effect()
  authSignUpStart = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      // return this.http
      //   .post<AuthResponseData>(this.signUpEndPoint, {
      //     email: authData.payload.email,
      //     password: authData.payload.password,
      //     returnSecureToken: true,
      //   })
      return this.signUpUser(
        authData.payload.email,
        authData.payload.password,
        true
      ).pipe(
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
      // return this.http
      //   .post<AuthResponseData>(this.loginEndPoint, {
      //     email: authData.payload.email,
      //     password: authData.payload.password,
      //     returnSecureToken: true,
      //   })

      return this.loginUser(
        authData.payload.email,
        authData.payload.password,
        true
      ).pipe(
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

  private userData = null;

  @Effect()
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_SUCCESS),
    // tap((authData: AuthActions.AutheticationSuccess) => {
    //   console.log('2-UserData: ', this.userData);
    //   localStorage.setItem('user', JSON.stringify(this.userData));
    // }),
    switchMap((authData: AuthActions.AutheticationSuccess) => {
      // console.log('@Effects Auth Success, User: ', authData.payload);
      this.userData = authData.payload;
      localStorage.setItem('user', JSON.stringify(this.userData));
      const expiresIn =
        this.userData.expirationDate * 1000 - new Date().getTime();
      return of(
        new RecipeActions.LoadRecipesStart(),
        new AuthActions.Redirect()
        // new AuthActions.AutoLogout(expiresIn)
      );
    })
    // take(1),
    // tap(() => {
    //   console.log('2-UserData: ', this.userData);
    //   localStorage.setItem('user', JSON.stringify(this.userData));
    // })
  );

  @Effect({ dispatch: false })
  authFail = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATION_FAIL),
    tap((action: AuthActions.AuthenticationFail) => {
      this.uiService.openDialog('Error', action.payload);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/auth']);
      if (this.logoutTimer) {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null;
      }
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.REDIRECT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  authAutoLogout = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGOUT),
    switchMap((authData: AuthActions.AutoLogout) => {
      return new Promise((resolve, reject) => {
        this.logoutTimer = setTimeout(() => {
          resolve(new AuthActions.Logout());
        }, authData.payload);
      });
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private uiService: UIService
  ) {
    // this.loginEndPoint =
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    //   environment.API_KEY;
    // this.signUpEndPoint =
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    //   environment.API_KEY;
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
