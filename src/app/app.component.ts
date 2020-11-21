import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './components/site/auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './components/site/auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    console.log('App Component');
    if (isPlatformBrowser(this.platformId)) {
      // this.authService.autoLogin();
      this.store.dispatch(new AuthActions.AutoLogin());
    }
  }
}
