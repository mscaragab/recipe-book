import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromAuth.AppState>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((authData) => authData.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const authReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(authReq);
      })
    );
  }
}
