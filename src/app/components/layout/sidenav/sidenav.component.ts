import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../../store/app.reducer';
import * as fromAuth from '../../site/auth/store/auth.reducer';
import * as Auth from '../../site/auth/store/auth.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(fromAuth.getIsAuth);
  }

  onLogout() {
    this.store.dispatch(new Auth.Logout());
  }

  onLoadData() {
    this.onCloseSidenav();
  }

  onSaveData() {
    this.onCloseSidenav();
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }
}
