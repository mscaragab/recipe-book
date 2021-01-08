import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import * as fromAuth from './store/auth.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { AuthResponseData } from './store/auth.effects';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;

  constructor(
    private router: Router,
    private compnentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromAuth.AppState>
  ) {}

  isLoginMode = true;

  isLoading = false;

  error: string = null;

  errorSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  closeSubscription: Subscription;

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    this.error = null;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: this.form.value.email,
          password: this.form.value.password,
        })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignUpStart({
          email: this.form.value.email,
          password: this.form.value.password,
        })
      );
    }

    this.errorSub = this.store.select('auth').subscribe((resData) => {
      this.error = resData.authError;
      this.isLoading = resData.isLoading;
      if (resData.authError) {
        this.form.reset();
      }
    });
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.compnentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const alertComponentRef: ComponentRef<AlertComponent> = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    alertComponentRef.instance.message = message;

    this.closeSubscription = alertComponentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
