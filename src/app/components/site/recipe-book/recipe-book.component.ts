import { Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromApp from '../../../store/app.reducer';
import * as fromRecipe from '../recipe-book/store/recipe.reducer';
import { Recipe } from './recipe.model';
import * as Recipes from '../recipe-book/store/recipe.actions';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  animations: [
    trigger('animate', [
      state(
        's1',
        style({
          'margin-left': '100%',
        })
      ),
      state(
        's2',
        style({
          'margin-left': '0%',
        })
      ),
      transition('s1 <=> s2', animate(300)),
      // transition('slidein => normal', animate(300)),
    ]),
  ],
})
export class RecipeBookComponent implements OnInit {
  isLoading$: Observable<boolean>;
  state = 's1';

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

  onAnimate() {
    this.state = this.state === 's1' ? 's2' : 's1';
  }

  onLoadDetail(recipeDetail: ElementRef) {}
}
