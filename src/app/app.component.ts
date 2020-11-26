import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as Recipes from './components/site/recipe-book/store/recipe.actions';
import * as fromRecipe from './components/site/recipe-book/store/recipe.reducer';
import { take } from 'rxjs/operators';
import { Recipe } from './components/site/recipe-book/recipe.model';
import * as fromAuth from './components/site/auth/store/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    console.log('App Component');
    if (isPlatformBrowser(this.platformId)) {
    }
    // this.store
    //   .select(fromAuth.getIsAuth)
    //   .pipe(take(1))
    //   .subscribe((isAuth: boolean) => {
    //     if (isAuth) {
    //       this.loadRecipes();
    //     }
    //   });
  }

  private loadRecipes() {
    this.store
      .select(fromRecipe.getRecipes)
      .pipe(take(1))
      .subscribe((recipes: Recipe[]) => {
        console.log('From App Component, Recipes :   ', recipes);
        if (!recipes || recipes.length < 1) {
          console.log('App Component dispatch LoadRecipesStart Action...');
          this.store.dispatch(new Recipes.LoadRecipesStart());
        }
      });
  }
}
