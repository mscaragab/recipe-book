import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeBookService } from '../recipe-book/recipe-book.service';
import { Recipe } from '../recipe-book/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private recipes: Recipe[] = [
    new Recipe(
      'Grilled Chicken',
      'Grilled Chicken Leg with Vegetables Recipe',
      '',
      'assets/img/grilled-chicken-leg-with-vegetables.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Vegetables', 5)]
    ),
    new Recipe('Pasta', 'Pasta Recipe', '', 'assets/img/pasta.jpg', [
      new Ingredient('Pasta', 5),
    ]),
    new Recipe('Cereal', 'Cereal Recipe', '', 'assets/img/cereal.jpg', [
      new Ingredient('Cereal', 1),
    ]),
  ];

  constructor(
    private http: HttpClient,
    private recipesService: RecipeBookService,
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    // return this.http.put(
    //   'https://ng-guide-1473a.firebaseio.com/recipes.json',
    //   recipes
    // );
    const observable = new Observable<void>((observer) => {
      setTimeout(() => {
        this.recipes = recipes;
        observer.next();
      }, 1000);
    });
    return observable;
  }

  fetchRecipes() {
    const observable = new Observable<Recipe[]>((observer) => {
      setTimeout(() => {
        observer.next(this.recipes);
      }, 1000);
    });

    // return this.http
    //   .get<Recipe[]>('https://ng-guide-1473a.firebaseio.com/recipes.json')
    return observable.pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((data) => this.recipesService.setRecipes(data))
    );
  }
}
