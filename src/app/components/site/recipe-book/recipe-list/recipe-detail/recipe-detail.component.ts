import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../recipe.model';

import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeBookService } from '../../recipe-book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from '../../../shopping-list/store/shopping-list.actions';
import * as fromRecipe from '../../store/recipe.reducer';
import * as RecipeActions from '../../store/recipe.actions';


import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: string;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private store: Store<fromRecipe.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // this.recipe = this.recipeBookService.getRecipe(params['id']);
      this.store
        .select(fromRecipe.getRecipes)
        .pipe(take(1))
        .subscribe((recipes) => {
          this.recipe = recipes[this.id];
        });
    });
  }

  onToShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    // let snackBarRef = this.snackBar.open('Sent to shopping list!', null, {verticalPosition:'top', duration:2000});
  }

  onDelete() {
    // this.recipeBookService.deleteRecipe(+this.id);
    this.store.dispatch(new RecipeActions.DeleteRecipe(+this.id));
  }
}
