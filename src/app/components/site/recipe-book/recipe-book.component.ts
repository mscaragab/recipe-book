import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import * as fromRecipe from '../recipe-book/store/recipe.reducer';
import { Recipe } from './recipe.model';
import * as Recipes from '../recipe-book/store/recipe.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
})
export class RecipeBookComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRecipe.isLoading);
    this.store
      .select(fromRecipe.getRecipes)
      .pipe(take(1))
      .subscribe((recipes: Recipe[]) => {
        if (recipes && recipes.length < 1) {
          this.store.dispatch(new Recipes.LoadRecipesStart());
        }
      });
  }
}
