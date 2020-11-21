import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AuthInterceptorService } from './components/site/auth/auth-interceptor.service';
import { SharedModule } from './components/site/shared/shared.module';
import { NotFoundModule } from './components/site/not-found/not-found.module';
import { shoppingListReducer } from './components/site/shopping-list/store/shopping-list.reducer';
import * as fromApp from './store/app.reducer';
import { from } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './components/site/auth/store/auth.effects';
import { RecipeEffects } from './components/site/recipe-book/store/recipe.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(fromApp.AppReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NotFoundModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
