import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../../../store/app.reducer';
import * as fromRecipe from '../store/recipe.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  selectedRecipe: Recipe;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.store.select(fromRecipe.getRecipes);
  }
}
