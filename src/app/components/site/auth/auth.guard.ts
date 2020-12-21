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
import { Store } from '@ngrx/store';

import * as Auth from '../auth/store/auth.actions';
import * as fromAuth from './store/auth.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromAuth.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const promise = new Promise<boolean | UrlTree>((resolve, reject) => {
      this.store
        .select('auth')
        .pipe(
          take(1),
          map((authData) => authData.user),
          map((user) => {
            if (user) {
              resolve(true);
            } else if (this.autoLogin()) {
              resolve(true);
            } else {
              resolve(this.router.createUrlTree(['/auth']));
            }
          })
        )
        .subscribe();
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
      if (userData.expirationDate > new Date().getTime()) {
        this.store.dispatch(new Auth.AutoLogin(userData));
        return true;
      }
    }
    return false;
  }
}
