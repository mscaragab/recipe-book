import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeBookService {

  // private recipes: Recipe[] = [
  //   new Recipe('Grilled Chicken',
  //   'Grilled Chicken Leg with Vegetables Recipe',
  //   'assets/img/grilled-chicken-leg-with-vegetables.jpg',
  //   [
  //     new Ingredient('Chicken', 1),
  //     new Ingredient('Vegetables', 5)
  //   ]),
  //   new Recipe('Pasta',
  //   'Pasta Recipe',
  //   'assets/img/pasta.jpg',
  //   [
  //     new Ingredient('Pasta', 5)
  //   ]),
  //   new Recipe('Cereal',
  //   'Cereal Recipe',
  //   'assets/img/cereal.jpg',
  //   [
  //     new Ingredient('Cereal', 1)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  recipesUpdated = new Subject<Recipe[]>();

  constructor() { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: string): Recipe {
    return this.recipes[+id];
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesUpdated.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesUpdated.next(this.recipes.slice());
  }
}
