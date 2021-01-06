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
import { environment } from 'src/environments/environment';

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

        // console.log('[Interceptor] url', req.url);
        if (req.url.indexOf('https://recipes-48a2.restdb.io') > -1) {
          const authReq = req.clone({
            params: new HttpParams()
              .set('x-apikey', environment.RESTDB_API_KEY)
              .set('cache-control', 'no-cache')
              .set('content-type', 'application/json'),
          });
          return next.handle(authReq);
        } else {
          const authReq = req.clone({
            params: new HttpParams().set('auth', user.token),
          });
          return next.handle(authReq);
        }
      })
    );
  }
}
