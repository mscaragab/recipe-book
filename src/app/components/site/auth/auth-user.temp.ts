import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthUserTemp {
  getUser(email: string, password: string) {
    const observable = new Observable<AuthResponseData>((observer) => {
      setTimeout(() => {
        const data: AuthResponseData = {
          email: email,
          localId: 'user-id',
          idToken: 'token',
          expiresIn: '3600',
          refreshToken: 'refresh-token',
          registered: false,
        };
        if (password != 'password') {
          observer.error({
            error: {
              error: {
                message: 'INVALID_PASSWORD',
              },
            },
          });
        } else if (email !== 'user1@user.com') {
          observer.error({
            error: {
              error: {
                message: 'EMAIL_NOT_FOUND',
              },
            },
          });
        }
        observer.next(data);
      }, 1000);
    });

    return observable;
  }
}
