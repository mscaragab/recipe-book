import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as Auth from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const promise = new Promise<boolean | UrlTree>((resolve, reject) => {
      // console.log('Gaurd start...');
      this.store.select('auth').pipe(
        take(1),
        map((authData) => authData.user),
        map((user) => {
          // console.log('Guard map reached...');
          if (user) {
            // console.log('Guard resolve true...');
            resolve(true);
          } else if (this.autoLogin()) {
            // console.log('Guard resolved true after autoLogin...');
            resolve(true);
          } else {
            // console.log('Guard resolved false and redirected to /auth...');
            resolve(this.router.createUrlTree(['/auth']));
          }
        })
      ).subscribe();
    });

    return promise;
  }

  private autoLogin(): boolean {
    const userData1 = localStorage.getItem('user');
    if (userData1 && userData1.trim() !== 'null') {
      const userData: {
        email: string;
        userId: string;
        token: string;
        expirationDate: number;
      } = JSON.parse(localStorage.getItem('user'));
      this.store.dispatch(new Auth.AutoLogin(userData));
      return true;
    }
    return false;
  }
}
