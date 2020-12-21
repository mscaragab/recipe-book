import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { DataStorageService } from '../../site/shared/data-storage.service';
import * as fromRecipe from '../../site/recipe-book/store/recipe.reducer';
import * as AuthActions from '../../site/auth/store/auth.actions';
import * as RecipeActions from '../../site/recipe-book/store/recipe.actions';
import * as fromAuth from '../../site/auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenaveToggle = new EventEmitter<void>();

  userSubscription: Subscription;

  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromAuth.AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((authData) => authData.user))
      .subscribe((user) => {
         (this.isAuthenticated = !!user)
       });
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes().subscribe();
    this.store
      .select(fromRecipe.getRecipes)
      .pipe(take(1))
      .subscribe((recipes) => {
        this.store.dispatch(new RecipeActions.SaveRecipes(recipes));
      });
  }

  onLoadData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeActions.LoadRecipesStart());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onToggle() {
    this.sidenaveToggle.emit();
  }
}
